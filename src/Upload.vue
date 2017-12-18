<template>
  <div class="vux-upload">
    <flexbox :gutter="0" wrap="wrap">
      <flexbox-item :span="span" v-for="(item, index) in images" :key="index" @click.native="onPreview(index)">
        <div :style="{ backgroudImage: `url(${item.url})`, backgroundSize: 'cover', position: 'relative' }">
          <x-icon type="ios-close" class="red"></x-icon>
        </div>
      </flexbox-item>
      <flexbox-item :span="span" v-show="!readonly && images.length < max" @click="addImage">
        <div class="vux-upload-bg">
          <div class="weui-uploader__input-box vux-upload-content">
            <input ref="input" class="weui-uploader__input" type="file" :accept="accept" :capture="capture" @change="onChange">
            <x-icon type="ios-close" class="red"></x-icon>
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
    title: {
      type: String,
      default: '图片上传'
    },
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
    }
  },
  computed: {
    iconStyle () {
      return {
        width: `${width / 5}px`,
        height: `${width / 5}px`,
      }
    }
  },
  methods: {
    addImage () {

    },
    onChange () {

    },
    onPreview (index) {
      this.$refs.previewer.show(index);
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
      }
    }
  }
}
</style>
