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
    <h4>Profile Api: (/api/profile)</h4>
    {{ profileInfo }}
    <h4>All Notes Api: (/api/getNotes)</h4>
    {{ info }}
    <h4>My Notes: (/api/myNotes)</h4>
    {{myNotes}}
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
  }
}
</script>