<template>
  <header class="header">
    <nav class="inner">
      <span class="navButtons">
        <router-link
          to="/"
          exact>
          <h1 id="navBarTitle">Forward<br><span id="navBarTitleLineTwo">Progress</span></h1>
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
          v-if="isAdmin"
          exact
          to="/allnotes">Admin</router-link>
        <router-link
          exact
          to="/about">About Us</router-link>
        <router-link
          exact
          to="/games">Upcoming Games</router-link>
        </span>
        <span class="logButtons">
          <router-link
          class="profileLink"
          v-if="isAuthenticated"
          to="/profile">{{ user.displayName }}</router-link>
          <a
          v-if="isAuthenticated"
          href="javascript:void(0)"
          @click="logout()" class="logButton">{{ appData.content.app_nav_logout }}</a>
          <router-link
          class="logButton"
          v-if="!isAuthenticated"
          to="/login">{{ appData.content.app_nav_login }}</router-link>
        </span>
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
    ...mapGetters(['isAuthenticated', 'user', 'appData']),
    isAdmin() {
      if (this.user) {
        return this.user.roles.filter(role => role === 'admin').length
      }
    }
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    toggle() {
      this.isOpen = !this.isOpen;
    }
  },
  mounted () {
   
  }
};
</script>

<style scoped>
.header {
  background-color: #013369;
}

.header .inner {
  margin: 0 16%;
  max-width: 100%;
  position: relative;
}

#navBarTitle {
  font-family: paralucent, sans-serif;
  font-style: italic;
  font-weight: 700;
  font-size: 1.15em;
  color: white;
  line-height: 1em;
  letter-spacing: 0.05em;
  margin-right: 20px;
}

#navBarTitleLineTwo {
  margin-left: 5px;
}

.header a {
  font-family: paralucent, sans-serif;
  font-weight: 500;
  font-size: 1.3em;
  line-height: 0em;
  color: white;
  margin-right: 3.5%;
}

.logButtons {
  float: right;
}

.logButtons .logButton {
  margin-right: 0;
  font-family: paralucent, sans-serif;
  font-style: 'normal';
  font-weight: 400;
  font-size: 1.5em;
  letter-spacing: 0.2em;
  color: #d50a0a;
  background-color: white;
  padding: 15px 20px 15px 20px;
  text-transform: uppercase;
}

.logButtons .profileLink {
  margin-right: 10px;
}
</style>
