<template>
  <div class="row">
    <div class="column">
      <h2>Login</h2>
      <div
        v-if="error"
        class="error">
        {{ error }}
      </div>
      <app-social-login/>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex';
import AppSocialLogin from '../components/AppSocialLogin.vue';
export default {
  components: {
    'app-social-login': AppSocialLogin
  },
  data() {
    return {
      usernameOrEmail: '',
      password: ''
    };
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'error'])
  },
  methods: {
    ...mapActions({
      logout: 'logout'
    }),
    login(event) {
      event.preventDefault();
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$store.dispatch('login', {
            usernameOrEmail: this.usernameOrEmail,
            password: this.password
          });
        }
      });
    }
  }
};
</script>
