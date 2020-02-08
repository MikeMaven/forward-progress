<template>
  <div>
    <dropzone
      ref="uploader"
      id="dropzone"
      :options="uploaderOptions"
    >
    </dropzone>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone';
import 'nuxt-dropzone/dropzone.css';

export default {
  name: 'Uploader',
  components: {
    Dropzone
  },
  data() {
    return {
      uploaderOptions: {
        url: '/api/newNote',
        thumbnailWidth: 150,
        maxFilesize: 10
      }
    };
  },

  mounted() {
    const instance = this.$ref.uploader.el.dropzone;
  }
};
</script>

<style lang="stylus" scoped>
</style>
