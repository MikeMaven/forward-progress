<template>
  <div>
    <h2>SHOW PAGE</h2>
    <a href="/users">Back to Users</a>
    <ul>
      <li>Id: {{user.id}}</li>
      <li>First Name: {{user.firstName}}</li>
      <li>Last Name: {{user.lastName}}</li>
      <li>Email: {{ user.email }}</li>
      <li>Username: {{ user.username }}</li>
      <li>Provider: {{ user.provider }}</li>
    </ul>
  </div>
</template>

<script>
import { GET_USER_BY_ID } from '../../constants/graphQLUser.js';

export default {
  name: 'ShowUser',
  data() {
    return {
      user: '',
      userId: parseInt(this.$route.params.id)
    };
  },
  apollo: {
    user: {
      query: GET_USER_BY_ID,
      pollInterval: 0,
      variables() {
        return {
          userId: this.userId
        };
      }
    }
  }
};
</script>
