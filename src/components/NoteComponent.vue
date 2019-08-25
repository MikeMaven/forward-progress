<template>
  <div>
    <h4>{{ note.title }}</h4>
    <span v-html="note.body" class="showNoteBody"></span>
    <ul>
      <li><a :href="'/EditNote/' + note.id">Edit Note</a></li>
      <li>Delete Note</li>
    </ul>
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