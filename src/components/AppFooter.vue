<template>
  <footer class="footer">
    <span>
      A web based SaaS platform for front office NFL executives.
    </span>
  </footer>
</template>
<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['appData'])
  }
};
</script>
