<template>
  <div style="border: 1px solid #ccc">
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editor"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="height: 500px; overflow-y: hidden"
      v-model="html"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="onCreated"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { uploadFile } from "@/03-api/article";
export default Vue.extend({
  components: { Editor, Toolbar },
  props: {
    data: {
      default: "",
      type: String,
    },
  },
  data() {
    return {
      editor: null,
      html: "",
      toolbarConfig: {},
      editorConfig: {
        placeholder: "请输入内容...",
        MENU_CONF: {
          uploadImage: {
            server: "/mc_api/content/images_upload",
            fieldName: "image",
            allowedFileTypes: [
              "image/jpg",
              "image/png",
              "image/gif",
              "image/webp",
            ],
            async customUpload(file, insertFn) {
              // JS 语法
              // file 即选中的文件
              // 自己实现上传，并得到图片 url alt href
              // 最后插入图片
              // 创建 FormData 对象
              const formData = { image: file };
              const data = await uploadFile(formData);
              insertFn(data.url, data.alt, data.href);
            },
          },
        },
      },
      mode: "default", // or 'simple'
    };
  },
  methods: {
    onCreated(editor) {
      this.editor = Object.seal(editor);
    },
  },
  mounted() {
    // 模拟 ajax 请求，异步渲染编辑器
    setTimeout(() => {
      this.html = this.data;
    }, 1500);
  },
  beforeDestroy() {
    const editor = this.editor;
    if (editor == null) return;
    editor.destroy(); // 组件销毁时，及时销毁编辑器
  },
  watch: {
    html: function (n, o) {
      this.$emit("change", n);
    },
  },
});
</script>
<style src="@wangeditor/editor/dist/css/style.css"></style>
