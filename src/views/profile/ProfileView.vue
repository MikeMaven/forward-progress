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
      <li>Name: {{ profileInfo.displayName }}</li>  
      <li>Email: {{ profileInfo.email }}</li>
    </ul>
    <h4>My Notes: (/api/myNotes)</h4>
    {{myNotes}}
    <h4>Post some kind of note:</h4>
    <button v-on:click="postSomething">POST</button>
  </div>
</template>

<script>
const axios = require('axios');

export default {
  data () {
    return {
      profileInfo: {},
      info: {},
      myNotes: {}
    }
  },
  mounted () {
    axios
      .get('/api/getNotes')
      .then(response => (this.info = response.data))
    axios
      .get('/api/profile')
      .then(response => (this.profileInfo = response.data))
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