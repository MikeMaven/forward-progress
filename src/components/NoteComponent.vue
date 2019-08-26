<template>
  <div class="noteIndexComponent">
    <h4>{{ note.title }}</h4>
    <span v-html="note.body" class="showNoteBody"></span>
    <div><a :href="'/EditNote/' + note.id">Edit Note</a> - Delete Note</div>
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
.noteIndexComponent {
  margin-bottom: 15px;
}

</style>