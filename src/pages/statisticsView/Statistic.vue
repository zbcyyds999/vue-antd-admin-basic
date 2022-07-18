<template>
  <div class="new-page" :style="`min-height: ${pageMinHeight}px`">
    <!-- <h1>{{$t('content')}}</h1> -->
    <h1>功能正在建设</h1>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'Statistic',
    i18n: require('./i18n'),
    data() {
      return {
      }
    },
    computed: {
      ...mapState('setting', ['pageMinHeight']),
      desc() {
        return this.$t('description')
      }
    }
  }
</script>

<style scoped lang="less">
@import "index";
</style>