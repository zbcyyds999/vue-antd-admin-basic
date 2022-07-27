<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <!-- <h1>{{$t('content')}}</h1> -->
    <h1>功能正在建设</h1>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'settings',
    data() {
      return {
      }
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
     
    }
  }
</script>

<style scoped lang="less">
@import "index";
</style>