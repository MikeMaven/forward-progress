<template>
  <div>
    <note-component
    v-for="note in notes"
    :key="note.id"
    :note="note">
    </note-component>
  </div>
</template>

<script>
import NoteComponent from '../../components/NoteComponent.vue';

export default {
  name: 'notes',

  components: {
    NoteComponent
  },

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
    }
  },

  computed: {
    notes(){
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
    this.$store.dispatch('notes/getUserNotes')
  },
}
</script>

<style scoped>


</style>
