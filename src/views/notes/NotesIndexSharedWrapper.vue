<template>
  <notes-index :notes="notes" :isShared="isShared" />
</template>

<script>
import NotesIndex from './NotesIndex.vue'

export default {
  name: 'NotesIndexAdminWrapper',

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
      isShared: true
    };
  },

  computed: {
    notes(){
      return this.$store.getters['notes/sharedNotes'];
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
    this.$store.dispatch('notes/getSharedNotes');
  }
};
</script>

<style lang="stylus" scoped>
</style>
