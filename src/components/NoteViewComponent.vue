<template>
  <div id="noteViewComponent">
    <div>
      <h1>{{ selectedNote.title }}</h1>
      <ul>
        <li>Edit</li>
        <li>Delete</li>
      </ul>
    </div>
    <div>
      <p>{{ selectedNote.body }}</p>
    </div>
    <div>
      {{ selectedNote.tags }}
    </div>
  </div>
</template>

<script>
import TagComponent from './TagComponent.vue';
import previewTextGenerator from '../store/notes/helpers/previewTextGenerator'

export default {
  title: 'NoteListComponent',
  props: ['note'],
  components: {
    TagComponent
  },
  mounted() {},
  computed: {
    selectedNote() {
      return this.$store.getters['notes/getSelectedNote'];
    },
  },
  methods: {
    deleteNote() {
      this.$store.dispatch('notes/deleteNote', {
        id: this.note.id,
        source: 'index'
      });
    },
    starToggle() {
      this.$store.dispatch('notes/starToggle', {
        id: this.note.id,
        starred: this.note.starred
      });
    }
  }
}
</script>

<style>
#noteViewComponent {
  float: right;
  max-width: 75%;
  width: 75%;
  padding: 25px;
}
</style>