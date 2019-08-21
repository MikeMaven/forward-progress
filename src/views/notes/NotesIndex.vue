<template>
  <div>
    Notes are gonna go here!
  </div>
</template>

<script>
export default {
  name: 'users',

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
    notes(){
      this.$store.notes.getters.notes
    }
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
    this.$store.notes.dispatch('getUserNotes')
  },
}
</script>

<style lang="stylus" scoped>
</style>
