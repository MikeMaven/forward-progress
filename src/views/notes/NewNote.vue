<template>
  <div id="newNoteContainer">
    <h1>NEW NOTE</h1>
    <text-editor-component-v2
      :noteTitle = "null"
      :noteBody = "null"
      :editNoteID = "null"
    ></text-editor-component-v2>
  </div>
</template>

<script>
import TextEditorComponentV2 from '../../components/TextEditorComponentV2.vue';

export default {
  components: {
    TextEditorComponentV2
  },
  data() {
    return {
    }
  },
  methods: {

  },
  mounted() {
    this.$store.dispatch('notes/getAllTags');
  }
}
</script>

<style>
h1 {
  font-family: paralucent, sans-serif;
  font-weight: 400;
  color: #013369;
}

#newNoteContainer {
  margin: 10px 16% 0 16%;
}

/* CSS Here fixes menu buttons and styling */
.textButton {
  width: 5%;
  font-size: .75em;
  border-radius: 5px;
  vertical-align: middle;
  padding: 6px;
}

.buttonRow {
  position: relative;
  margin: 15px 0 5px 0;
}

.svg-inline--fa {
  vertical-align: -webkit-baseline-middle;
}

/* CSS here specifically fixed some of the text box's styling issues: */
.ProseMirror {
  padding: 6px;
}

.ProseMirror:focus {
  outline: none !important;
}

.editor li p {
  display: inline !important;
}
</style>
