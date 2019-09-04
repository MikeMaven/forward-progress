<template>
  <div class="noteIndexComponent">
    <h4>{{ note.title }}</h4>
    <span v-html="note.body" class="showNoteBody"></span>
    <tag-component
    v-for="tag in note.tags"
    :key="tag.id"
    :tag="tag">
    </tag-component>

    <div><a :href="'/EditNote/' + note.id">Edit Note</a> - <a v-on:click="deleteNote">Delete Note</a></div>
  </div>
</template>

<script>
import TagComponent from './TagComponent.vue';

export default {
  title: 'NoteComponent',
  props: ['note'],
  components: {
    TagComponent
  },
  mounted() {},
  methods: {
    deleteNote() {
      this.$store.dispatch('notes/deleteNote', {
        id: this.note.id,
        source: 'index'
      });
    }
  }
}
</script>

<style>

.showNoteBody li p {
  display: inline !important;
}
.noteIndexComponent {
  margin-bottom: 15px;
}

</style>