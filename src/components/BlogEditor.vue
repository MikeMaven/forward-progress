<template>
  <div>
    <h4>Title</h4>
    <input
      v-model="title"
      class="titleEntry"
      type="text"
      tabindex="1"
    >
    <div class="blogFields">
      <h4>Subtitle</h4>
      <input
        v-model="subTitle"
        class="titleEntry"
        type="text"
        tabindex="2"
        @keydown="focusEditor"
      />
      <h4>Paywall?</h4>
      <input
        class="paywallCheckBox"
        v-model="isPaid"
        type="checkbox"
      >
      <h4>Upload Cover Image</h4>
      <input
        class="coverImageUpload"
        ref="fileInput"
        type="file"
        accept="image/*"
        @change="uploadCoverImage($event)"
      />
      <div
        v-if="coverImageURL"
        class="coverImage"
      >
        <img
          v-bind:src="coverImageURL"
          width="50"
          height="50"
        >
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
          ></photo-gallery-single>
        </div>
        <div v-if="currentPhoto">
          <h4>Caption</h4>
          <input
            v-model="currentPhoto.caption"
            type="text"
            placeholder="Click to edit caption!"
          >
        </div>
      </div>
    </div>
    <h4>Body</h4>
    <vue-editor
      ref="editor"
      v-model="content"
      useCustomImageHandler
      @image-added="handleImageAdded"
    >
    </vue-editor>
    <div class="buttonRow">
      <button @click="clear">
        Clear
      </button>
      <button>
        Save Blog
      </button>
    </div>
  </div>
</template>

<script>
import PhotoGallerySingle from './PhotoGallerySingle.vue';
import Uploader from './Uploader.vue';

export default {
  name: 'BlogEditor',
  components: { PhotoGallerySingle, Uploader },
  data() {
    return {
      title: null,
      subTitle: null,
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
    clear() {
      this.title = null;
      this.subTitle = null;
      this.isPaid = true;
      this.photoGallery = [];
      this.content = null;
      this.photoGalleryIdx = [];
      this.currentPhoto = null;
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
