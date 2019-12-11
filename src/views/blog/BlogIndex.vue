<template>
  <div>
    <div id="blogPostList">
      <blog-post-component
      v-for="post in currentBlogPosts"
      :key="post.id"
      :post="post">
      </blog-post-component>
    </div>
  </div>
</template>

<script>
import BlogPostComponent from '../../components/BlogPostComponent.vue';

export default {
  components: {
    BlogPostComponent
  },

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