<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <iframe id="content" :src="url" frameborder="0"></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
import Cookie from "js-cookie";

export default {
  name: "SystemSettings",
  ...mapState("setting", ["pageMinHeight"]),
  data() {
    return {
      // url:"http://192.168.1.105:8089/jflow-web//WF/MyFlowGener.htm?t=0.966295854142363&WorkID=601&NodeID=2101&FK_Node=2101&FID=0&UserNo=ceshi&SID=94F4FA83019BEBCE2A0FA0B39BD2DDA7&FK_Flow=021&Token="+ Cookie.get("Authorization")
      url:
        "http://192.168.1.105:8089/jflow-web/DataUser/DevelopAPI/ProcessRequest?DoType=GenerFrmUrl&Token=" +
        Cookie.get("Authorization") +
        "&WorkID=0" +
        "&FK_Flow=021" +
        "&FK_Node=0" +
        "&FID=0",
    };
  },
  methods: {
    initToken() {
      console.log(this.pageMinHeight);
      console.log(this.url);
    },
  },
  created() {
    this.initToken();
  },
  computed: {
    ...mapState("setting", ["pageMinHeight"]),
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>