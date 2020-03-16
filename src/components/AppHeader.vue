<template>
  <b-navbar fixed="top" sticky toggleable="lg" type="dark" variant="info">
    <b-navbar-brand to="/" exact>
      <h1 id="navBarTitle">
        Forward<br ><span id="navBarTitleLineTwo">Progress</span>
      </h1>
    </b-navbar-brand>
    <b-navbar-toggle target="nav-collapse" />

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item exact to="/" >
          Home
        </b-nav-item>
        <b-nav-item-dropdown id="navNotesDropdown" v-if="isAuthenticated" text="Notes">
          <b-dropdown-item id="navNewNote" v-if="isAuthenticated" to="/newnote">
            New Note
          </b-dropdown-item>
          <b-dropdown-item v-if="isAuthenticated" to="/notes">
            My Notes
          </b-dropdown-item>
          <b-dropdown-item v-if="isAuthenticated" to="/sharednotes">
            Shared With Me
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-if="isAdmin" exact to="/admin">
          Admin
        </b-nav-item>
        <b-nav-item-dropdown v-if="isAdmin" text="Blog">
          <b-dropdown-item to="/blog/new">
            New Blog Post
          </b-dropdown-item>
          <b-dropdown-item to="/blogs">
            Read Blog
          </b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-if="!isAdmin" to="/blogs">
          Blog
        </b-nav-item>
        <b-nav-item exact to="/about">
          About Us
        </b-nav-item>
        <b-nav-item exact to="/games">
          Upcoming Games
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item v-if="isAuthenticated" class="profileLink" to="/profile">
          {{ user.displayName }}
        </b-nav-item>
        <b-nav-item
          id="logoutButton"
          v-if="isAuthenticated"
          href="javascript:void(0)"
          class="logButton"
          @click="logout()"
        >
          {{ appData.content.app_nav_logout }}
        </b-nav-item>
        <b-nav-item v-if="!isAuthenticated" id="loginButton" class="logButton" to="/login">
          {{ appData.content.app_nav_login }}
        </b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
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
      return this.$store.getters['isAdmin'];
    }
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

<style scoped>
#noteHeader ul,
li {
  font-size: 12px !important;
}

.navbar {
  background-color: #013369 !important;
}

.dropdown-toggle.dropdown-menu {
  min-width: 12rem !important;
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
