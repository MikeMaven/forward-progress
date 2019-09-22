<template>
  <div id="noteViewComponent">
    <div id="noteHeader">
      <h1>{{ selectedNote.title }}</h1>
      <ul>
        <a :href="'/EditNote/' + selectedNote.id"><li>Edit</li></a>
        <a v-on:click="deleteNote"><li>Delete</li></a>
      </ul>
    </div>
    <div id="noteBody">
      <p v-html="selectedNote.body"></p>
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
      const oldSelectionId = this.selectedNote.id;
      this.$store.dispatch('notes/updateSelectionUponDeletion', this.selectedNote.id)
      this.$store.dispatch('notes/deleteNote', {
        id: oldSelectionId,
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
  padding: 25px 35px 25px 25px;
}

#noteHeader h1 {
  display: inline-block;
  font-family: paralucent, sans-serif;
  font-weight: 400;
  font-size: 3em;
  color: #013369;
}

#noteHeader ul {
  float: right;
}

#noteHeader ul, li {
  display: inline-block;
  font-family: paralucent, sans-serif;
  font-weight: 400;
  font-size: 1.25em;
}

#noteHeader li {
  padding: 10px 25px 10px 25px;
  color: #d50a0a;
}

#noteBody p {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.25em;
}
</style>