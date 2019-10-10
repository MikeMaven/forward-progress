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
          to="/admin">Admin</router-link>
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

@media (max-width: 374px) {
  .header {
    position: static;
    height: auto;
    padding-bottom: 0;
  }

  .header .inner {
    margin: 0 3%;
  }

  #navBarTitle {
    font-size: 1.5em;
    float: right;
  }

  .header a {
    display: block;
    line-height: 1em;
    font-size: 1.5em;
    margin-bottom: 12px;
  }

  .logButtons {
    float: initial;
    text-align: center;
  }

  .logButtons .profileLink {
    text-align: left;
    margin-bottom: 16px;
  }

  .logButtons .logButton {
    margin-bottom: 0;
  }
}

@media (min-width: 375px) and (max-width: 413px) {
  .header {
    position: static;
    height: auto;
    padding-bottom: 0;
  }

  .header .inner {
    margin: 0 3%;
  }

  #navBarTitle {
    font-size: 1.5em;
    float: right;
  }

  .header a {
    display: block;
    line-height: 1em;
    font-size: 1.5em;
    margin-bottom: 12px;
  }

  .logButtons {
    float: initial;
    text-align: center;
  }

  .logButtons .profileLink {
    text-align: left;
    margin-bottom: 16px;
  }

  .logButtons .logButton {
    margin-bottom: 0;
  }
}

@media (min-width: 414px) and (max-width: 767px) {
  .header {
    position: static;
    height: auto;
    padding-bottom: 0;
  }

  .header .inner {
    margin: 0 3%;
  }

  #navBarTitle {
    font-size: 1.5em;
    float: right;
  }

  .header a {
    display: block;
    line-height: 1em;
    font-size: 1.5em;
    margin-bottom: 12px;
  }

  .logButtons {
    float: initial;
    text-align: center;
  }

  .logButtons .profileLink {
    text-align: left;
    margin-bottom: 16px;
  }

  .logButtons .logButton {
    margin-bottom: 0;
  }
}

@media (min-width: 768px) and (max-width: 1365px) {
  .header {
    position: static;
    height: 90px;
    padding-bottom: 0;
  }

  .header .inner {
    margin: 0 7%;
    position: relative;
  }

  .logButtons {
    float: initial;
    float: right;
  }
}

@media (min-width: 1366px) and (max-width: 1599px) {
}

@media (min-width: 1600px) and (max-width: 1919px) {
}

@media (min-width: 1920px) {
}
</style>
