<template>
  <div id="newBlogContainer">
    <h1>Create a new Blog Post</h1>
    <text-editor-component-v2
      :noteTitle = "null"
      :noteBody = "null"
      :editNoteID = "null"
      :type = "'blog'"
    ></text-editor-component-v2>
  </div>
</template>

<script>
import TextEditorComponentV2 from '../../components/TextEditorComponentV2.vue';

export default {
  components: {
    TextEditorComponentV2
  }
};

</script>

<style scoped></style>
