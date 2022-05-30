<template>
  <div>
    <a-input-search
      style="margin-bottom: 8px"
      placeholder="Search"
      @change="onChange"
    />
    <a-tree
      :expanded-keys="expandedKeys"
      :auto-expand-parent="autoExpandParent"
      :tree-data="gData"
      @expand="onExpand"
      @select="onSelect"
    >
      <template #title="{ key: treeKey, title }">
        <a-dropdown :trigger="['contextmenu']">
          <span v-if="title.indexOf(searchValue) > -1">
            {{ title.substr(0, title.indexOf(searchValue)) }}
            <span style="color: #f50">{{ searchValue }}</span>
            {{ title.substr(title.indexOf(searchValue) + searchValue.length) }}
          </span>
          <span v-else>{{ title }}</span>
          <template #overlay>
            <a-menu
              @click="
                ({ key: menuKey }) => onContextMenuClick(treeKey, menuKey)
              "
            >
              <a-menu-item
                key="1"
                @click.native="addSameLevelNode"
                >新增同级</a-menu-item
              >
              <a-menu-item
                key="2"
                v-show="lastLevel"
                @click.native="addChildNode"
                >新增下级</a-menu-item
              >
              <a-menu-item key="3" @click.native="editNode">编辑</a-menu-item>
              <a-menu-item key="4" @click.native="deleteNode">删除</a-menu-item>
            </a-menu>
          </template>
        </a-dropdown>
      </template>
    </a-tree>
  </div>
</template>

<script>
const dataList = [];
const generateList = (data) => {
  for (let i = 0; i < data.length; i++) {
    const node = data[i];
    const key = node.key;
    dataList.push({ key, title: key });
    if (node.children) {
      generateList(node.children);
    }
  }
};
generateList(gData);

const getParentKey = (key, tree) => {
  let parentKey;
  for (let i = 0; i < tree.length; i++) {
    const node = tree[i];
    if (node.children) {
      if (node.children.some((item) => item.key === key)) {
        parentKey = node.key;
      } else if (getParentKey(key, node.children)) {
        parentKey = getParentKey(key, node.children);
      }
    }
  }
  return parentKey;
};
import { gData } from "../../mock/tree/treeData";
import {getTree} from '@/services/api_test'
export default {
  name: "Tree",
  data() {
    return {
      firstLevel: false,
      lastLevel: false,
      expandedKeys: [5],
      searchValue: "",
      autoExpandParent: true,
      gData,
    };
  },
  created() {
    this.getTreeData();
  },
  methods: {
    // 获取树结构
    getTreeData() {
      getTree().then(res => {
        console.log(res);
        // if (res && res.code == 200) {
        //   const scopedSlots = {
        //     title: 'custom'
        //   }             
        //   let arr1 = res.data.groupList  
        //   arr1.forEach(item => {
        //     item.scopedSlots = scopedSlots
        //     item.isPeople = false
        //   })
        //   this.treeData = this.dealTreedata([...arr1])
        // }
      })
    },

    onContextMenuClick(treeKey, menuKey) {
      console.log(1,`treeKey: ${treeKey}, menuKey: ${menuKey}`);
    },
     addSameLevelNode (e) {
       console.log(11,e);
     // 写自己的业务逻辑
    },
    orgEdit () {
    // 写自己的业务逻辑
    },
    orgDelete () {
    // 写自己的业务逻辑
    },
    onSelect(keys, event) {
      console.log("Trigger Select", keys, event);
    },
    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys;
      this.autoExpandParent = false;
    },
    onChange(e) {
      const value = e.target.value;
      const expandedKeys = dataList
        .map((item) => {
          if (item.title.indexOf(value) > -1) {
            return getParentKey(item.key, gData);
          }
          return null;
        })
        .filter((item, i, self) => item && self.indexOf(item) === i);
      Object.assign(this, {
        expandedKeys,
        searchValue: value,
        autoExpandParent: true,
      });
    },
  },
};
</script>

<style>
</style>