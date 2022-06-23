<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <a-card>
      <a-form-model layout="inline" :model="form" ref="ruleForm">
        <a-row>
          <a-form-model-item label="项目名称" prop="searchSQL1">
            <a-select
              show-search
              option-filter-prop="children"
              :filter-option="filterOption"
              style="width: 200px"
              allowClear
              v-model="form.searchSQL1"
              placeholder="请选择项目名称"
            >
              <a-select-option v-for="(item) in PrjNames" :key="item.OID" 
                >{{ item.PrjName }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="项目状态" prop="searchSQL2">
            <a-select
              show-search
              placeholder="请选择项目状态"
              option-filter-prop="children"
              :filter-option="filterOption"
              style="width: 200px"
              v-model="form.searchSQL2"
              allowClear
            >
              <a-select-option
                v-for="(item, index) in PrjStates"
                :key="item"
                :value="index"
                >{{ item }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="所属年度" prop="searchSQL3">
            <a-select
              show-search
              placeholder="请选择所属年度"
              option-filter-prop="children"
              style="width: 200px"
              :filter-option="filterOption"
              v-model="form.searchSQL3"
              allowClear
            >
              <a-select-option v-for="item in Years" :key="item"
                >{{ item }}
              </a-select-option>
            </a-select>
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
          <a-form-model-item>
            <a-button type="primary" @click="submitForm"> 查询 </a-button>
          </a-form-model-item>
          <a-form-model-item>
            <a-button @click="resetForm"> 重置 </a-button>
          </a-form-model-item>
        </a-row>
      </a-form-model>
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新建</a-button>
        <a-button
          type="primary"
          :disabled="!hasSelected"
          :loading="loading"
          @click="start"
        >
          Reload
        </a-button>
        <span style="margin-left: 8px">
          <template v-if="hasSelected">
            {{ `Selected ${selectedRowKeys.length} items` }}
          </template>
        </span>
      </a-space>
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :body-style="{ padding: '24px' }"
    >
      <div>
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="paginationOpt"
          bordered
          :row-selection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange,
          }"
        >
          <template slot="action" slot-scope="text, record">
            <a slot="action" @click="onEdit(record)">详情</a>
          </template>
        </a-table>
        <a-drawer
          :title="title"
          :width="990"
          :visible="visible"
          @close="onClose"
        >
          <iframe
            style="height: 850px; width: 100%"
            :src="url"
            frameborder="0"
          ></iframe>
        </a-drawer>
      </div>
    </a-card>
  </div>
</template>
<script>
const columns = [
  {
    customRender: (text, record, index) => `${index + 1}`,
    title: "序号",
  },
  {
    title: "项目名称",
    dataIndex: "PrjName",
  },
  {
    title: "发起时间",
    dataIndex: "FlowStartRDT",
  },
  {
    title: "建设类型",
    dataIndex: "JSLX",
  },
  {
    title: "所属单位",
    dataIndex: "ShenBaoDanWei",
  },
  {
    title: "上传人",
    dataIndex: "StarterName",
  },
  {
    title: "项目状态",
    dataIndex: "inDate",
  },
  {
    title: "分数",
    dataIndex: "outReason",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];
const data = [];
const PrjNames = [];
const Years = ["2022", "2021", "2020", "2019", "2018"];
const JSLXS = [];
const PrjStates = ["填报中", "待评价", "评价中", "待发布", "发布归档"];

import {
  getDatas,
  addDatas,
  getAllEnums,
  getPrjNames,
} from "@/services/ProjectMgm";
import { mapState,mapGetters } from "vuex";
import Cookie from "js-cookie";
// import Axios from "axios";
export default {
  name: "ProjectMgm",
  data() {
    return {
      PrjNames, //项目名称
      Years, //所属年度
      PrjStates, //项目状态
      JSLXS, //项目类型
      title: "",
      visible: false,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      oid: this.$route.fullPath.replace(/[^\d]/g, ""),
      url: "",
      token: Cookie.get("Authorization"),
      form: {
        searchSQL1: undefined,
        searchSQL2: undefined,
        searchSQL3: undefined,
        searchSQL4: undefined,
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
    ...mapState("setting", ["pageMinHeight"]),
    ...mapGetters("account", ["user"]),
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    },
  },
  mounted() {},
  created() {
    this.getData();
    this.getAllEnum();
    this.getPrjName();
    // this.getPeopleInfo();
  },
  watch: {},

  methods: {
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

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      );
    },
    // 查询按钮
    submitForm() {
      this.getData();
      console.log("submit!", this.form);
    },
    //查询条件重置按钮
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
    // 初始化搜索条件
    getAllEnum() {
      getAllEnums().then((res) => {
        const [, , JSLX] = res.data;
        const { CfgVal } = JSLX;
        const jslx = CfgVal.split(/[@][0-9][=]/);
        jslx.splice(0, 1);
        this.JSLXS = jslx;
      });
    },
    getData() {
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      getDatas(
        this.token,
        this.oid,
        defaultCurrent,
        defaultPageSize,
        this.form
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
    getPrjName() {
      const name = this.user.userNo
      getPrjNames(this.oid,name).then((res) => {
        this.PrjNames = res.data
        console.log(res);

      });
    },
    //添加弹窗
    addNew() {
      this.title = "新增项目";
      this.visible = true;
      addDatas(this.token, "0", this.oid, "0", "0").then((res) => {
        console.log(res);
        const BASE_URL = "jflow-web";
        // window.open(BASE_URL + res.data)
        this.url = BASE_URL + res.data;
      });
    },
    // 编辑弹窗
    onEdit(record) {
      this.title = "项目详情";
      this.visible = true;
      const { WorkID, FK_Flow, FK_Node, FID } = record;
      console.log(WorkID);
      addDatas(this.token, WorkID, FK_Flow, FK_Node, FID).then((res) => {
        console.log(res);
        const BASE_URL = "jflow-web";
        // window.open(BASE_URL + res.data)
        this.url = BASE_URL + res.data;
      });
    },
    onClose() {
      this.visible = false;
      this.getData();
    },
  },
};
</script>
<style scoped lang="less">
@import "index.less";
</style>



