<template>
  <div>
    <div class="card" style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">Card title</h5>
        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
        <a href="#" class="btn btn-primary">Go somewhere</a>
      </div>
    </div>
    {{ numberOfPages }}
    {{ currentBlogPosts }}
  </div>
</template>

<script>
export default {
  computed: {
    currentBlogPosts() {
      return this.$store.getters['blog/getPageOfPosts'];
    },

    numberOfPages() {
      return this.$store.getters['blog/getNumberOfPages'];
    }
  },

  mounted() {
    let currentPage = this.$route.query.page;
    this.$store.dispatch('blog/getPageOfBlogPosts', currentPage);
  }
}
</script>

<style scoped>

</style>