<template>
	<div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>

<script>
export default {

  name: 'ueditor',

  data () {
    return {

    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  mounted () {
    const that = this;
    this.editor = UE.getEditor('editor', this.config); // 初始化UE
    this.editor.addListener("ready", function () {
      that.editor.setContent(that.defaultMsg); // 确保UE加载完成后，放入内容。
    });
  },
  methods: {
    getUEContent () { // 获取内容方法
      return this.editor.getContent()
    }
  },
  destroyed () {
    this.editor.destroy();
  }
}
</script>

<style lang="css" scoped>
</style>