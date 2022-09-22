<template>
  <a-card class="card" title="结果查询" :bordered="false">
    <a-table
      :columns="columns"
      :data-source="data"
      :rowKey="
        (record, index) => {
          return index;
        }
      "
      bordered
    >
      <template slot="states" slot-scope="text">
        <span v-if="text === null"><a-tag color="red">未开始</a-tag></span>
        <span v-else-if="text === '1'"
          ><a-tag color="orange">审核中</a-tag></span
        >
        <span v-else-if="text === '2'"><a-tag color="green">完成</a-tag></span>
      </template>
      <template slot="action" slot-scope="text, record">
        <a @click="showModal(record)">查看详情</a>
        <a-modal
          v-model="visible"
          ok-text="确认"
          :title="record.hospitalName"
          width="65%"
        >
          <template slot="footer">
            <div style="text-align: center">
              <a-button key="back" type="primary" @click="handleCancel">
                关闭
              </a-button>
            </div>
          </template>
          <div class="cont">
            <a-descriptions
              v-for="item in steps"
              :key="item.title"
              :title="item.title"
              
            >
              <a-descriptions-item
                v-for="(itm, index) in item.child"
                :key="index"
                :label="itm.label"
              >
                {{ formData[itm.prop] }}
              </a-descriptions-item>
            </a-descriptions>
          </div>
        </a-modal>
        <a-divider type="vertical" />
        <a class="ant-dropdown-link"> 下载 </a>
      </template>
    </a-table>
  </a-card>
</template>
<script>
const columns = [
  { title: "年份", dataIndex: "years", width: "5%" },
  {
    title: "医院名称",
    dataIndex: "hospitalName",
    width: "20%",
  },
  {
    title: "填写状态",
    dataIndex: "states",
    scopedSlots: { customRender: "states" },
    width: "5%",
  },
  { title: "创建时间", dataIndex: "startTime", width: "15%" },
  {
    title: "修改时间",
    dataIndex: "updateTime",
    width: "15%",
  },
  {
    title: "操作",
    dataIndex: "action",
    scopedSlots: { customRender: "action" },
    width: "15%",
  },
];

const steps = [
  {
    id: 0,
    title: "社会评价",
  },
  {
    id: 1,
    title: "内部管理",
  },
  {
    id: 2,
    title: "运行效率",
  },
  {
    id: 3,
    title: "发展实力",
  },
];
import { getHsList, getInput } from "@/services/hospital";

export default {
  name: "ResultList",
  data() {
    return {
      color: "",
      steps,
      visible: false,
      data: [],
      columns,
      formData: {},
    };
  },
  methods: {
    getInput() {
      getInput().then((res) => {
        if (res.data.code == 200) {
          steps.forEach((item) => {
            item.child = this.simpleToNest(res.data.obj, item.id);
          });
        }
      });
    },
    simpleToNest(data, type) {
      let result = [];
      data.map((item) => {
        if (item.type - 0 === type) {
          let children = this.simpleToNest(data, item.id);
          if (children && children.length) {
            item.children = children;
          }
          result.push(item);
        }
      });
      return result;
    },
    getList() {
      getHsList("00001").then((res) => {
        if (res.data.code == 200) {
          this.data = res.data.obj;
        } 
      });
    },
    showModal(record) {
      this.visible = true;
      this.formData = record;
    },
    handleCancel() {
      this.visible = false;
    },
  },
  created() {
    this.getInput();
    this.getList();
  },
};
</script>


<style scoped lang="less">
.cont {
  width: 100%;
  height: 450px;
  overflow-y: auto;
}
/deep/ .ant-table-body{
  height: 550px;
}
</style>
