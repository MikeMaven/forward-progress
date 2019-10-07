<template>
  <div id="aboutContainer">
    <div v-if="this.isAdmin">
      <h1>Admin Dashboard</h1>
      <ul>
        <li><router-link to="/allnotes">All Users' Notes Superuser Access</router-link></li>
      </ul>
    </div>
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
    this.$store.dispatch('notes/getAdminNotes');
  }
}
</script>