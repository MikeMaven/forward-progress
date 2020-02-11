<template>
  <div>
    <h4>Title</h4>
    <input
      id="titleEntry"
      v-model="title"
      type="text"
      tabindex="1"
    >
    <div
      v-if="this.type === 'blog'" 
      id="blogFields"
    >
      <h4>Subtitle</h4>
      <input
        id="titleEntry"
        v-model="subTitle"
        type="text"
        tabindex="2"
        @keydown="focusEditor"
      />
      <h4>Paywall?</h4>
      <input
        id="paywallCheckBox"
        v-model="isPaid"
        type="checkbox"
      >
      <h4>Upload Cover Image</h4>
      <input
        id="coverImageUpload"
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="uploadCoverImage($event)"
      />
      <div
        v-if="this.coverImageURL"
        id="coverImage"
      >
        <img
          v-bind:src="this.coverImageURL"
          width="50"
          height="50"
        >
      </div>
      <h4>Upload to Photo Gallery</h4>
      <Uploader />
    </div>
    <h4>Body</h4>
    <vue-editor
      ref="editor"
      v-model="content"
      useCustomImageHandler
      @image-added="handleImageAdded"
      @selection-change="getSelectionText"
    >
    </vue-editor>
    <div
      v-if="this.type === 'note'"
      class="tagDiv"
    >
      <h4>Add Tags</h4>
      <p class="small text-secondary">
        Press shift + ctrl + t to tag highlighted text.
      </p>
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
        @tag="addTag"
      />
    </div>
    <div class="buttonRow">
      <router-link
        v-if="this.editNoteID"
        to="/notes"
        tag="button"
      >
        Cancel
      </router-link>
      <button
        v-if="!this.editNoteID"
        @click="clearEditor"
      >
        Clear
      </button>
      <button 
        v-if="this.type === 'note'"
        @click="saveNote"
      >
        Save Note
      </button>
      <button 
        v-if="this.type === 'note'"
        @click="saveAndShareNote"
      >
        Save and Share
      </button>
      <button 
        v-if="this.type === 'blog'"
        @click="saveNote"
      >
        Save Blog
      </button>
      <button 
        v-if="this.editNoteID"
        @click="deleteNote"
      >
        Delete Note
      </button>
      <span v-hotkey="keymap"></span>
    </div>
    <b-modal
      id="share-modal"
      title="Share This Note With Another User"
      hide-footer
    >
      <p class="my-4">
        Search below for a users you would like to share this note with by
        registered email address. You may choose as many users as you like.
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
        @tag="addUserToSelected"
      />
      <b-button
        class="mt-3"
        @click="submitShares"
        block
      >
        Share Now
      </b-button>
    </b-modal>
  </div>
</template>

<script>
import TagComponent from './TagComponent.vue';
import previewTextGenerator from '../store/notes/helpers/previewTextGenerator';
import Multiselect from 'vue-multiselect';
import axios from 'axios';
require('../util/multiselect.css');
import { router } from '../router';
require('../util/multiselect.css');

export default {
  name: 'TextEditorComponentV2',

  components: { Multiselect },

  mixins: [],

  props: ['noteTitle', 'noteBody', 'editNoteID', 'type'],

  data() {
    return {
      title: null,
      content: null,
      selection: null,
      shareNoteId: null,
      searchValue: null,
      isPaid: true
    };
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

    keymap() {
      return {
        'ctrl+shift+t': this.autoTag,
        'ctrl+shift+s': this.acceptTag
      };
    },
    coverImageURL() {
      return this.$store.getters['blog/coverImageURL'];
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
  methods: {
    clearEditor() {
      this.$store.dispatch('notes/clearTagSelection');
      this.selected = [];
      this.content = null;
    },
    saveNote() {
      if (this.type === 'note') {
        if (this.editNoteID) {
          this.$store
            .dispatch('notes/editNote', {
              title: this.title,
              body: this.content,
              id: this.editNoteID,
              tags: this.selected,
              allTags: this.options
            })
            .then(response => {
              router.push('/notes');
            });
        } else {
          this.$store
            .dispatch('notes/saveNote', {
              title: this.title,
              body: this.content,
              tags: this.selected,
              allTags: this.options
            })
            .then(response => {
              router.push('/notes');
            });
        }
      } else if (this.type === 'blog') {
        this.$store.dispatch('blog/saveBlog', {
          title: this.title,
          subTitle: this.subTitle,
          body: this.content,
          imageURL: this.coverImageURL,
          photoGallery: this.photoGallery,
          isPaid: this.isPaid
        });
      }
    },
    saveAndShareNote() {
      if (this.editNoteID) {
        this.$store
          .dispatch('notes/editNote', {
            title: this.title,
            body: this.content,
            id: this.editNoteID,
            tags: this.selected,
            allTags: this.options
          })
          .then(response => {
            this.shareNoteId = response.id;
            this.$root.$emit('bv::show::modal', 'share-modal');
          });
      } else {
        this.$store.dispatch('notes/getUsersToShareWith');
        this.$store
          .dispatch('notes/saveNote', {
            title: this.title,
            body: this.content,
            tags: this.selected,
            allTags: this.options
          })
          .then(response => {
            this.shareNoteId = response.id;
            this.$root.$emit('bv::show::modal', 'share-modal');
          });
      }
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 100000000),
        new: true
      };
      this.$store.dispatch('notes/createNewTag', tag);
    },
    deleteNote() {
      this.$store.dispatch('notes/deleteNote', {
        id: this.editNoteID,
        source: 'editor'
      });
    },
    focusEditor(event) {
      if (event.key === 'Tab') {
        event.preventDefault();
        this.$refs.editor.quill.focus();
      }
    },
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append('image', file);
      axios({
        url: '/api/fileupload',
        method: 'POST',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      }).then(response => {
        let url = response.data.imageUrl;
        if (Editor && cursorLocation) {
          Editor.insertEmbed(cursorLocation, 'image', url);
        } else {
          this.$store.dispatch('blog/setCoverImage', url);
        }
        resetUploader();
      });
    },
    addUserToSelected(user) {
      this.selectedUsers.push(user);
    },
    submitShares() {
      let payload = {
        users: this.selectedUsers,
        noteId: this.shareNoteId,
        creatorId: this.currentUser.id
      };
      this.$store.dispatch('notes/submitShares', payload).then(response => {
        router.push('/notes');
      });
    },
    getSelectionText() {
      var text = '';
      if (window.getSelection) {
        text = window.getSelection().toString();
      } else if (document.selection && document.selection.type != 'Control') {
        text = document.selection.createRange().text;
      }
      this.selection = text;
    },
    autoTag() {
      this.$refs.tagSelect.$el.focus();
      this.$refs.tagSelect._data.search = this.selection.trim();
    },
    acceptTag() {
      console.log('Accepted');
    },
    uploadCoverImage($event) {
      const resetUploader = function() {
        var uploader = document.getElementById('coverImageUpload');
        // uploader.value = "";
      };
      let file = $event.target.files[0];
      this.handleImageAdded(file, null, null, resetUploader);
    }
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
