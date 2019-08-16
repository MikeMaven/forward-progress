<template>
  <div>
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

const GET_USERS = gql`
 {
    users {
      id
      firstName
      lastName
      email
      username
      password
      provider
      emailConfirmed
      profileData
      additionalProvidersData
      resetPasswordToken
      resetPasswordExpires
      createdAt
      updatedAt
    }
  }
`;

debugger

export default {
  name: 'UserList',
  components: {
    UserItem
  },
  apollo: {
    users: {
      query: GET_USERS,
      pollInterval: 300
    }
  },
  data() {
    return {
      users: []
    };
  }
};
</script>
