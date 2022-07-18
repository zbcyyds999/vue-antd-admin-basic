<template>
  <div>
    <a-card>
      <a-form-model layout="inline" :model="form" ref="serchForm">
        <a-row>
          <a-form-model-item label="填写人" prop="TianXieRen">
            <a-input
              v-model="form.TianXieRen"
              placeholder="请输入填报人"
              allowClear
            />
          </a-form-model-item>
          <a-form-model-item label="事件名称" prop="ShiJian">
            <a-input
              v-model="form.ShiJian"
              placeholder="请输入事件名称"
              allowClear
            />
          </a-form-model-item>
          <a-form-model-item label="事件来源" prop="ShiJianLaiYuan">
            <a-input
              v-model="form.ShiJianLaiYuan"
              placeholder="请输入事件来源"
              allowClear
            />
          </a-form-model-item>
             <a-form-model-item label="项目类型" prop="searchSQL4">
            <a-select
              show-search
              placeholder="请选择项目类型"
              style="width: 200px"
              :filter-option="filterOption"
              option-filter-prop="children"
              v-model="form.searchSQL4"
              allowClear
            >
              <a-select-option
                v-for="(item, index) in JSLXS"
                :key="item"
                :value="index"
                >{{ item }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="事件分类" prop="SJFL">
            <a-input
              v-model="form.SJFL"
              placeholder="请输入事件分类"
              allowClear
            />
          </a-form-model-item>
          <a-form-model-item>
            <a-button type="primary" @click="submitForm"> 查询 </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button @click="resetSerchForm"> 重置 </a-button>
          </a-form-model-item>
        </a-row>
      </a-form-model>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新增</a-button>
      </a-space>
    </a-card>
    <a-card
      style="margin-top: 24px; min-height: 605px"
      :bordered="false"
      :body-style="{ padding: '24px' }"
    >
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="columns"
        :data-source="data"
        :pagination="paginationOpt.title >= 8 ? paginationOpt : false"
      >
        <div slot="action" slot-scope="text, record">
          <a slot="action" @click="onEdit(record)">编辑</a>
          <!-- <a-divider type="vertical" />
              <a slot="action" @click="onDel(record.id)">删除</a> -->
        </div>
      </a-table>
      <a-drawer
        :title="title"
        :width="1000"
        :visible="visible"
        @close="onClose"
      >
        <iframe
          style="height: 850px; width: 100%"
          :src="url"
          frameborder="0"
        ></iframe>
      </a-drawer>
    </a-card>
  </div>
</template>
<script>
const columns = [
  {
    title: "序号",
    customRender: (text, record, index) => `${index + 1}`,
  },
  {
    title: "事件分类",
    dataIndex: "SJFL",
  },
  {
    title: "事件来源",
    dataIndex: "ShiJianLaiYuan",
  },
  {
    title: "事件名称",
    dataIndex: "ShiJian",
  },
  {
    title: "是否完成",
    dataIndex: "SFWC",
  },
  {
    title: "备注",
    dataIndex: "BeiZhu",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

const data = [];
import { getDatas, addDatas } from "@/services/dailyFill";
import { mapGetters } from "vuex";
import Cookie from "js-cookie";
export default {
  name: "dailyFill",
  data() {
    return {
      title: "",
      visible: false,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      oid: this.$route.fullPath.replace(/[^\d]/g, ""),
      url: "",
      token: Cookie.get("Authorization"),
      form: {
        TianXieRen: undefined,
        ShiJian: undefined,
        ShiJianLaiYuan: undefined,
        SJFL: undefined,
      },
      paginationOpt: {
        defaultCurrent: 1, // 默认当前页数
        defaultPageSize: 10, // 默认当前页显示数据的大小
        total: 0, // 总数，必须先有
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ["5", "10", "15", "20"],
        showTotal: (total) => `共 ${total} 条`, // 显示总数
        onShowSizeChange: (current, pageSize) => {
          this.paginationOpt.defaultCurrent = 1;
          this.paginationOpt.defaultPageSize = pageSize;
          this.getData(); //显示列表的接口名称
        },
        // 改变每页数量时更新显示
        onChange: (current, size) => {
          this.paginationOpt.defaultCurrent = current;
          this.paginationOpt.defaultPageSize = size;
          this.getData();
        },
      },
    };
  },
  computed: {
    ...mapGetters("account", ["user"]),
  },
  created() {
    this.getData();
  },
  watch: {},

  methods: {
    getData() {
      console.log(this.user);
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      getDatas(
        this.token,
        this.oid,
        defaultCurrent,
        defaultPageSize,
        this.form,
        this.user.userNo
      ).then((res) => {
        console.log(res);
        if (res.data.code == 0) {
          this.paginationOpt.total = res.data.count;
          let arr = res.data.data;
          arr.forEach((item) => {
            item.key = item.OID;
          });
          console.log(arr);
          this.data = arr;
        }
      });
    },
    // 查询按钮
    submitForm() {
      // console.log(this.user.name);
      console.log(this.form);
      
      this.getData();
    },
    start() {
      this.loading = true;
      // ajax request after empty completing
      setTimeout(() => {
        this.loading = false;
        this.selectedRowKeys = [];
      }, 1000);
    },
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    //添加弹窗
    addNew() {
      this.title = "新增";
      this.visible = true;
      addDatas(this.token, "0", this.oid, "0", "0").then((res) => {
        console.log(res);
        const BASE_URL = "jflow-web";
        // window.open(BASE_URL + res.data)
        this.url = BASE_URL + res.data;
      });
      this.getData();
    },
    // 详情
    onEdit(record) {
      this.title = "编辑";
      this.visible = true;
      const { WorkID, FK_Flow, FK_Node, FID } = record;
      console.log(WorkID);
      addDatas(this.token, WorkID, FK_Flow, FK_Node, FID).then((res) => {
        console.log(res);
        const BASE_URL = "jflow-web";
        // window.open(BASE_URL + res.data)
        this.url = BASE_URL + res.data;
      });
      this.getData();
    },

    onDel() {
      this.$confirm({
        title: "提示",
        content: "确定删除该条信息？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {},
        onCancel() {
          console.log("Cancel");
        },
      });
    },
    onClose() {
      this.visible = false;
      parent.location.reload(); //刷新整个当前页
      this.getData();
    },
    resetSerchForm() {
      this.$refs.serchForm.resetFields();
    },
  },
};
</script>
<style scoped lang="less">
@import "index.less";
</style>



