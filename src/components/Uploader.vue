<template>
  <div>
    <dropzone
      ref="uploader"
      id="dropzone"
      duplicateCheck="true"
      :options="uploaderOptions"
    >
    </dropzone>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone';
import 'nuxt-dropzone/dropzone.css';
export default {
  components: {
    Dropzone
  },
  data() {
    return {
      uploaderOptions: {
        url: '/api/fileupload',
        paramName: 'image',
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        maxFilesize: 10
      }
    };
  }
};
</script>

<style lang="stylus" scoped>
</style>