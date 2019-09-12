<template>
  <div class="noteIndexComponent">
    <h4>{{ note.title }}</h4>
    <div id="star">
      <img v-if="!note.starred" src="/public/images/star-off.png" v-on:click="starToggle">
      <img v-else src="/public/images/star-on.png" v-on:click="starToggle">
    </div>
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

.showNoteBody li p {
  display: inline !important;
}
.noteIndexComponent {
  margin-bottom: 25px;
}

#star {
  float: left;
}
</style>