<template>
  <div>
    <a-card>
      <a-form-model layout="inline" :model="form" ref="serchForm">
        <a-row>
          <a-form-model-item label="填写人" prop="TianXieRen">
            <a-input v-model="form.TianXieRen" placeholder="请输入填写人" />
          </a-form-model-item>

          <a-form-model-item label="填报日期" prop="TianXieRiQi">
            <a-date-picker
              format="YYYY-MM-DD"
              v-model="form.TianXieRiQi"
              style="width: 200px"
            />
          </a-form-model-item>

          <a-form-model-item label="状态" prop="DcStatus">
            <a-select
              v-model="form.DcStatus"
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
      style="margin-top: 24px"
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
        :loading="loading"
        :pagination="paginationOpt.total >= 8 ? paginationOpt : false"
      >
        <span slot="DcStatus" slot-scope="DcStatus">
          <a-tag :color="DcStatus === 0 ? 'red' : 'green'">
            {{ DcStatus === 0 ? "未读" : "已读" }}
          </a-tag>
        </span>
        <div slot="action" slot-scope="text, record">
          <a slot="action" @click="LookTable(record)">查看</a>
        </div>
      </a-table>
      <a-drawer :title="title" width="1000" :visible="visible" @close="onClose">
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
    title: "填写人",
    dataIndex: "TianXieRen",
  },
  {
    title: "填报日期",
    dataIndex: "TianXieRiQi",
  },
  {
    title: "状态",
    dataIndex: "DcStatus",
    scopedSlots: { customRender: "DcStatus" },
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
  },
];

const data = [];

import { getViewDatas, getDayDatas, getOneEvent } from "@/services/daily";
import { mapGetters } from "vuex";
import Cookie from "js-cookie";
import moment from "moment";

export default {
  name: "Daily",
  data() {
    return {
      title: "",
      visible: false,
      url: "",
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
      loading: false,
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      token: Cookie.get("Authorization"),
      formData: {},
      form: {
        TianXieRen: undefined,
        TianXieRiQi: undefined,
        DcStatus: undefined,
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
      if (this.formData.TianXieRiQi !== undefined) {
        this.formData.TianXieRiQi = moment(this.form.TianXieRiQi).format(
          "yyyy-MM-DD"
        );
      }
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      getViewDatas(
        this.token,
        this.oid,
        defaultCurrent,
        defaultPageSize,
        this.formData,
        this.user.userNo
      ).then((res) => {
        if (res.data.code == 0) {
          console.log(res.data.data);
          this.paginationOpt.total = res.data.count;
          let arr = res.data.data;
          arr.forEach((item) => {
            item.key = item.OID;
          });
          this.data = arr;
          this.formData = {};
        }  
      });
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

    // 表格查看
    LookTable(record) {
      this.title = "详情";
      this.visible = true;
      const { WorkID, FK_Flow, FK_Node, FID } = record;
      getOneEvent(this.token, WorkID, FK_Flow, FK_Node, FID).then((res) => {
        const BASE_URL = "jflow-web";
        this.url = BASE_URL + res.data + "&hideAllBtn=1";
      });
      getDayDatas(WorkID, "1", this.user.userNo).then((res) => {
        console.log(res.data);
      });
      this.getData();
    },
    onClose() {
      this.visible = false;
      this.getData();
    },
    // LookTable(record) {
    //   const { Sender, WorkID, FK_Flow, FK_Node, FID } = record;
    //   if (Sender !== this.user.userNo) {
    //     getOneEvent(this.token, WorkID, FK_Flow, FK_Node, FID).then((res) => {
    //       console.log(11, res.data);
    //       const BASE_URL = "jflow-web";
    //       this.url = BASE_URL + res.data + "&hideAllBtn=1";
    //     });
    //   } else {
    //     const { WorkID, FK_Flow, FK_Node, FID } = record;
    //     const data =
    //       // "/WF/MyViewGener.htm?HttpHandlerName=BP.WF.HttpHandler.WF_MyView&Track=1&WorkID=" + WorkID + '&FK_Flow=' + FK_Flow + '&FK_Node=' + FK_Node + '&FID='+FID+'&NodeID=' + FK_Node + '&UserNo=' + this.user.userNo + '&SID=' + this.token

    //       "/WF/MyViewGener.htm?HttpHandlerName=BP.WF.HttpHandler.WF_MyView&Track=1&hideAllBtn=1&WorkID=" +
    //       WorkID +
    //       "&FK_Flow=" +
    //       FK_Flow +
    //       "&FK_Node=" +
    //       FK_Node +
    //       "&FID=" +
    //       FID +
    //       "&NodeID=" +
    //       FK_Node +
    //       "&UserNo=" +
    //       this.user.userNo +
    //       "&SID=" +
    //       this.token;
    //     const BASE_URL = "jflow-web";

    //     this.url = BASE_URL + data;
    //   }
    // },

    resetSerchForm() {
      this.$refs.serchForm.resetFields();
    },
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>