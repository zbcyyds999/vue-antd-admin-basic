<template>
  <a-card>
    <div>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
        <a-button>批量操作</a-button>
        <a-dropdown>
          <a-menu @click="handleMenuClick" slot="overlay">
            <a-menu-item key="delete">删除</a-menu-item>
            <a-menu-item key="audit">审批</a-menu-item>
          </a-menu>
          <a-button> 更多操作 <a-icon type="down" /> </a-button>
        </a-dropdown>
      </a-space>
      <standard-table
        :columns="columns"
        :dataSource="dataSource"
        :selectedRows.sync="selectedRows"
        @clear="onClear"
        @change="onChange"
        @selectedRowChange="onSelectChange"
        bordered
        :pagination="pagination"
      >
        <div slot="description" slot-scope="{ text }">
          {{ text }}
        </div>
        <span slot="formatSand" slot-scope="{ formatSand }">
          <span>
            <a-tag v-for="tag in formatSand" :key="tag" color="blue">{{
              tag
            }}</a-tag>
          </span>
        </span>
        <div slot="action" slot-scope="{ record }">
          <a @click="showDrawer(record)" type="primary">详情</a>
        </div>
        <template slot="statusTitle">
          <a-icon @click.native="onStatusTitleClick" type="info-circle" />
        </template>
      </standard-table>

      <a-drawer
        title="详情"
        :width="720"
        :visible="visible"
        :body-style="{ paddingBottom: '80px' }"
        @close="onClose"
      >
        <a-form-model ref="ruleForm" :model="form" :rules="rules">
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="信息资源代码" prop="resNameCode">
                <a-input
                  v-model="addData.resNameCode"
                  placeholder="请输入信息资源代码"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="信息资源提供方" prop="provider">
                <a-input
                  v-model="addData.provider"
                  placeholder="请输入信息资源提供方"
                ></a-input>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="信息资源提供方代码" prop="providerCode">
                <a-input
                  v-model="addData.providerCode"
                  placeholder="请输入信息资源提供方代码"
                />
              </a-form-model-item>
            </a-col>
            <a-col :span="12"> </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-model-item label="信息资源摘要" prop="resAbstract">
                <a-input
                  v-model="addData.resAbstract"
                  type="textarea"
                  placeholder="请输入摘要内容"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-model-item label="信息资源格式" prop="formatSand">
                <a-checkbox-group v-model="addData.formatSand" :options="sands">
                </a-checkbox-group>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="信息项名称" prop="formatName">
                <a-input
                  v-model="addData.formatName"
                  placeholder="请输入信息项名称"
                ></a-input>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="数据类型" prop="dataType">
                <a-select
                  v-model="addData.dataType"
                  placeholder="请选择数据类型"
                >
                  <a-select-option v-for="datatp in dataTypes" :key="datatp">
                    {{ datatp }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="共享类型" prop="shareType">
                <a-select
                  v-model="addData.shareType"
                  @change="getSharing"
                  placeholder="请选择共享类型"
                >
                  <a-select-option value="无条件共享">
                    无条件共享
                  </a-select-option>
                  <a-select-option value="有条件共享">
                    有条件共享
                  </a-select-option>
                  <a-select-option value="不予共享"> 不予共享 </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="共享条件" prop="shareUri" v-if="show">
                <a-input
                  v-model="addData.shareUri"
                  placeholder="请输入共享条件"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="24">
              <a-form-model-item label="共享方式" prop="shareCheck">
                <a-checkbox-group
                  v-model="addData.shareCheck"
                  :options="shares"
                >
                </a-checkbox-group>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="是否向社会开放" prop="opening">
                <a-switch v-model="addData.opening" @change="getOpening" />
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item
                label="开放条件"
                prop="openCondition"
                v-if="openshow"
              >
                <a-input
                  v-model="addData.openCondition"
                  placeholder="请输入共享条件"
                />
              </a-form-model-item>
            </a-col>
          </a-row>

          <a-row :gutter="16">
            <a-col :span="12">
              <a-form-model-item label="更新周期" prop="cycleItem">
                <a-select
                  v-model="addData.cycleItem"
                  placeholder="请选择更新周期"
                >
                  <a-select-option v-for="item in cycles" :key="item"
                    >{{ item }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-col>
            <a-col :span="12">
              <a-form-model-item label="发布日期" prop="releaseDate" required>
                <a-date-picker
                  :format="dateFormat"
                  v-model="addData.releaseDate"
                  type="date"
                  placeholder="选择日期"
                  style="width: 100%"
                />
              </a-form-model-item>
            </a-col>
          </a-row>
        </a-form-model>
        <div
          :style="{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: '100%',
            borderTop: '1px solid #e9e9e9',
            padding: '10px 16px',
            background: '#fff',
            textAlign: 'right',
            zIndex: 1,
          }"
        >
          <a-button type="primary" @click="onSubmit"> Create </a-button>
          <a-button style="margin-left: 10px" @click="resetForm">
            Reset
          </a-button>
        </div>
      </a-drawer>
    </div>
  </a-card>
</template>

<script>
import StandardTable from "@/components/table/StandardTable";
import { columns } from "./TableData";

const dataSource = [];
const data = [
  {
    key: 1,
    cid: 17,
    resNameCode: "123456",
    provider: "北京西城",
    providerCode: "0005",
    resAbstract: "卫统数据摘要测试",
    formatSand: "MySql",
    formatName: "统一社会信用代码",
    dataType: "数值型 N",
    shareType: "有条件共享",
    shareUri: "啊啊啊",
    shareCheck: "共享平台",
    opening: "否",
    openCondition: "啊啊",
    cycleItem: "每年",
    releaseDate: "2021-08-12",
    sourceRange: "0002",
  },
  {
    key: 63,
    cid: 18,
    resNameCode: "123456",
    provider: "北京西城",
    providerCode: "0222",
    resAbstract: "总收入",
    formatSand: "Oracle",
    formatName: "总收入",
    dataType: "字符型 C",
    shareType: "无条件共享",
    shareUri: "无",
    shareCheck: "共享平台",
    opening: "否",
    openCondition: "无",
    cycleItem: "每年",
    releaseDate: "2021-10-25",
    sourceRange: "",
  },
  {
    key: 64,
    cid: 18,
    resNameCode: "123456",
    provider: "北京西城",
    providerCode: "0222",
    resAbstract: "财政拨款收入\n",
    formatSand: "MySql",
    formatName: "财政拨款收入",
    dataType: "数值型 N",
    shareType: "无条件共享",
    shareUri: "无",
    shareCheck: "共享平台",
    opening: "否",
    openCondition: "无",
    cycleItem: "每年",
    releaseDate: "2021-10-10",
    sourceRange: "",
  },
  {
    key: 65,
    cid: 18,
    resNameCode: "123456",
    provider: "北京西城",
    providerCode: "0222",
    resAbstract: "财政基本拨款收入\n",
    formatSand: "MySql",
    formatName: "财政基本拨款收入",
    dataType: "数值型 N",
    shareType: "无条件共享",
    shareUri: "无",
    shareCheck: "共享平台",
    opening: "否",
    openCondition: "无",
    cycleItem: "每年",
    releaseDate: "2021-10-16",
    sourceRange: "",
  },
  {
    key: 66,
    cid: 18,
    resNameCode: "123456",
    provider: "北京西城",
    providerCode: "0222",
    resAbstract: "财政项目拨款收入",
    formatSand: "MySql",
    formatName: "财政项目拨款收入",
    dataType: "数值型 N",
    shareType: "无条件共享",
    shareUri: "无",
    shareCheck: "邮件",
    opening: "否",
    openCondition: "无",
    cycleItem: "每年",
    releaseDate: "2021-10-24",
    sourceRange: "",
  },
  {
    key: 67,
    cid: 18,
    resNameCode: "123456",
    provider: "北京西城",
    providerCode: "0222",
    resAbstract: "事业收入",
    formatSand: "MySql",
    formatName: "事业收入",
    dataType: "数值型 N",
    shareType: "无条件共享",
    shareUri: "无",
    shareCheck: "共享平台",
    opening: "否",
    openCondition: "无",
    cycleItem: "每年",
    releaseDate: "2021-10-24",
    sourceRange: "",
  },
];

export default {
  name: "QueryList",
  components: { StandardTable },
  data() {
    return {
      dateFormat: 'YYYY-MM-DD',
      cycles: ["实时", "每日", "每周", "每月", "每季度", "每年"],
      dataTypes: [
        "字符型 C",
        "数值型 N",
        "货币型 Y",
        "日期型 D",
        "日期时间型 T",
        "通用型 G",
        "双精度型 B",
        "整型 I",
        "浮点型 F",
      ],
      shares: ["共享平台", "邮件", "拷盘", "电子文档", "纸质报表"],
      sands: ["Oracle", "MySql", "MongoDB", "xml", "docx", "pdf", "xlsx"],
      visible: false,
      advanced: true,
      columns,
      dataSource,
      data,
      selectedRows: [],
      other: "",
      show: false, //判断共享条件弹窗是否可见
      openshow: false, //判断开放条件弹窗是否可见
      inputType: "",
      addData: {
        id: null,
        resNameCode: "",
        provider: "",
        providerCode: "",
        resAbstract: "",
        formatSand: [],
        formatName: "",
        dataType: undefined,
        shareType: undefined,
        shareUri: "",
        shareCheck: [],
        opening: false,
        openCondition: "",
        cycleItem: undefined,
        releaseDate: null,
        sourceRange: "",
      },
      form: this.$form.createForm(this),
      pagination: {
        pageNo: 1,
        pageSize: 5, // 默认每页显示数量
        showSizeChanger: true, // 显示可改变每页数量
        pageSizeOptions: ["5", "20", "50", "100"], // 每页数量选项
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) =>
          this.onSizeChange(current, pageSize), // 改变每页数量时更新显示
        onChange: (page, pageSize) => this.onPageChange(page, pageSize), //点击页码事件
        total: 0, //总条数
      },
      rules: {
        //表单验证
        resNameCode: [
          { required: true, message: "请输入信息资源代码", trigger: "blur" },
        ],
        provider: [
          { required: true, message: "请输入信息资源提供方", trigger: "blur" },
        ],
        providerCode: [
          {
            required: true,
            message: "请输入信息资源提供方代码",
            trigger: "blur",
          },
        ],
        resAbstract: [
          { required: true, message: "请输入信息资源摘要", trigger: "blur" },
        ],
        formatSand: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个信息资源格式",
            trigger: "change",
          },
        ],
        formatName: [
          { required: true, message: "请输入信息项名称", trigger: "blur" },
        ],
        dataType: [
          { required: true, message: "请选择数据类型", trigger: "blur" },
        ],
        shareType: [
          { required: true, message: "请选择共享类型", trigger: "blur" },
        ],
        shareUri: [
          { required: true, message: "请填写共享条件", trigger: "blur" },
        ],
        shareCheck: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个共享方式",
            trigger: "change",
          },
        ],
        opening: [
          { required: true, message: "请选择是否向社会开放", trigger: "blur" },
        ],
        openCondition: [
          { required: true, message: "请选择开放条件", trigger: "blur" },
        ],
        cycleItem: [
          { required: true, message: "请选择更新周期", trigger: "blur" },
        ],
        releaseDate: [
          { required: true, message: "请选择发布日期", trigger: "change" },
        ],
      },
    };
  },
  created() {
    this.aaa();
  },
  methods: {
    onPageChange(page) {
      this.pagination.pageNo = page;
    },
    onSizeChange(pageSize) {
      this.pagination.pageNo = 1;
      this.pagination.pageSize = pageSize;
    },
    //判断是弹出条件弹窗
    getSharing(value) {
      if (value == "有条件共享") {
        this.show = !this.show;
      } else {
        this.show = false;
      }
    },
    getOpening(value) {
      if (value == true) {
        this.openshow = !this.openshow;
      } else {
        this.openshow = false;
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.visible = false;
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    aaa() {
      this.data.map((item) => {
        item.formatSand = item.formatSand.split("/");
        item.shareCheck = item.shareCheck.split("/");
        this.dataSource.push(item);
      });
    },
    showDrawer(e) {
      this.visible = true;
      this.addData = e;
      if (e.opening == "是") {
        this.addData.opening = true;
      } else {
        this.addData.opening = false;
      }
      console.log(e);
      console.log(this.addData);
    },
    onClose() {
      this.visible = false;
    },
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    remove() {
      this.dataSource = this.dataSource.filter(
        (item) =>
          this.selectedRows.findIndex((row) => row.key === item.key) === -1
      );
      this.selectedRows = [];
    },
    onClear() {
      this.$message.info("您清空了勾选的所有行");
    },
    onStatusTitleClick() {
      this.$message.info("你点击了状态栏表头");
    },
    onChange() {
      this.$message.info("表格状态改变了");
    },
    onSelectChange() {
      this.$message.info("选中行改变了");
    },
    addNew() {
      this.addData = {};
      this.visible = true;
    },
    handleMenuClick(e) {
      if (e.key === "delete") {
        this.remove();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.search {
  margin-bottom: 54px;
}
.fold {
  width: calc(100% - 216px);
  display: inline-block;
}
.operator {
  margin-bottom: 18px;
}
@media screen and (max-width: 900px) {
  .fold {
    width: 100%;
  }
}
</style>
