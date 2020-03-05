<template>
  <div v-if="selectedPost">
    <b-jumbotron :style='{ backgroundImage: `url("${selectedPost.coverImageURL}")`, backgroundSize: "cover", height: "300px"}'>
      <template v-slot:header><span id="jumbotron-title">{{selectedPost.title}}</span></template>
      <template v-slot:lead><span id="jumbotron-subtitle">{{selectedPost.subTitle}}</span></template>
    </b-jumbotron>
    <b-carousel
      v-if="selectedPost.photoGallery"
      id="blog-show-gallery-carousel"
      :interval="4000"
      fade
      controls
      indicators
      background="#ababab"
      style="text-shadow: 1px 1px 2px #333;"
    >
      <b-carousel-slide v-for="image in selectedPost.photoGallery" :img-src="JSON.parse(image).url" :caption="JSON.parse(image).caption"/>
      </b-carousel>
    <div id="blog-body">
      <span v-html="selectedPost.body">
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'BlogShow',

  components: {},

  mixins: [],

  props: {
    /*
    property: {
      type: String|Number|Boolean|Array|Object|Date|Function|Symbol,
      default: null,
      required: false
    },
    */
  },

  data() {
    return {
      // field: 'value'
    }
  },

  computed: {
    ...mapGetters({
      selectedPost: 'blog/selectedPost'
    })
  },

  methods: {
  
  },

  mounted() {
    this.$store.dispatch('blog/getSingleBlogPost', this.$route.params.id)
  },
}
</script>

<style lang="scss" scoped>
  #jumbotron-title {
    color: white;
    font-size: 2em;
    text-shadow: 1px 1px 2px #333;
  }
  #jumbotron-subtitle {
    color: silver;
    font-size: 2em;
    text-shadow: 1px 1px 2px #333;
  }
  #blog-body {
    padding: 100px;
    font-size: 1.5em;
  }
</style>
