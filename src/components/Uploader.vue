<template>
  <div>
    <dropzone
      id="uploader"
      ref="uploader"
      :options="uploaderOptions"
      @vdropzone-complete="captureResponse"
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
        thumbnailWidth: 80,
        thumbnailHeight: 80,
        maxFilesize: 10
      }
    };
  },
  methods: {
    captureResponse(res) {
      this.$emit('image-uploaded', JSON.parse(res.xhr.response).imageUrl);
      this.$refs.uploader.removeAllFiles();
    }
  }
};
</script>

<style lang="stylus" scoped>
</style>