<template>
  <div>
    <h4>Title</h4>
    <input
v-model="title" class="titleEntry" type="text" tabindex="1" />
    <div class="blogFields">
      <h4>Subtitle</h4>
      <input
        v-model="subtitle"
        class="titleEntry"
        type="text"
        tabindex="2"
        @keydown="focusEditor"
      >
      <h4>Paywall?</h4>
      <input v-model="isPaid"
class="paywallCheckBox" type="checkbox"
/>
      <h4>Upload Cover Image</h4>
      <input
        ref="fileInput"
        class="coverImageUpload"
        type="file"
        accept="image/*"
        @change="uploadCoverImage($event)"
      >
      <div v-if="coverImageURL"
class="coverImage">
        <img
:src="coverImageURL" width="50" height="50" />
      </div>
      <h4>Upload to Photo Gallery</h4>
      <uploader @image-uploaded="addToGallery" />
      <div v-if="photoGallery.length">
        <div class="photoGallery">
          <photo-gallery-single
            v-for="photo in photoGallery"
            :key="photo.url"
            :url="photo.url"
            @select="changeSelectPhoto"
            @delete="deleteSelectPhoto"
          />
        </div>
        <div v-if="currentPhoto">
          <h4>Caption</h4>
          <input
            v-model="currentPhoto.caption"
            type="text"
            placeholder="Click to edit caption!"
          />
        </div>
      </div>
    </div>
    <h4>Body</h4>
    <vue-editor
      ref="editor"
      v-model="content"
      use-custom-image-handler
      @image-added="handleImageAdded"
    />
    <h4>Add Tags</h4>
    <p class="small text-secondary">
      Press shift + ctrl + t to tag highlighted text.
    </p>
    <multiselect
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
    <div class="buttonRow">
      <button @click="clear">
        Clear
      </button>
      <button @click="save">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
import PhotoGallerySingle from './PhotoGallerySingle.vue';
import Uploader from './Uploader.vue';

export default {
  name: 'BlogEditor',
  components: { PhotoGallerySingle, Uploader, Multiselect },
  data() {
    return {
      title: null,
      subtitle: null,
      isPaid: true,
      photoGallery: [],
      content: null,
      photoGalleryIdx: [],
      currentPhoto: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    coverImageURL() {
      return this.$store.getters['blog/coverImageURL'];
    },
    options() {
      return this.$store.getters['blog/getAllTags'];
    },
    selected: {
      get: function() {
        return this.$store.getters['blog/getSelectedTags'];
      },
      set: function(updatedTags) {
        this.$store.dispatch('blog/updateTagSelection', updatedTags);
      }
    }
  },
  methods: {
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
    uploadCoverImage($event) {
      const resetUploader = function() {
        var uploader = document.getElementById('coverImageUpload');
        // uploader.value = "";
      };
      let file = $event.target.files[0];
      this.handleImageAdded(file, null, null, resetUploader);
    },
    addToGallery(url) {
      this.photoGallery.push({
        url,
        caption: ''
      });
      // photoGalleryIdx to track index of each photo object
      this.photoGalleryIdx.push(url);
    },
    changeSelectPhoto(url) {
      const urlIdx = this.photoGalleryIdx.indexOf(url);
      this.currentPhoto = this.photoGallery[urlIdx];
    },
    deleteSelectPhoto(url) {
      const urlIdx = this.photoGalleryIdx.indexOf(url);
      if (this.currentPhoto === this.photoGallery[urlIdx]) {
        this.currentPhoto = null;
      }
      this.photoGalleryIdx.splice(urlIdx, 1);
      this.photoGallery.splice(urlIdx, 1);
    },
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 100000000),
        new: true
      };
      this.$store.dispatch('blog/createNewTag', tag);
    },
    clear() {
      this.title = null;
      this.subTitle = null;
      this.isPaid = true;
      this.photoGallery = [];
      this.content = null;
      this.photoGalleryIdx = [];
      this.currentPhoto = null;
    },
    save() {
      const blog = {
        title: this.title,
        content: this.content,
        Author: this.currentUser,
        coverImageURL: this.coverImageURL,
        subTitle: this.subTitle,
        isPaid: this.isPaid,
        photoGallery: this.photoGallery.map(el => JSON.stringify(el)),
        tags: this.selected.map(el => JSON.stringify(el))
      };

      axios({
        url: '/api/blog/new',
        method: 'POST',
        data: blog
      }).then(res => {
        if (res.status === 200) {
          this.clear();
          alert('Blog saved successfully');
        } else {
          alert('Error. Couldn\'t save blog.');
        }
      });
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

.titleEntry {
  margin-top: 3px;
  font-size: 25px;
}

.tagDiv {
  padding: 0;
  background-color: white;
}

.photoGallery {
  display: flex;
  flex-direction: row;
}
</style>
