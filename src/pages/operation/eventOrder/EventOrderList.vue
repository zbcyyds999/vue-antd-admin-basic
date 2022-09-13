<template>
  <div>
    <a-card>
      <a-form-model layout="inline" :model="form" ref="serchForm">
        <a-row>
          <a-form-model-item label="建单人" prop="JianDanRen">
            <a-input
              v-model="form.JianDanRen"
              style="width: 200px"
              placeholder="请输入建单人"
            />
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
          <a-form-model-item label="发起时间" prop="JianDanShiJian">
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
        :pagination="paginationOpt.total >= 5 ? paginationOpt : false"
      >
        <template slot="sta" slot-scope="text">
          <span v-if="text === '0'"><a-tag color="red">草稿</a-tag></span>
          <span v-else-if="text === '1'"><a-tag color="red">撤回</a-tag></span>
          <span v-else-if="text === '2'"
            ><a-tag color="green">待办</a-tag></span
          >
          <span v-else-if="text === '5'"><a-tag color="red">退回</a-tag></span>
          <span v-else-if="text === '6'"><a-tag color="red">转发</a-tag></span>
        </template>
        <div slot="action" slot-scope="text, record">
          <a slot="action" @click="onEdit(record)">编辑</a>

          <a-divider
            type="vertical"
            v-if="
              record.WFState === '5' ||
              record.TodoEmpsNum === 0 ||
              (record.TodoEmpsNum !== 0 &&
                record.FK_Node1 === '01' &&
                record.StarterName === user.name)
            "
          />
          <a
            slot="action"
            @click="onDel(record)"
            v-if="
              record.WFState === '5' ||
              record.TodoEmpsNum === 0 ||
              (record.TodoEmpsNum !== 0 &&
                record.FK_Node1 === '01' &&
                record.StarterName === user.name)
            "
            >删除</a
          >
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
    title: "房间号",
    dataIndex: "ShenQingRenFangJianH",
  },
  {
    title: "建单人",
    dataIndex: "JianDanRen",
  },

  {
    title: "建单时间",
    dataIndex: "JianDanShiJian",
  },
  {
    title: "当前节点",
    dataIndex: "NodeName",
  },

  {
    title: "状态",
    dataIndex: "sta",
    scopedSlots: { customRender: "sta" },
  },
  {
    title: "优先级",
    dataIndex: "YXJ",
  },
  {
    title: "操作",
    scopedSlots: { customRender: "action" },
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
import moment from "moment";
export default {
  name: "EventOrderList",
  data() {
    return {
      title: "",
      visible: false,
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
        JianDanRen: undefined,
        ShiJianLaiYuan: undefined,
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
    window.getFromIframe = this.getFromIframe; //把vue实例中的方法引用给window对象
  },
  destroyed() {
    // 在页面销毁后，清除计时器
    this.clear();
  },
  mounted() {},
  watch: {},

  methods: {
    getFromIframe(value) {
      if (value == "close") {
        this.onClose();
      }
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
      if (this.formData.JianDanShiJian !== undefined) {
        this.formData.JianDanShiJian = moment(this.form.JianDanShiJian).format(
          "yyyy-MM-DD"
        );
      }
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      setTimeout(() => {
        this.loading = false;
      }, 500);
      getTodolistDatas(
        Cookie.get("Authorization"),
        this.oid,
        defaultCurrent,
        defaultPageSize,
        this.formData,
        this.user.userNo
      ).then((res) => {
        if (res.data.code == 0) {
          console.log(this.token, "中间");
          this.paginationOpt.total = res.data.count;
          let arr = res.data.data;
          arr.forEach((item) => {
            let aa = item.FK_Node.toString();
            item.FK_Node1 = aa.substring(aa.length - 2);
            if (item.TodoEmpsNum === 0) {
              item.sta = "0";
            } else if (
              item.TodoEmpsNum !== 0 &&
              item.FK_Node1 === "01" &&
              item.WFState === "2"
            ) {
              item.sta = "1";
            } else if (item.WFState === "2") {
              item.sta = "2";
            } else if (item.WFState === "5") {
              item.sta = "5";
            } else if (item.WFState === "6") {
              item.sta = "6";
            } else if (item.WFState === "1") {
              item.sta = "0";
            }

            item.key = item.OID;
          });
          this.data = arr;
        }
      });
      console.log(this.token, "之后");
      this.paginationOpt.defaultCurrent = 1; // 默认当前页数
      this.paginationOpt.defaultPageSize = 10; // 默认当前页显示数据的大小
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
        arr.forEach((item) => {
          if (item.FK_FlowSort == 100 && item.No == this.oid) {
            getPage(this.token, "0", this.oid, "0", "0").then((res) => {
              const BASE_URL = "jflow-web";
              this.url = BASE_URL + res.data + "&s=" + new Date().getTime();
            });
            window.addEventListener("message", function (e) {
              if (e.data == "close") {
                this.onClose();
              }
            });
          }
        });
      });
    },
    // 详情
    onEdit(record) {
      this.visible = true;
      const { WorkID, FK_Flow, FK_Node, FID } = record;
      getPage(this.token, WorkID, FK_Flow, FK_Node, FID).then((res) => {
        const BASE_URL = "jflow-web";
        // window.open(BASE_URL + res.data)
        this.url = BASE_URL + res.data;
      });
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
            console.log(res.data);
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



