<template>
  <h1>{{user.id}} {{user.firstName}}</h1>
</template>

<script>
export default {
  name: 'UserItem',
  props: ['user']
}
</script>
