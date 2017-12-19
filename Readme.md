# vux-upload

vux-upload是一个vue的上传组件，是对[vux](https://github.com/airyland/vux)组件库的一个补充，同时参考了[@greedying](https://github.com/greedying/vux-uploader)开源的组件，添加了部分功能，然后进行开源。

## vux-upload实现的功能

+ 基于vux，适合vux项目
+ 增加了删除功能
+ 增加图片预览功能
+ 增加自定义headers、data、withCredentials等
+ 增加beforeUpload钩子，增加success、error、remove等事件

## 示例

![示例](https://ws4.sinaimg.cn/large/006tKfTcly1fmkvl6937ej30ha0lemxl.jpg)

![预览](https://ws3.sinaimg.cn/large/006tKfTcly1fmkvmlo5jqj30h40pi7at.jpg)

## 快速使用

```javascript
npm install vux-upload --save
```

```javascript
// 引入组件
import VuxUpload from 'vux-upload'
```
```javascript
// 子组件
export default {
  ...
  components: {
    ...
    VuxUpload,
    ...
  }
  ...
}
```

```javascript
  // 使用组件
  <vux-upload
    url=""
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
```

详细使用方法可参考example中的示例。

**注意** 接口返回参数中需要status字段,'ok'代表上传成功。

```json
{
  status: 'ok'
}
```

### props说明

* images
  * `类型`: Array
  * `默认值`: []，空数组
  * `含义`: 图片数组，格式为 `[ { src: '/url/of/img.ong' }, ...]` 
  * `备注`: 数据为双向绑定

* readonly
  * `类型`: Boolean
  * `默认值`: false
  * `含义`: 只读模式，无新增功能，适合查看功能

* beforeUpload
  * `类型`: Function
  * `默认值`: 无
  * `含义`: 上传前钩子函件

* withCredentials
  * `类型`: Boolean
  * `默认值`: false
  * `含义`: 是否跨域请求携带cookie等数据

* headers
  * `类型`: Array
  * `默认值`: []
  * `含义`: 自定义headers参数

* data
  * `类型`: Array
  * `默认值`: []
  * `含义`: 自定义额外数据

* url
  * `类型`: String
  * `默认值`: 无，必填
  * `含义`: 图片上传地址

* span
  * `类型`: Number
  * `默认值`: 4
  * `含义`: 单图网格所占格数，整行12格

* max
  * `类型`: Number
  * `默认值`: 1
  * `含义`: 图片最大张数
  * `备注`: 图片达到max值时，新增按钮消失

* accpet
  * `类型`: String
  * `默认值`: image/*
  * `含义`: 支持上传的数据类型

* capture
  * `类型`: String
  * `默认值`: ''
  * `含义`: input 的capture属性
  * `备注`: 可以设置为`camera`，此时点击新增按钮，部分机型会直接调起相机，注意，各型号手机表现不同，请谨慎使用。`handleClick`为true时，此属性无效

* preview
  * `类型`: Boolean
  * `默认值`: true
  * `含义`: 是否需要预览模式

* compress
  * `类型`: Object
  * `默认值`: { quality: 0.7, fieldName: 'file' }
  * `含义`: 压缩参数，详情见[localResizeIMG](https://github.com/think2011/localResizeIMG)

### emit事件说明

* success
  * `emit时机`: 上传成功时触发
  * `参数`: res, file  (res为接口返回数据，file为当前上传文件)
  * `备注`: 无

* error
  * `emit时机`: 压缩错误、上传错误时触发
  * `参数`: event, file  (file为当前上传文件)
  * `备注`: 无

* remove
  * `emit时机`: 点击删除按钮时触发
  * `参数`: index (图片文件数组中的索引)

## 感谢与参考

+ [vux](https://github.com/airyland/vux)
+ [weui](https://github.com/weui/weui)
+ [vux-uploader](https://github.com/greedying/vux-uploader)
+ [axios](https://github.com/mzabriskie/axios)
