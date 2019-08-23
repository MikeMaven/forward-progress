<template>
  <div>
    <h4>{{ note.title }}</h4>
    <span v-html="note.body" class="showNoteBody"></span>
  </div>
</template>

<script>
export default {
  title: 'NoteComponent',
  props: ['note']
}
</script>

<style>

.showNoteBody li p {
  display: inline !important;
}

</style>