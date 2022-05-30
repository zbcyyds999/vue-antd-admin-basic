<template>
    <a-layout id="components-layout">
      <a-layout-sider
        v-model="collapsed"
        :trigger="null"
        collapsible
        width="250"
        theme="light"
        collapsedWidth="0"
        style="{margin: 10;} "
      >
      <Tree></Tree>
      <Tree1></Tree1>
      </a-layout-sider>
      <a-layout>
        <a-layout-header style="background: #fff; padding: 0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content :style="{ background: '#fff', minHeight: '500px' }">
          <QueryList ref="list"></QueryList>
        </a-layout-content>
      </a-layout>
    </a-layout>
  
</template>

<script>
import QueryList from "./QueryList.vue";
import Tree from "./Tree.vue";
import Tree1 from "./tree1.vue";


export default {
  name: "Demo",
  components: { QueryList, Tree, Tree1 },
  data() {
    return {
      collapsed: false,
    };
  },
  methods: {},
  computed: {
    
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>