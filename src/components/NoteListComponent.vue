<template>
  <div class="noteIndexComponent row">
    <div id="star">
      <img v-if="!note.starred" src="/public/images/star-off.png" v-on:click="starToggle">
      <img v-else src="/public/images/star-on.png" v-on:click="starToggle">
    </div>
    <div id="titleAndPreview">
      <h4>{{ note.title }}</h4>
      <p v-text="this.previewText" class="showNoteBody"></p>
    </div>
    <div id="arrowButton">
      <h2>&#9654</h2>
    </div>
  </div>
</template>


//     <tag-component
//     v-for="tag in note.tags"
//     :key="tag.id"
//     :tag="tag">
//     </tag-component>

//     <div><a :href="'/EditNote/' + note.id">Edit Note</a> - <a v-on:click="deleteNote">Delete Note</a></div>

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
    previewText() {
      return previewTextGenerator(this.note);
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

.showNoteBody li p {
  display: inline !important;
}

.noteIndexComponent {
  padding: 10px 25px 10px 25px;
  margin: 0;
  width: 100%;
  position: relative;
}

.noteIndexComponent:hover {
  background-color: white;
}

#star {
  display: inline-block;
  margin-right: 10px;
  width: 10%;
  text-align: center;
}

#star img {
  width: 90%;
}

#titleAndPreview {
  width: 80%;
  display: inline-block;
}

#titleAndPreview h4 {
  font-family: paralucent, sans-serif;
  font-weight: 300;
  font-size: 2em;
}

.showNoteBody {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.2em;
  color: #646464;
}

#arrowButton {
  position: relative;
  display: inline-block;
}

#arrowButton h2 {
  font-family: 'Open Sans', sans-serif;
  font-size: 1.5em;
  position: absolute;
  top: 25%;
}
</style>