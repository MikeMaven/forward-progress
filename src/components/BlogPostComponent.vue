<template>
  <div class="card" style="width: 25rem;">
    <div class="card-body">
      <img v-bind:src="this.post.coverImageURL" width="100" height="100" />
      <h5 class="card-title">{{ this.post.title }}</h5>
      <p class="card-text">{{ this.subtitle }}</p>
      <h5 class="author">by {{ this.post.User.firstName }} {{ this.post.User.lastName }}</h5>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>
</template>

<script>
import previewTextGenerator from '../store/notes/helpers/previewTextGenerator'

export default {
  title: 'BlogPostComponent',
  props: ['post'],

  computed: {
    subtitle() {
      if (this.post.subTitle) {
        return this.post.subTitle;
      } else {
        return previewTextGenerator(this.post, 'blog');
      }
    }
  }
}
</script>

<style scoped>
  .card {
    display: inline-block;
  }
</style>