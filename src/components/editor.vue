<template>
  <div>
    <quill-editor
      v-model="content"
      ref="myQuillEditor"
      :options="editorOption"
      @blur="onEditorBlur($event)"
      @focus="onEditorFocus($event)"
      @change="onEditorChange($event)"
    >
    </quill-editor>
    <div @click="isEmpty(mobile) ? ss() : qq()">ddd</div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      mobile: "",
      imgSrc: "",
      imgId: "", //区分是哪个图片
      content: "",
      editorOption: {
        //  富文本编辑器配置

        theme: "snow",
        placeholder: "请输入正文"
      }
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    }
  },
  methods: {
    isEmpty() {
      console.log(12);
      return true;
    },
    ss() {
      alert(1);
    },
    qq() {
      alert(1);
    },
    onEditorReady() {
      console.log("准备编辑器");
      // 准备编辑器
    },
    onEditorBlur() {
      console.log("失去焦点事件");
    }, // 失去焦点事件
    onEditorFocus(editor) {
      console.log(editor);
      console.log("获得焦点事件");
    }, // 获得焦点事件
    onEditorChange() {
      console.log("内容改变事件");
    } // 内容改变事件
    //测试
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
