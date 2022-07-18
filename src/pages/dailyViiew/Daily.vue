<template>
  <div>
    <a-card>
      <a-form-model layout="inline" :model="form" ref="serchForm">
        <a-row>
          <a-form-model-item label="填写人" prop="filler">
            <a-input
              v-model="form.filler"
              placeholder="请输入填写人"
              allowClear
            />
          </a-form-model-item>
          <a-form-model-item label="填报日期" prop="fillTime">
            <a-date-picker
              format="YYYY-MM-DD"
              v-model="form.fillTime"
              style="width: 200px"
            />
          </a-form-model-item>

          <a-form-model-item label="状态" prop="STATUS">
            <a-select
              allowClear
              v-model="form.STATUS"
              placeholder="请选择状态"
              style="width: 200px"
            >
              <a-select-option value="0">未读</a-select-option>
              <a-select-option value="1">已读</a-select-option>
            </a-select>
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
      style="margin-top: 24px; min-height: 660px"
      :bordered="false"
      :body-style="{ padding: '24px' }"
    >
      <a-table
        :row-selection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
        }"
        :columns="columns1"
        :data-source="data"
        :pagination="paginationOpt.title >= 8 ? paginationOpt : false"
      >
        <span slot="STATUS" slot-scope="STATUS">
          <a-tag :color="STATUS === 0 ? 'red' : 'green'">
            {{ STATUS === 0 ? "未读" : "已读" }}
          </a-tag>
        </span>
        <div slot="action" slot-scope="text, record">
          <a slot="action" @click="onEdit(record)">查看</a>
        </div>
      </a-table>
      <a-drawer :title="title" width="1000" :visible="visible" @close="onClose">
        <a-table
          :columns="columns2"
          :data-source="tabledata"
          :pagination="false"
        >
          <div slot="action" slot-scope="text, record">
            <a slot="action" @click="LookTable(record)">查看</a>
          </div>
        </a-table>
        <a-drawer
          :title="title2"
          width="1000"
          :visible="childrenDrawer"
          @close="onChildrenDrawerClose"
        >
          <iframe
            style="height: 850px; width: 100%"
            :src="url"
            frameborder="0"
          ></iframe>
        </a-drawer>
      </a-drawer>
    </a-card>
  </div>
</template>

<script>
const columns1 = [
  {
    title: "序号",
    customRender: (text, record, index) => `${index + 1}`,
  },
  {
    title: "填报人",
    dataIndex: "filler",
  },
  {
    title: "填报日期",
    dataIndex: "fillTime",
  },
  {
    title: "状态",
    dataIndex: "STATUS",
    scopedSlots: { customRender: "STATUS" },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];
const columns2 = [
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
const tabledata = [];

import { getViewDatas, getDayDatas, getOneEvent } from "@/services/daily";
import { mapGetters } from "vuex";
import Cookie from "js-cookie";
import moment from "moment";

export default {
  name: "Daily",
  data() {
    return {
      title: "",
      title2: "",
      visible: false,
      childrenDrawer: false,
      url: "",
      data,
      tabledata,
      columns1,
      columns2,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      token: Cookie.get("Authorization"),
      formData: {},
      form: {
        filler: undefined,
        fillTime: undefined,
        STATUS: undefined,
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
    //获取当前表格数据
    getData() {
      this.formData = { ...this.form };
     if(this.formData.fillTime!==undefined){
       this.formData.fillTime = moment(this.form.fillTime).format("yyyy-MM-DD");
     }
      console.log(11, this.formData.fillTime);
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      getViewDatas(
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
            item.key = item.id;
          });
          this.data = arr;
          this.formData ={}
        }
      });
    },

    // 查询按钮
    submitForm() {
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

    // 表格查看
    onEdit(record) {
      this.title = "详情";
      this.visible = true;
      const { id } = record;
      getDayDatas(id, "1", this.user.userNo).then((res) => {
        const arrData = res.data;
        if (arrData.code == 0) {
          const arr = arrData.data;
          arr.forEach((item) => {
            item.key = item.OID;
          });
          this.tabledata = arr;
        }
      });
      this.getData();
    },
    onClose() {
      this.visible = false;
      this.getData();
    },
    LookTable(record) {
      console.log(record);
      const { Sender, StarterName, ShiJian, WorkID, FK_Flow, FK_Node, FID } =
        record;
      this.title2 = StarterName + "--" + ShiJian;

      if (Sender !== this.user.userNo) {
        getOneEvent(this.token, WorkID, FK_Flow, FK_Node, FID).then((res) => {
          const BASE_URL = "jflow-web";
          this.url = BASE_URL + res.data + "&hideAllBtn=1";
        });
      } else {
        const { WorkID, FK_Flow, FK_Node, FID } = record;
        const data =
          // "/WF/MyViewGener.htm?HttpHandlerName=BP.WF.HttpHandler.WF_MyView&Track=1&WorkID=" + WorkID + '&FK_Flow=' + FK_Flow + '&FK_Node=' + FK_Node + '&FID='+FID+'&NodeID=' + FK_Node + '&UserNo=' + this.user.userNo + '&SID=' + this.token

          "/WF/MyViewGener.htm?HttpHandlerName=BP.WF.HttpHandler.WF_MyView&Track=1&hideAllBtn=1&WorkID=" +
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
      }

      this.childrenDrawer = true;
    },
    onChildrenDrawerClose() {
      this.childrenDrawer = false;
    },
    resetSerchForm() {
      this.$refs.serchForm.resetFields();
    },
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>