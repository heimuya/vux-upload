<template>
  <div class="content">
    <vux-upload
      url="http://jy.pietian.com/patient/pic_upload"
      :headers="headers"
      :data="data"
      :images="images"
      :readonly="false"
      :max="2"
      :withCredentials="false"
      :span="4"
      :preview="true"
      @success="onSuccess"
      @error="onError"
      @remove="onRemove"
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
        token: '5b2944cqeqwe9226e62589bc80c4afbb1f7'
      },
      data: {
        id: 1
      },
      images: []
    }
  },
  methods: {
    onSuccess (res, file) {
      this.images.push({
        src: 'http://jy.pietian.com' + res.result.path
      })
    },
    onError (e) {
      console.log(e.message)
    },
    onRemove (index) {
      this.images.splice(index, 1)
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
