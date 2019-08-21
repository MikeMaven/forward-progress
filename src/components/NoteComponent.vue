<template>
  <div>
    <h4>{{ note.title }}</h4>
    <p>{{ note.body }}</p>
  </div>
</template>

<script>
export default {
  title: 'NoteComponent',
  props: ['note']
}
</script>