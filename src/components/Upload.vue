<template>
  <div>
    <div>
      图片上传:
      <div class="bgImg" @click="mark('bgImg')">
        <img :src="imgSrc" class="upimg" alt v-if="imgSrc" />
        <i class="el-icon-plus" v-else></i>
        <vue-core-image-upload
          class="upimg-btn"
          :isXhr="false"
          crop="local"
          cropRatio="300:100"
          :cropBtn="{ ok: '确定', cancel: '取消' }"
          :maxFileSize="1048576"
          text
          extensions="png,gif,jpeg,jpg"
          @imagechanged="imageChanged"
        ></vue-core-image-upload>
      </div>
    </div>
    <div>其他文件上传：</div>
  </div>
</template>
<script>
// import VueCoreImageUpload from "vue-core-image-upload/dist/vue-core-image-upload.vue";
// import VueCoreImageUpload from "vue-core-image-upload.vue";
import VueCoreImageUpload from "vue-core-image-upload";
// import VueCoreImageUpload from "vue-core-image-upload";
import { uploadImgByBase64 } from "../assets/js/upImg";

export default {
  components: {
    VueCoreImageUpload
  },
  data() {
    return {
      imgSrc: "",
      imgId: "" //区分是哪个图片
    };
  },
  methods: {
    imageChanged(val) {
      // 获取token 图片上传 返回地址
      uploadImgByBase64("cmbAnnualBonus", val, this.successFn);
    },
    successFn(res) {
      // rse图片地址
      console.log(res);
    },
    mark(val) {
      this.imgId = val;
    }
  }
};
</script>
<style lang="less" scoped>
.bgImg {
  width: 300px;
  height: 100px;
  vertical-align: text-top;
  display: inline-block;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  img {
    height: 100px;
    width: auto;
    display: block;
    margin-block: auto;
  }
  .el-icon-plus {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    -webkit-transform: translate(-50%, -50%);
  }
  .upimg-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
