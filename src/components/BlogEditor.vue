<template>
  <div>
    <p><span style="color:red;">*</span> = required field</p>
    <h4>Title <span style="color:red;">*</span></h4>
    <input
      v-model="title"
      class="titleEntry"
      type="text"
      tabindex="1"
    />

    <div class="blogFields">
      <h4>Subtitle <span style="color:red;">*</span></h4>
      <input
        v-model="subtitle"
        class="titleEntry"
        type="text"
        tabindex="2"
        @keydown="focusEditor"
      >
      <h4>Paywall? <span style="color:red;">*</span></h4>
      <input
        v-model="isPaid"
        class="paywallCheckBox"
        type="checkbox"
      />

      <h4>Upload Cover Image <span style="color:red;">*</span></h4>
      <input
        ref="fileInput"
        class="coverImageUpload"
        type="file"
        accept="image/*"
        @change="uploadCoverImage($event)"
      >
      <div
        v-if="coverImageURL"
        class="coverImage"
      >
        <img
          :src="coverImageURL"
          width="50"
          height="50"
        />
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
    <h4>Add Category</h4>
    <p class="small text-secondary">
      Press shift + ctrl + t to tag highlighted text.
    </p>
    <multiselect
    ref="categorySelect"
      v-model="selected"
      tag-placeholder="Add this as a new Category"
      placeholder="Search or add a Category"
      label="name"
      track-by="code"
      :options="options"
      :taggable="true"
      :multiple="true"
      @tag="addCategory"
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
      currentPhoto: null,
      coverImageURL: null
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.user;
    },
    options() {
      return this.$store.getters['blog/getAllCategories'];
    },
    selected: {
      get: function() {
        return this.$store.getters['blog/getSelectedCategories'];
      },
      set: function(updatedCategories) {
        this.$store.dispatch('blog/updateCategorySelection', updatedCategories);
      }
    }
  },
  mounted(){
    this.$store.dispatch('blog/getAllCategories');
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
      let file = $event.target.files[0];
      var formData = new FormData();
      formData.append('image', file);
      axios({
        url: '/api/fileupload',
        method: 'POST',
        data: formData,
        config: { headers: { 'Content-Type': 'multipart/form-data' } }
      }).then(response => {
        let url = response.data.imageUrl;
        this.coverImageURL = url;
      });
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
    addCategory(newCategory) {
      const category = {
        name: newCategory,
        code: newCategory.substring(0, 2) + Math.floor(Math.random() * 100000000),
        new: true
      };
      this.$store.dispatch('blog/createNewCategory', category);
    },
    clear() {
      this.title = null;
      this.subtitle = null;
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
        coverImageURL: this.coverImageURL,
        subtitle: this.subtitle,
        isPaid: this.isPaid,
        photoGallery: this.photoGallery.map(el => JSON.stringify(el)),
        categories: this.selected,
        allCategories: this.options
      };
      if (this.coverImageURL) {
        this.$store.dispatch('blog/saveBlog', blog);
      } else {
        alert("Please fill out all required fields.")
      }
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
