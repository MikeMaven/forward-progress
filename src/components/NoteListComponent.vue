<template>
  <div class="noteIndexComponent row" v-on:click="selectNote" id="noteListContainer" v-bind:class="{ noteListSelectedColor: this.note.id === selectedNote.id }">
    <div id="star">
      <img v-if="!note.starred && this.note.id !== selectedNote.id" src="~public/images/star-off.png" v-on:click="starToggle">
      <img v-else-if="note.starred && this.note.id !== selectedNote.id" src="~public/images/star-on.png" v-on:click="starToggle">
      <img v-else-if="!note.starred && this.note.id === selectedNote.id" src="~public/images/star-off-white.png" v-on:click="starToggle">
      <img v-else-if="note.starred && this.note.id === selectedNote.id" src="~public/images/star-on-white.png" v-on:click="starToggle">
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
    selectedNote() {
      return this.$store.getters['notes/getSelectedNote'];
    },
  },
  methods: {
    starToggle() {
      this.$store.dispatch('notes/starToggle', {
        id: this.note.id,
        starred: this.note.starred
      });
    },
    selectNote() {
      this.$store.dispatch('notes/selectNote', this.note)
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

/* Styles for Selected Component */

.noteListSelectedColor {
  background-color: #013369;
}

.noteListSelectedColor:hover {
  background-color: #013369;
}

.noteListSelectedColor #titleAndPreview {
  color: white;
}

.noteListSelectedColor .showNoteBody {
  color: white;
}

.noteListSelectedColor #arrowButton {
  color: white;
}
</style>