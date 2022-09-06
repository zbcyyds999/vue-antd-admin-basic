<template>
  <div>
    <a-card>
      <div :class="advanced ? 'search' : null">
        <a-form-model :model="form" layout="horizontal" ref="serchForm">
          <div :class="advanced ? null : 'fold'">
            <a-row>
              <a-col :xl="{ span: 7 }" :lg="{ span: 8 }" :md="{ span: 8 }">
                <a-form-model-item
                  label="产品名称"
                  :labelCol="{ span: 7 }"
                  :wrapperCol="{ span: 16 }"
                  prop="ChanPinMingChen"
                >
                  <a-input
                    v-model="form.ChanPinMingChen"
                    placeholder="请输入产品名称"
                  />
                </a-form-model-item>
              </a-col>
              <a-col :xl="{ span: 7 }" :md="8" :sm="24">
                <a-form-model-item
                  label="CPU"
                  :labelCol="{ span: 7 }"
                  :wrapperCol="{ span: 16 }"
                  prop="CPU"
                >
                  <a-input v-model="form.CPU" placeholder="请输入CPU" />
                </a-form-model-item>
              </a-col>
              <a-col :xl="{ span: 7 }" :md="8" :sm="24">
                <a-form-model-item
                  label="产品型号"
                  :labelCol="{ span: 7 }"
                  :wrapperCol="{ span: 16 }"
                  prop="ChanPinXingHao"
                >
                  <a-input
                    v-model="form.ChanPinXingHao"
                    placeholder="请输入产品型号"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
            <a-row v-if="advanced">
              <a-col :xl="{ span: 7 }" :md="8" :sm="24">
                <a-form-model-item
                  label="平台"
                  :labelCol="{ span: 7 }"
                  :wrapperCol="{ span: 16 }"
                  prop="PingTai"
                >
                  <a-input v-model="form.PingTai" placeholder="请输入平台" />
                </a-form-model-item>
              </a-col>
              <a-col :xl="{ span: 7 }" :md="8" :sm="24">
                <a-form-model-item
                  label="所属机房"
                  :labelCol="{ span: 7 }"
                  :wrapperCol="{ span: 16 }"
                  prop="SuoShuJiFang"
                >
                  <a-input
                    v-model="form.SuoShuJiFang"
                    placeholder="请输入所属机房"
                  />
                </a-form-model-item>
              </a-col>
            </a-row>
          </div>
          <span style="float: right">
            <a-button type="primary" @click="submitForm"> 查询 </a-button>
            <a-button style="margin-left: 18px" @click="resetSerchForm">
              重置
            </a-button>

            <a @click="toggleAdvanced" style="margin-left: 8px">
              {{ advanced ? "收起" : "展开" }}
              <a-icon :type="advanced ? 'up' : 'down'" />
            </a>
          </span>
        </a-form-model>
      </div>
    </a-card>
    <a-card
      style="margin-top: 24px;min-height: ${pageMinHeight}px"
      :bordered="false"
      :body-style="{ padding: '24px' }"
    >
      <a-space class="operator">
        <a-button @click="addNew" type="primary">新增</a-button>
      </a-space>
      <a-table
        :row-selection="rowSelection"
        :columns="columns"
        :data-source="data"
        bordered
        :loading="loading"
        :scroll="{ x: 1300 }"
        :pagination="paginationOpt.total >= 5 ? paginationOpt : false"
      >
        <div slot="action" slot-scope="text, record">
          <a slot="action" @click="onEdit(record)">编辑</a>

          <a-divider type="vertical" />
          <a slot="action" @click="onDel(record)">删除</a>
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
    fixed: "left",
    width: 65,
  },
  {
    title: "产品名称",
    dataIndex: "ChanPinMingChen",
    fixed: "left",
    width: 200,
    ellipsis: true,
  },
  {
    title: "产品型号",
    dataIndex: "ChanPinXingHao",
    width: 100,
    ellipsis: true,
  },
  {
    title: "CPU",
    dataIndex: "CPU",
    width: 100,
    ellipsis: true,
  },
  {
    title: "系统盘",
    dataIndex: "XiTongPan",
    width: 100,
    ellipsis: true,
  },
  {
    title: "显卡",
    dataIndex: "XianKa",
    width: 100,
    ellipsis: true,
  },
  {
    title: "平台",
    dataIndex: "PingTai",
    width: 100,
    ellipsis: true,
  },

  {
    title: "电源",
    dataIndex: "DianYuan",
    width: 100,
    ellipsis: true,
  },
  {
    title: "显示器",
    dataIndex: "XianShiQi",
    width: 100,
    ellipsis: true,
  },
  {
    title: "扩展接口",
    dataIndex: "KuoZhanJieKou",
    width: 100,
    ellipsis: true,
  },
  {
    title: "内存宽带",
    dataIndex: "NaCunKuanDai",
    width: 100,
    ellipsis: true,
  },
  {
    title: "系统盘读写数据速率",
    dataIndex: "XiTongPanDuXieShuJuS",
    width: 160,
    ellipsis: true,
  },
  {
    title: "价格",
    dataIndex: "JiaGe",
    width: 100,
    ellipsis: true,
  },
  {
    title: "资源用途",
    dataIndex: "ZiYuanYongTu",
    width: 100,
    ellipsis: true,
  },
  {
    title: "所有人",
    dataIndex: "SuoYouRen",
    width: 100,
    ellipsis: true,
  },
  {
    title: "使用情况",
    dataIndex: "ShiYongQingKuang",
    width: 100,
    ellipsis: true,
  },
  {
    title: "所属机房",
    dataIndex: "SuoShuJiFang",
    width: 100,
    ellipsis: true,
    fixed: "right",
  },
  {
    title: "所属机柜",
    dataIndex: "SuoShuJiGui",
    fixed: "right",
    width: 100,
    ellipsis: true,
  },

  {
    title: "操作",
    scopedSlots: { customRender: "action" },
    fixed: "right",
    width: 120,
  },
];
const ZYs = [];
const data = [];
import {
  getTodolistDatas,
  getAllEnums,
  getJflowData,
  getPage,
  DelData,
} from "@/services/jflow";
import { mapGetters, mapState } from "vuex";
import Cookie from "js-cookie";
export default {
  name: "hardwareERP",
  data() {
    return {
      title: "",
      visible: false,
      advanced: false,
      data,
      columns,
      intervalId: null, //计时器
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
        ChanPinMingChen: undefined,
        ChanPinXingHao: undefined,
        CPU: undefined,
        SuoShuJiFang: undefined,
        PingTai: undefined,
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
    ...mapState("setting", ["pageMinHeight"]),
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
    this.dataRefreh();
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clear();
  },
  watch: {},

  methods: {
    toggleAdvanced() {
      this.advanced = !this.advanced;
    },
    // 定时刷新数据函数
    dataRefreh() {
      // 计时器正在进行中，退出函数
      if (this.intervalId != null) {
        return;
      }
      // 计时器为空，操作
      this.intervalId = setInterval(() => {
        this.getData(); //加载数据函数
      }, 300000);
    },
    // 停止定时器
    clear() {
      clearInterval(this.intervalId); //清除计时器
      this.intervalId = null; //设置为null
    },

    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    getData() {
      this.formData = { ...this.form };
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      getTodolistDatas(
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
          this.data = [...arr];
          console.log(arr);
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

    //添加弹窗
    addNew() {
      this.visible = true;
      getJflowData(this.token).then((res) => {
        let arr = res.data;
        let self = this;
        arr.forEach((item) => {
          if (item.FK_FlowSort == 105 && item.No == this.oid) {
            getPage(this.token, "0", this.oid, "0", "0").then((res) => {
              const BASE_URL = "jflow-web";
              this.url =
                BASE_URL +
                res.data +
                "&hideCloseBtn=1&hideSendBtn=1&hideTrackBtn=1" +
                "&s=" +
                new Date().getTime();
              window.addEventListener("message", function (e) {
                if (e.data == "close") {
                  self.onClose();
                }
              });
            });
          }
        });
      });
      this.getData();
    },
    // 详情
    onEdit(record) {
      let self = this;
      this.visible = true;
      const { WorkID, FK_Flow, FK_Node, FID } = record;
      getPage(this.token, WorkID, FK_Flow, FK_Node, FID).then((res) => {
        const BASE_URL = "jflow-web";
        this.url =
          BASE_URL + res.data + "&hideCloseBtn=1&hideSendBtn=1&hideTrackBtn=1";
        window.addEventListener("message", function (e) {
          if (e.data == "close") {
            self.onClose();
          }
        });
      });
      this.getData();
    },

    onDel(record) {
      let self = this;
      this.$confirm({
        title: "提示",
        content: "确定删除该条工单？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          const { WorkID } = record;
          DelData(self.token, WorkID).then((res) => {
            if (res.status == 200) {
              self.$message.success({
                content: res.data,
              });
              self.getData();
            } else {
              self.$message.error({
                content: res.data.message,
              });
            }
          });
        },
        onCancel() {
          console.log("Cancel");
        },
      });
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



