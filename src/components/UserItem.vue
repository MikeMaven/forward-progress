<template>
  <h1><a v-bind:href="'/users/' + user.id">{{user.id}} {{user.firstName}}</a></h1>
</template>

<script>
export default {
  name: 'UserItem',
  props: ['user']
}
</script>
