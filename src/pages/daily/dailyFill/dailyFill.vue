<template>
  <div>
    <a-card>
      <a-form-model layout="inline" :model="form" ref="serchForm">
        <a-form-model-item label="事件名称" prop="ShiJian">
          <a-input v-model="form.ShiJian" placeholder="请输入事件名称" />
        </a-form-model-item>

        <a-form-model-item label="事件来源" prop="ShiJianLaiYuan">
          <a-input v-model="form.ShiJianLaiYuan" placeholder="请输入事件来源" />
        </a-form-model-item>

        <a-form-model-item label="事件分类" prop="SJFL">
          <a-select
            show-search
            placeholder="请输入事件分类"
            :filter-option="filterOption"
            option-filter-prop="children"
            style="width: 180px"
            v-model="form.SJFL"
          >
            <a-select-option
              v-for="(item, index) in SJFLs"
              :key="item"
              :value="index"
              >{{ item }}
            </a-select-option>
          </a-select>
        </a-form-model-item>

        <a-form-model-item>
          <a-button type="primary" @click="submitForm"> 查询 </a-button>
        </a-form-model-item>

        <a-form-model-item>
          <a-button @click="resetSerchForm" style="margin-left: 10px">
            重置
          </a-button>
        </a-form-model-item>
      </a-form-model>
      <!--   <a-form-model v-bind="formItemLayout" :model="form" ref="serchForm">
        <a-row>
           <a-col :xl="{ span: 5 }" :lg="5" :md="10" :sm="24">
            <a-form-model-item label="填写人" prop="TianXieRen">
              <a-input v-model="form.TianXieRen" placeholder="请输入填报人" />
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{ span: 5 }"
            :lg="{ span: 5 }"
            :md="{ span: 10 }"
            :sm="24"
          >
            <a-form-model-item label="事件名称" prop="ShiJian">
              <a-input v-model="form.ShiJian" placeholder="请输入事件名称" />
            </a-form-model-item>
          </a-col>
          <a-col
            :xl="{ span: 5 }"
            :lg="{ span: 5 }"
            :md="{ span: 10 }"
            :sm="24"
          >
            <a-form-model-item label="事件来源" prop="ShiJianLaiYuan">
              <a-input
                v-model="form.ShiJianLaiYuan"
                placeholder="请输入事件来源"
              />
            </a-form-model-item>
          </a-col>

          <a-col
            :xl="{ span: 5 }"
            :lg="{ span: 5 }"
            :md="{ span: 10 }"
            :sm="24"
          >
            <a-form-model-item label="事件分类" prop="SJFL">
              <a-select
                show-search
                placeholder="请输入事件分类"
                :filter-option="filterOption"
                option-filter-prop="children"
                v-model="form.SJFL"
              >
                <a-select-option
                  v-for="(item, index) in SJFLs"
                  :key="item"
                  :value="index"
                  >{{ item }}
                </a-select-option>
              </a-select>
            </a-form-model-item>
          </a-col>
          <a-col :xl="{ span: 1 }" :lg="{ span: 2 }">
            <a-form-model-item>
              <a-button type="primary" @click="submitForm"> 查询 </a-button>
            </a-form-model-item>
          </a-col>
          <a-col :xl="{ span: 1 }" :lg="{ span: 2 }">
            <a-form-model-item>
              <a-button @click="resetSerchForm" style="margin-left: 10px">
                重置
              </a-button>
            </a-form-model-item>
          </a-col>
        </a-row>
      </a-form-model> -->
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :body-style="{ padding: '24px' }"
    >
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新增</a-button>
      </a-space>
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        bordered
        :columns="columns"
        :data-source="data"
        :loading="loading"
        :pagination="paginationOpt.total >= 5 ? paginationOpt : false"
      >
        <div slot="action" slot-scope="text, record">
          <a slot="action" @click="onEdit(record)">编辑</a>
        </div>
      </a-table>
      <a-drawer
        :title="title"
        :width="1000"
        :visible="visible"
        @close="onClose"
      >
        <iframe
          id="mobsf"
          scrolling="no"
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
    width: "6%",
  },
  {
    title: "事件分类",
    dataIndex: "SJFL",
    width: "13%",
  },
  {
    title: "事件来源",
    dataIndex: "ShiJianLaiYuan",
    width: "13%",
    ellipsis: true,
  },
  {
    title: "事件名称",
    dataIndex: "ShiJian",
    width: "13%",
    ellipsis: true,
  },
  {
    title: "是否完成",
    dataIndex: "SFWC",
    width: "10%",
  },
  {
    title: "备注",
    dataIndex: "BeiZhu",
    width: "31%",
    ellipsis: true,
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];
const SJFLs = [];
const data = [];
// import { getCompleteDatas,getPage, getAllEnums } from "@/services/jflow";
import { getPage, getAllEnums } from "@/services/jflow";
import { getDatas } from "@/services/dailyFill";
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
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 7 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 15 },
        },
      },
      oid: this.$route.fullPath.replace(/[^\d]/g, ""),
      url: "",
      SJFLs,
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
    this.getAllEnum();
  },
  watch: {},

  methods: {
    getData() {
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      getDatas(
        this.token,
        this.oid,
        defaultCurrent,
        defaultPageSize,
        this.form,
        this.user.userNo
      ).then((res) => {
        if (res.data.code == 0) {
          this.paginationOpt.total = res.data.count;
          let arr = res.data.data;
          arr.forEach((item) => {
            item.key = item.OID;
          });
          this.data = arr;
        }
      });
    },
    getAllEnum() {
      getAllEnums().then((res) => {
        const [, , , , , , , , , , , , SJFL] = res.data;
        const { CfgVal } = SJFL;
        const jslx = CfgVal.split(/[@][0-9][=]/);
        jslx.splice(0, 1);
        this.SJFLs = jslx;
      });
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // 查询按钮
    submitForm() {
      this.loading = true;
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
      this.visible = true;
      getPage(this.token, "0", this.oid, "0", "0").then((res) => {
        const BASE_URL = "jflow-web";
        this.url = BASE_URL + res.data + "&s=" + new Date().getTime();
        window.addEventListener("message", function (e) {
          if (e.data == "close") {
            self.onClose();
          }
        });
      });
      this.getData();
    },
    // 详情
    onEdit(record) {
      this.visible = true;
      const { WorkID, FK_Flow, FK_Node, FID } = record;
      //console.log(WorkID);
      getPage(this.token, WorkID, FK_Flow, FK_Node, FID).then((res) => {
        //console.log(res);
        const BASE_URL = "jflow-web";
        // window.open(BASE_URL + res.data)
        this.url = BASE_URL + res.data;
      });
      this.getData();
    },
    onClose() {
      this.visible = false;
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



