<template>
  <div>
    <h4>{{ note.title }}</h4>
    <span v-html="note.body"></span>
  </div>
</template>

<script>
export default {
  title: 'NoteComponent',
  props: ['note']
}
</script>
