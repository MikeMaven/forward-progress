<template>
  <div>
    <h4>Title:</h4>
    <input v-model="title" type="text" tabindex="1" v-on:keydown="focusEditor" id="titleEntry" />
    <vue-editor 
      useCustomImageHandler 
      @image-added="handleImageAdded" 
      v-model="content" 
      ref="editor"
      @selection-change="getSelectionText">
    </vue-editor>
    <div class="tagDiv" v-if="this.type === 'note'">
      <h4>Add Tags:</h4>
      <multiselect
        ref="tagSelect"
        v-model="selected"
        tag-placeholder="Add this as a new tag"
        placeholder="Search or add a tag"
        label="name"
        track-by="code"
        :options="options"
        :taggable="true"
        :multiple="true"
        @tag="addTag"/>
    </div>
    <div class="buttonRow">
      <router-link to="/notes" tag="button" v-if="this.editNoteID">Cancel</router-link>
      <button v-on:click="clearEditor" v-if="!this.editNoteID">Clear</button>
      <button v-on:click="saveNote" v-if="this.type === 'note'">Save Note</button>
      <button v-on:click="saveAndShareNote" v-if="this.type === 'note'">Save and Share</button>
      <button v-on:click="saveNote" v-if="this.type === 'blog'">Save Blog</button>
      <button v-on:click="deleteNote" v-if="this.editNoteID">Delete Note</button>
      <span v-hotkey="keymap"></span>
    </div>
    <b-modal hide-footer id="share-modal" title="Share This Note With Another User">
      <p class="my-4">
        Search below for a users you would like to share this note with by registered email address.
        You may choose as many users as you like.
      </p>
        <multiselect
            v-model="selectedUsers"
            tag-placeholder="Add this user"
            placeholder="Search users"
            label="username"
            track-by="id"
            :options="userOptions"
            :taggable="true"
            :multiple="true"
            @tag="addUserToSelected" />
      <b-button class="mt-3" block @click="submitShares">Share Now</b-button>
  </b-modal>
  </div>
</template>

<script>
import TagComponent from './TagComponent.vue';
import previewTextGenerator from '../store/notes/helpers/previewTextGenerator'
import Multiselect from 'vue-multiselect';
import axios from 'axios';
require('../util/multiselect.css')
import { router } from '../router';

export default {
  name: 'TextEditorComponentV2',

  components: { Multiselect },

  mixins: [],

  props: [ 'noteTitle', 'noteBody', 'editNoteID', 'type' ],

  data() {
    return {
      title: null,
      content: null,
      selection: null,
      shareNoteId: null,
      searchValue: null
    }
  },
  watch: {
    noteTitle: function() {
      this.title = this.noteTitle;
    },
    noteBody: function() {
      this.content = this.noteBody;
    }
  },
  computed: {
    options() {
      return this.$store.getters['notes/getAllTags'];
    },
    userOptions() {
      return this.$store.getters['notes/usersToShareWith'];
    },
    selected: {
      get: function() {
        return this.$store.getters['notes/getSelectedTags'];
      },
      set: function(updatedTags) {
        this.$store.dispatch('notes/updateTagSelection', updatedTags);
      }
    },
    selectedUsers: {
      get: function() {
        return this.$store.getters['notes/getSelectedUsers'];
      },
      set: function(updatedUsers) {
        this.$store.dispatch('notes/updateUserSelection', updatedUsers);
      }
    },
    currentUser() {
      return this.$store.state.user;
    },

    keymap () {
      return {
        'ctrl+shift+t': this.autoTag,
        'ctrl+shift+s': this.acceptTag
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
      if (this.type === 'note') {
        if (this.editNoteID) {
          this.$store.dispatch('notes/editNote', {
            title: this.title,
            body: this.content,
            id: this.editNoteID,
            tags: this.selected,
            allTags: this.options
          }).then((response) => {
            router.push('/notes');
          });
        } else {
          this.$store.dispatch('notes/saveNote', {
            title: this.title,
            body: this.content,
            tags: this.selected,
            allTags: this.options
          }).then((response) => {
            router.push('/notes');
          });
        }
      } else if (this.type === 'blog') {
        this.$store.dispatch('blog/saveBlog', {
          title: this.title,
          body: this.content
        });
      }
    },
    saveAndShareNote(){
      if (this.editNoteID) {
        this.$store.dispatch('notes/editNote', {
          title: this.title,
          body: this.content,
          id: this.editNoteID,
          tags: this.selected,
          allTags: this.options
        }).then((response) => {
          this.shareNoteId = response.id
          this.$root.$emit('bv::show::modal', 'share-modal');
        })
      } else {
        this.$store.dispatch('notes/getUsersToShareWith');
        this.$store.dispatch('notes/saveNote', {
          title: this.title,
          body: this.content,
          tags: this.selected,
          allTags: this.options
        }).then((response) => {
          this.shareNoteId = response.id;
          this.$root.$emit('bv::show::modal', 'share-modal');
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
    },

    addUserToSelected(user) {
      this.selectedUsers.push(user);
    },

    submitShares() {
      let payload = {
        users: this.selectedUsers,
        noteId: this.shareNoteId,
        creatorId: this.currentUser.id
      }
      this.$store.dispatch('notes/submitShares', payload).then(response => {
        router.push('/notes')
      })
    },

    getSelectionText() {
      var text = "";
      if (window.getSelection) {
          text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != "Control") {
          text = document.selection.createRange().text;
      }
      this.selection = text
    },

    autoTag(){
      this.$refs.tagSelect.$el.focus()
      this.$refs.tagSelect._data.search = this.selection
    },

    acceptTag(){
      console.log("Accepted")
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
