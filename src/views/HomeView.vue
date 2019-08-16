<template>
  <div class="row">
    <div class="column">
      <h1>Forward Progress</h1>
      A web based SaaS platform for front office NFL executives.
      <br>
      <div>
        <router-link
          to="about"
          class="button button-outline float-right">More info</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['appData'])
  }
};
</script>
