<template>
  <div>
    <h1>All Users</h1>
    <user-item
      v-for="user in users"
      :key="user.id"
      :user="user">
    </user-item>
  </div>
</template>

<script>
import gql from 'graphql-tag';
import UserItem from '../../components/UserItem.vue';
import { GET_USERS } from '../../constants/graphQLUser.js';

export default {
  name: 'UserList',
  components: {
    UserItem
  },
  apollo: {
    users: {
      query: GET_USERS,
      pollInterval: 0
    }
  },
  data() {
    return {
      users: []
    };
  }
};
</script>
