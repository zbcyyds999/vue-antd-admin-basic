<template>
  <div>
    <a-card>
      <a-form-model layout="inline" :model="form" ref="serchForm">
        <a-row>
          <a-form-model-item label="建单人" prop="JianDanRen">
            <a-input v-model="form.JianDanRen" placeholder="请输入建单人" />
          </a-form-model-item>

          <a-form-model-item label="摘要" prop="ZY">
            <a-select
              show-search
              placeholder="请选择摘要"
              style="width: 200px"
              :filter-option="filterOption"
              option-filter-prop="children"
              v-model="form.ZY"
            >
              <a-select-option
                v-for="(item, index) in ZYs"
                :key="item"
                :value="index"
                >{{ item }}
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="建单时间" prop="JianDanShiJian">
            <a-date-picker
              format="YYYY-MM-DD"
              v-model="form.JianDanShiJian"
              style="width: 200px"
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
    </a-card>
    <a-card
      style="margin-top: 24px"
      :bordered="false"
      :body-style="{ padding: '24px' }"
    >
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
        bordered
        :loading="loading"
        :pagination="paginationOpt.total >= 5 ? paginationOpt : false"
      >
        <template slot="WFState" slot-scope="text">
          <span v-if="text === 3"><a-tag color="green">完成</a-tag></span>
        </template>
        <div slot="action" slot-scope="text, record">
          <a slot="action" @click="onEdit(record)">查看</a>
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
    title: "工单号",
    dataIndex: "BillNo",
  },
  {
    title: "摘要",
    dataIndex: "ZY",
  },
  {
    title: "建单人",
    dataIndex: "JianDanRen",
  },
  {
    title: "执行人",
    dataIndex: "ZhiXingRen",
  },
  {
    title: "建单时间",
    dataIndex: "JianDanShiJian",
  },
  {
    title: "结束时间",
    dataIndex: "SDTOfNode",
  },
  {
    title: "当前节点",
    dataIndex: "NodeName",
  },
  {
    title: "状态",
    dataIndex: "WFState",
    scopedSlots: { customRender: "WFState" },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];
const ZYs = [];
const data = [];

import { getCompleteDatas, getAllEnums } from "@/services/jflow";

import moment from "moment";
import { mapGetters } from "vuex";
import Cookie from "js-cookie";
export default {
  name: "completedList",
  data() {
    return {
      title: "",
      visible: false,
      data,
      columns,
      selectedRowKeys: [],
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      oid: this.$route.fullPath.replace(/[^\d]/g, ""),
      url: "",
      ZYs,
      token: Cookie.get("Authorization"),
      formData: {},
      form: {
        JianDanRen: undefined,
        JianDanShiJian: undefined,
        ZY: undefined,
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
    rowSelection() {
      const { selectedRowKeys } = this;
      return {
        selectedRowKeys,
        onChange: this.onSelectChange,
        hideDefaultSelections: true,
        selections: [
          {
            key: "all-data",
            text: "全选所有",
            onSelect: () => {
              this.selectedRowKeys = [...Array(46).keys()]; // 0...45
            },
          },
          {
            key: "odd",
            text: "选择奇数行",
            onSelect: (changableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return false;
                }
                return true;
              });
              this.selectedRowKeys = newSelectedRowKeys;
            },
          },
          {
            key: "even",
            text: "选择偶数行",
            onSelect: (changableRowKeys) => {
              let newSelectedRowKeys = [];
              newSelectedRowKeys = changableRowKeys.filter((key, index) => {
                if (index % 2 !== 0) {
                  return true;
                }
                return false;
              });
              this.selectedRowKeys = newSelectedRowKeys;
            },
          },
        ],
        onSelection: this.onSelection,
      };
    },
  },
  created() {
    this.getData();
    this.getAllEnum();
  },
  watch: {},
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    getData() {
      this.formData = { ...this.form };
      if (this.formData.JianDanShiJian !== undefined) {
        this.formData.JianDanShiJian = moment(this.form.JianDanShiJian).format(
          "yyyy-MM-DD"
        );
      }
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      getCompleteDatas(
        this.token,
        this.oid,
        defaultCurrent,
        defaultPageSize,
        this.formData,
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
        const [, , , , , , , , , ZY] = res.data;
        const { CfgVal } = ZY;
        const jslx = CfgVal.split(/[@][0-9][=]/);
        jslx.splice(0, 1);
        this.ZYs = jslx;
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
    // 详情
    onEdit(record) {
      this.visible = true;
      const { WorkID, FK_Flow, FK_Node, FID } = record;
      const data =
        "/WF/MyViewGener.htm?HttpHandlerName=BP.WF.HttpHandler.WF_MyView&Track=1&hideCloseBtn=1&WorkID=" +
        WorkID +
        "&FK_Flow=" +
        FK_Flow +
        "&FK_Node=" +
        FK_Node +
        "&FID=" +
        FID +
        "&NodeID=" +
        FK_Node +
        "&UserNo=" +
        this.user.userNo +
        "&SID=" +
        this.token;
      const BASE_URL = "jflow-web";
      this.url = BASE_URL + data;
    },

    onClose() {
      this.visible = false;
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



