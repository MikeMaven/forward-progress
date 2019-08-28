<template>
  <header class="header">
    <nav class="inner">
      <router-link
        to="/"
        exact>
        <img
          class="logo"
          src="~public/images/NFLLogo.png"
          alt="logo">
      </router-link>
      <router-link
        exact
        to="/">Home</router-link>
      <router-link
        v-if="isAuthenticated"
        exact
        to="/newnote">New Note</router-link>
      <router-link
        v-if="isAuthenticated"
        exact
        to="/notes">My Notes</router-link>
      <router-link
        exact
        to="/about">About Us</router-link>
      <router-link
        exact
        to="/games">Upcoming Games</router-link>
      <router-link
        v-if="isAuthenticated"
        to="/profile">&nbsp;&nbsp;&nbsp;{{ user.username }}</router-link>
      <a
        v-if="isAuthenticated"
        href="javascript:void(0)"
        @click="logout()">{{ appData.content.app_nav_logout }}</a>
      <router-link
        v-if="!isAuthenticated"
        to="/login">{{ appData.content.app_nav_login }}</router-link>
    </nav>
  </header>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
export default {
  data() {
    return {
      isOpen: false
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'user', 'appData'])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    toggle() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>
