<template>
  <div>
    <dropzone ref="uploader" id="dropzone" :options="uploaderOptions"></dropzone>
  </div>
</template>

<script>
import Dropzone from 'nuxt-dropzone'
import 'nuxt-dropzone/dropzone.css'

export default {
  name: 'Uploader',

  components: {Dropzone},

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
      uploaderOptions: {
          url: '/api/newNote',
          thumbnailWidth: 150,
          maxFilesize: 10
      }
    }
  },

  computed: {
    // computed properties are cached based on their dependencies
    /*
    computedProperty() {
      return 'value'
    },
    */
  },

  methods: {
    // Methods run whenever a re-render happens, their results aren't cached.
    /*
    onClick() {
      this.$emit('click-happened')
    },
    */
  },

  mounted() {
    // Invoked when the component loads, good place to fetch data from the API
  },
}
</script>

<style lang="stylus" scoped>
</style>
