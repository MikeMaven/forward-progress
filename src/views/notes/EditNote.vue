<template>
  <div>
    <h1>Edit Note</h1>
    <text-editor-component-v2
      :noteTitle = "noteToEdit.title"
      :noteBody = "noteToEdit.body"
      :editNoteID = "this.$route.params.id"
    ></text-editor-component-v2>

  </div>
</template>

<script>
import TextEditorComponentV2 from '../../components/TextEditorComponentV2.vue';

export default {
  name: 'editnote',
  components: {
    TextEditorComponentV2
  },
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('notes/getAllTags');
    this.$store.dispatch('notes/getNote', { id: this.$route.params.id })
  },
  computed: {
    noteToEdit(){
      return this.$store.getters['notes/noteToEdit'];
    },
    selected() {
      return this.$store.getters['notes/getSelectedTags']
    }
  }
}
</script>