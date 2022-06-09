<template>
  <a-layout id="components-layout">
    <a-layout-sider
      v-model="collapsed"
      :trigger="null"
      collapsible
      width="250"
      theme="light"
      collapsedWidth="0"
      style="
         {
          margin: 10;
        }
      "
    >
      <tree></tree>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon
          class="trigger"
          :type="collapsed ? 'menu-unfold' : 'menu-fold'"
          @click="() => (collapsed = !collapsed)"
        />
        <a-button type="primary" @click="showDrawer">
          <a-icon type="plus" /> 新建
        </a-button>
      </a-layout-header>
      <a-layout-content :style="{ background: '#fff', minHeight: '380px' }">
        <a-table
          :columns="columns"
          :data-source="data"
          :pagination="paginationOpt"
          bordered
          :scroll="{ x: 'calc(700px + 50%)', y: 480 }"
        >
          <div slot="action" slot-scope="text, record">
            <a slot="action" @click="onEdit(record)">编辑</a>
          </div>
        </a-table>
        <ADrawer :title="title" :visible="visible"></ADrawer>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
import Tree from "./Tree.vue";
import { columns } from "./TableData";
import ADrawer from "./aDrawer.vue";

import { core_metadata } from "@/services/directory";

const data = [
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
  components: { Tree, ADrawer },
  name: "resourceDirectory",
  data() {
    return {
      title: "",
      collapsed: false,
      visible: false,
      data,
      columns,
      selectedRowKeys: [], // Check here to configure the default column
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
  methods: {
    getData() {
      const { defaultCurrent, defaultPageSize } = this.paginationOpt;
      core_metadata(defaultCurrent, defaultPageSize, "").then((res) => {
        console.log(res.data);
        this.paginationOpt.total = res.data.totalNum;
        let arr1 = res.data.contentList;
        arr1.forEach((item) => {
          item.key = item.id;
        });
        this.data = arr1;
      });
    },
    onEdit() {
      this.title = "编辑";
      this.visible = true;
    },
    showDrawer() {
      this.title = "新建";
      this.visible = true;
    },
  },
  computed: {},
  created() {
    this.getData();
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>