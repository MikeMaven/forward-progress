<template>
  <div>
    <ul class="sub-nav">
      <li>
        <router-link to="/profile/userinfo">User info</router-link>
      </li>
      <li>
        <router-link to="/profile/userpassword">Password</router-link>
      </li>
    </ul>
    <transition 
      name="fade" 
      mode="out-in">
      <router-view class="view"/>
    </transition>  
    <h4>Your Info</h4>
    <ul>
      <li>Admin: {{ this.isAdmin }}</li>
    </ul>
    <img v-if="this.isAdmin" src="/public/images/star-off.png">
    <h2>Shared Notes:</h2>
    {{ this.sharedNotes }}
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data () {
    return {
      info: {},
      myNotes: {},
    }
  },
  computed: {
    isAdmin() {
      return this.$store.getters['userInfo/isAdmin']
    },
    sharedNotes() {
      return this.$store.getters['notes/sharedNotes']
    }
  },
  mounted() {
    this.$store.dispatch('userInfo/fetchProfile');
    this.$store.dispatch('notes/getSharedNotes');
    axios
      .get('/api/getNotes')
      .then(response => (this.info = response.data))
    axios
      .get('/api/myNotes')
      .then(response => (this.myNotes = response.data))
  },
  methods: {
    postSomething: () => {
      axios.post('/api/newNote', {
        title: 'Posted Note Title',
        body: 'Posted Note Body'
      })
    }
  }
}
</script>

<style scoped>
li {
  display: block;
}
</style>