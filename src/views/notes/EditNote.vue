<template>
  <div>
    <h1>Edit Note</h1>
    <text-editor-component
      :noteTitle = "noteToEdit.title"
      :noteBody = "noteToEdit.body"
      :editNoteID = "this.$route.params.id"
    ></text-editor-component>

  </div>
</template>

<script>
import TextEditorComponent from '../../components/TextEditorComponent.vue';

export default {
  name: 'editnote',
  components: {
    TextEditorComponent
  },
  data() {
    return {}
  },
  mounted() {
    this.$store.dispatch('notes/getNote', { id: this.$route.params.id })
  },
  computed: {
    noteToEdit(){
      return this.$store.getters['notes/noteToEdit'];
    }
  }
}
</script>