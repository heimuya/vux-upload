<template>
  <div class="content">
    <vux-upload url=""></vux-upload>
  </div>
</template>

<script>
import VuxUpload from '@/index'

export default {
  components: {
    VuxUpload
  },
  data () {
    return {
      headers: {
        token: 'f89cc0f9200dcb862863dc0556bbb9ca'
      }
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';

.content {
  margin-top: 30px;
}
</style>
