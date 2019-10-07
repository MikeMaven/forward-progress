<template>
  <notes-index :notes="notes" />
</template>

<script>
import NotesIndex from './NotesIndex.vue'

export default {
  name: 'NotesIndexWrapper',

  components: { NotesIndex },

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
    };
  },

  computed: {
    notes() {
      return this.$store.getters['notes/notes'];
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
    this.$store.dispatch('notes/getUserNotes');
  }
};
</script>

<style lang="stylus" scoped>

</style>
