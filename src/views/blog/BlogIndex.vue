<template>
  <div>
    <div v-if="featuredPost" class="featured-section">
      <div class="featured-image">
        <router-link :to="'/blogs/' + featuredPost.id">
          <img @click="setSelectedPost(featuredPost)" :src="featuredPost.coverImageURL">
        </router-link>
      </div>
      <div class="featured-content">
        <div class="tags-container">
          <div v-for="tag in featuredPost.tags" :key="tag.id" class="tag">
            {{ tag }}
          </div>
        </div>
        <div class="title">Featured: {{ featuredPost.title }}
        </div>
        <div class="half-divider"/>
        <div class="sub-title">
          {{ featuredPost.subTitle }}
        </div>
        <div class="author-info">
          {{ featuredPost.author.firstName }}
          {{ featuredPost.author.lastName }} {{ featuredPost.createdAt }}
        </div>
        <div class="sample-description">
          {{ truncateFeature(featuredPost.body) }}
        </div>
      </div>
    </div>
    <div v-for="post in otherPosts" :key="post.id" :class="getClassName(post)">
      <div class="post-image-small">
        <router-link :to="'/blogs/' + post.id">
          <img @click="setSelectedPost(post)" :src="post.coverImageURL">
        </router-link>
      </div>
      <div class="post-content">
        <div class="tags-container">
          <div v-for="category in post.categories" :key="category.id" class="tag">
            {{ category.name }}
          </div>
        </div>
        <div class="title-small">
          {{ post.title }}
        </div>
        <div class="sub-title">
          {{ post.subTitle }}
        </div>
        <div class="author-info">
          {{ post.author.firstName }} {{ post.author.lastName }}
          {{ post.createdAt }}
        </div>
        <div class="sample-description">
          {{ truncateSmall(post.body) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash';
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters({
      latestPosts: 'blog/getLatestPosts'
    }),
    featuredPost() {
      return this.latestPosts[0];
    },
    otherPosts() {
      return this.latestPosts.slice(1, 99); // Will eventually be getting this information from the API in pages of 10 posts each. Eventually will not need to be sliced and will just start with 10
    }
  },
  mounted() {
    this.$store.dispatch('blog/getBlogPosts');
  },
  methods: {
    truncateFeature(postBody) {
      const strippedBody = postBody.replace(/<\/?[^>]+(>|$)/g, ' ');
      return strippedBody.slice(0, 109) + '...';
    },
    truncateSmall(postBody) {
      const strippedBody = postBody.replace(/<\/?[^>]+(>|$)/g, ' ');
      return strippedBody.slice(0, 69) + '...';
    },
    isLastPost(post) {
      return _.last(this.latestPosts) === post;
    },
    getClassName(smallPost) {
      if (!this.isLastPost(smallPost)) {
        return 'post-section-small';
      } else {
        return 'end-post-section-small';
      }
    },
    setSelectedPost(post) {
      this.$store.dispatch('blog/setSelectedPost', post);
    }
  }
};
</script>

<style scoped>
.post-section-small,
.end-post-section-small {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: 240px;
  width: 60%;
  margin: auto;
}

.post-section-small {
  border-bottom: 1px dotted #000000;
}

.end-post-section-small {
  border-bottom: none;
}

.post-image-small {
  overflow: hidden;
  height: 200px;
  width: 350px;
  margin: 10px;
}

.post-content {
  width: 200px;
  margin: 10px;
}

.featured-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  height: 360px;
  width: 80%;
  margin: auto;
  border-bottom: 1px dotted #000000;
}
.featured-content {
  width: 300px;
}

.featured-image {
  overflow: hidden;
  height: 300px;
  width: 500px;
}

.tags-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

.tag {
  padding: 5px 10px;
  margin-right: 5px;
  border-radius: 4px;
  background-color: #28a744;
  color: #ffffff;
}

.title {
  font-family: paralucent, sans-serif;
  font-size: 22px;
  font-weight: demibold;
  color: #013369;
}

.title-small {
  font-family: paralucent, sans-serif;
  font-size: 18px;
  font-weight: demibold;
  color: #013369;
}

.sub-title {
  font-family: paralucent, sans-serif;
  font-size: 14px;
  font-weight: medium;
  color: #013369;
}

.half-divider {
  width: 80%;
  margin: 10px auto;
  border-bottom: 2px dotted;
}

.author-name,
.sample-description {
  font-family: sans-serif;
}

.sample-description {
  font-size: 16px;
  font-weight: medium;
  color: #013369;
}
</style>
