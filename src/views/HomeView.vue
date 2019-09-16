<template>
  <div class="container" id="landingContainer">
    <div class="span-image">
      <img src="/public/images/field.jpg" class="landingImage">
    </div>
    <div class="row" id="textOverImage">
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

<style>

.span-image {
  position: relative;
  z-index: -1;
}

.landingImage {
  position: absolute;
  width: 100%;
  /* height: 60vh; */
  margin: auto;
  object-fit: cover;
  object-position: 0 -130px;
}

#textOverImage {
  width: 100%;
  margin: 0;
}

h1 {
  font-family: paralucent, sans-serif;
}

#mainContainer {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}

#landingContainer {
  width: 100%;
  max-width: 100%;
  padding: 0;
  margin: 0;
}

</style>
