<template>
  <div class="content">
    <vux-upload
      url="http://jy.pietian.com/patient/record"
      :headers="headers"
      :data="data"
      :images="images"
      :readonly="false"
      :max="6"
      :withCredentials="false"
      :span="4"
      :preview="true"
    >
    </vux-upload>
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
        token: '5b2944cfe9226e62589bc80c4afbb1f7'
      },
      data: {
        id: 62
      },
      images: []
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
