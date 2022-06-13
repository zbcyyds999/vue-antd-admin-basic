<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
      <iframe
        id="content"
        src="http://192.168.1.107:8081/#/login"
        frameborder="0"
      ></iframe>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "SystemSettings",

  data() {
    return {};
  },
  computed: {
    ...mapState("setting", ["pageMinHeight"]),
    desc() {
      return this.$t("description");
    },
  },
};
</script>

<style scoped lang="less">
@import "index";
</style>