<template>
  <div id="aboutContainer">
    <div v-if="this.isAdmin">
      <h1>Admin Dashboard</h1>
      <ul>
        <li>See All Notes</li>
      </ul>
    </div>
    {{ this.adminTestNotes }}
    <br>
    {{ this.adminTestNotes.length }}
  </div>
</template>

<script>
export default {
  computed: {
    isAdmin() {
      return this.$store.getters['isAdmin'];
    },
    adminTestNotes() {
      return this.$store.getters['notes/adminTestNotes'];
    }
  },
  mounted() {
    // if (this.isAdmin) {
    this.$store.dispatch('notes/getAdminNotes');
    // }
  }
}
</script>