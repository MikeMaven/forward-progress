<template>
  <div>
    <button
      v-for="provider in providers"
      :key="provider"
      @click="login(provider)">
      Log in with {{ provider }}
    </button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      providers: ['google']
    };
  },
  methods: {
    login(provider) {
      window.location.href = `api/auth/${provider}`;
    }
  }
};
</script>
