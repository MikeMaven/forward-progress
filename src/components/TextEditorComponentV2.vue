<template>
  <div>
    <h4>Title:</h4>
    <input v-model="title" type="text" tabindex="1" v-on:keydown="focusEditor" id="titleEntry" />
    <vue-editor useCustomImageHandler @image-added="handleImageAdded" v-model="content" ref="editor"></vue-editor>
    <div class="tagDiv">
      <h4>Add Tags:</h4>
      <multiselect
        v-model="selected"
        tag-placeholder="Add this as a new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="code"
        :options="options"
        :taggable="true"
        :multiple="true"
        @tag="addTag" />
    </div>
    <div class="buttonRow">
      <router-link to="/notes" tag="button" v-if="this.editNoteID">Cancel</router-link>
      <button v-on:click="clearEditor" v-if="!this.editNoteID">Clear</button>
      <button v-on:click="saveNote">Save Note</button>
      <button v-on:click="deleteNote" v-if="this.editNoteID">Delete Note</button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect';
import axios from 'axios';
require('../util/multiselect.css')

export default {
  name: 'TextEditorComponentV2',

  components: {Multiselect},

  mixins: [],

  props: [ 'noteTitle', 'noteBody', 'editNoteID' ],

  data() {
    return {
      title: null,
      content: null
    }
  },
  watch: {
    noteTitle: function() {
      this.title = this.noteTitle;
    },
    noteBody: function() {
      this.content = this.noteBody
    }
  },
  computed: {
   options() {
      return this.$store.getters['notes/getAllTags'];
    },
    selected: {
      get: function() {
        return this.$store.getters['notes/getSelectedTags'];
      },
      set: function(updatedTags) {
        this.$store.dispatch('notes/updateTagSelection', updatedTags);
      }
    }
  },

  methods: {
    clearEditor() {
      this.$store.dispatch('notes/clearTagSelection');
      this.selected = [];
      this.content = null;
    },
    saveNote() {
      if (this.editNoteID) {
        this.$store.dispatch('notes/editNote', {
          title: this.title,
          body: this.content,
          id: this.editNoteID,
          tags: this.selected,
          allTags: this.options
        })
      } else {
        this.$store.dispatch('notes/saveNote', {
          title: this.title,
          body: this.content,
          tags: this.selected,
          allTags: this.options
        });
      }
    },
    addTag (newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor((Math.random() * 100000000)),
        new: true
      }
      this.$store.dispatch('notes/createNewTag', tag);
    },
    deleteNote() {
      this.$store.dispatch('notes/deleteNote', {
        id: this.editNoteID,
        source: 'editor'
      });
    },
    focusEditor(event) {
      if (event.key === "Tab") {
        event.preventDefault();
        this.$refs.editor.quill.focus();
      }
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append('image', file)
      axios({
        url: '/api/fileupload',
        method: 'POST',
        data: formData,
        config: { headers: {'Content-Type': 'multipart/form-data' }}
      })
        .then(response => {
            let url = response.data.imageUrl    
            Editor.insertEmbed(cursorLocation, "image", url);
            resetUploader();
        })
    }
  },

  mounted() {
    // Invoked when the component loads, good place to fetch data from the API
  }
};
</script>

<style scoped>
  .buttonRow {
    position: relative;
    margin: 15px 0 5px 0;
  }

  h4 {
      margin-top: 10px;
      font-family: paralucent, sans-serif;
      font-size: 1.8em;
      letter-spacing: 0.05em;
      color: #013369;
      font-weight: 300;
  }

  .quillWrapper {
      margin-top: 10px;
  }

  #titleEntry {
      margin-top: 3px;
      font-size: 25px;
  }

  .tagDiv {
      padding: 0;
      background-color: white;
  }
</style>
