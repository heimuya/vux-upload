<template>
  <div class="vux-upload">
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="span" v-for="(item, index) in images" :key="index" @click.native="onPreview(index)">
        <div class="vux-upload-bg">
          <div class="vux-upload-content" :style="{ backgroudImage: `url(${item.src})` }">
            <x-icon type="ios-close" class="red" @click.native="onRemove(index)"></x-icon>
          </div>
        </div>
        
      </flexbox-item>
      <flexbox-item :span="span" v-show="!readonly && images.length < max">
        <div class="vux-upload-bg">
          <div class="weui-uploader__input-box vux-upload-content">
            <input v-show="!loading" ref="file" class="weui-uploader__input" value="" type="file" :accept="accept" :capture="capture" @change="onChange">
            <div v-show="loading">
              <inline-loading></inline-loading>
            </div>
          </div>
        </div>
      </flexbox-item>
    </flexbox>
    <previewer :list="images" ref="previewer"></previewer>
  </div>
</template>

<script>
import { Flexbox, FlexboxItem, Previewer, InlineLoading } from 'vux'
import axios from 'axios'
import lrz from 'lrz'

export default {
  components: {
    Flexbox,
    FlexboxItem,
    Previewer,
    InlineLoading
  },
  model: {
    prop: 'images',
    event: 'change'
  },
  props: {
    images: {
      type: Array,
      default: () => []
    },
    readonly: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 9
    },
    beforeUpload: Function,
    withCredentials: {
      type: Boolean,
      default: false
    },
    headers: {
      type: Object,
      default: () => {
        return {}
      }
    },
    data: {
      type: Object,
      default: () => {
        return {}
      }
    },
    url: {
      type: String,
      required: true
    },
    span: {
      type: Number,
      default: 3
    },
    accept: {
      type: String,
      default: 'image/*'
    },
    capture: {
      type: String,
      default: '*'
    },
    preview: {
      type: Boolean,
      default: true
    },
    fieldName: {
      type: String,
      default: 'file'
    },
    compress: Object
  },
  data () {
    return {
      loading: false
    }
  },
  watch: {
    loading: function (newValue) {
      if (!newValue) {
        this.$refs['file'].value = ''
      }
    }
  },
  methods: {
    onChange (event) {
      // 移动端仅支持单文件上传
      const file = event.target.files[0]
      if (!file) return

      this.uploadFile(file)
    },
    uploadFile (file) {
      if (this.images.length >= this.max) {
        return
      }
      if (this.beforeUpload && typeof this.beforeUpload === 'function') {
        const before = this.beforeUpload(file)
        if (before && before.then) {
          before.then(processedFile => {
            const fileType = Object.prototype.toString.call(processedFile)
            if (fileType === '[object File]' || fileType === '[object Blob]') {
              this.post(processedFile);
            } else {
              this.post(file)
            }
          })
        } else if (before !== false) {
          this.post(file)
        }
      } else {
        this.post(file)
      }
    },
    post (file) {
      this.loading = true

      // 压缩上传
      lrz(file, Object.assign({
        quality: 0.7,
        fieldName: this.fieldName
      }, this.compress)).then((rst) => {
        const data = rst.formData;
        for (let key in this.data) {
          if (this.data.hasOwnProperty(key)) {
            data.append(key, this.data[key])
          }
        }
        axios.post(this.url, data, {
          headers: this.headers,
          withCredentials: this.withCredentials
        }).then((response) => {
          if (response.status === 200 && response.data.status.code === 0) {
            this.onSuccess(response.data, file)
            this.loading = false
          } else {
            this.onError(new Error(response.data.message), file)
            this.loading = false
          }
        }).catch((err) => {
          this.onError(err, file)
          this.loading = false
        })
      }).catch((err) => {
        this.onError(err, file)
      })
    },
    onProgress (e) {
      this.loading = true
    },
    onPreview (index) {
      if (this.preview) {
        this.$refs.previewer.show(this.images[index]);
      }
    },
    onSuccess (res, file) {
      this.$emit('success', res, file)
    },
    onError (e) {
      this.$emit('error', e)
    },
    onRemove (index) {
      this.$emit('remove', index)
    }
  }
}
</script>

<style lang="less">
@import '~vux/src/styles/weui/widget/weui-uploader/index.less';

.vux-upload {
  overflow: initial;
  width: 100%;
  .vux-flexbox-item {
    margin-top: 7px;
    margin-bottom: 7px;
    .vux-upload-bg {
      width: 80%;
      margin-left: 10%;
      .vux-x-icon {
        fill: #F70968;
        position: absolute;
        top: 0;
        left: 100%;
        width: 20px;
        height: 20px;
        transform: translate(-50%, -50%);
      }
      .vux-upload-content {
        width: 100%;
        height: 0;
        padding-bottom: 100%;
        margin: 0;
        background-size: cover;
        position: relative;
      }
    }
  }
}
</style>
