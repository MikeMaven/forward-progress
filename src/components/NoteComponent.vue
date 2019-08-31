<template>
  <div class="noteIndexComponent">
    <h4>{{ note.title }}</h4>
    <span v-html="note.body" class="showNoteBody"></span>
    <div><a :href="'/EditNote/' + note.id">Edit Note</a> - <a v-on:click="deleteNote">Delete Note</a></div>
    </ul>
  </div>
</template>

<script>
export default {
  title: 'NoteComponent',
  props: ['note'],
  methods: {
    deleteNote() {
      this.$store.dispatch('notes/deleteNote', {
          id: this.note.id,
          source: 'index'
        })
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