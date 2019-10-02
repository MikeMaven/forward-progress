<template>
  <div class="container" id="landingContainer">
    <div class="span-image">
      <img src="/public/images/field.jpg" class="landingImage">
    </div>
    <div id="textOverImage">
      <div class="column titleArea">
        <h1>Forward<br><span class="logoProgress">Progress</span></h1>
      </div>
    </div>
    <div class="row">
      <div class="column aboutRow">
          <router-link to="about" class="aboutButton infoButton">More info</router-link>
      </div>
    </div>
    <div class="row">
      <div class="column aboutRow aboutRowSubHeader">
        <p class="subHeader">A web based SaaS platform for front office NFL executives.</p>
      </div>
    </div>
    <div class="row header3">
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod</p>
    </div>
    <div class="featureSpotlight">
      <div class="featureColumn">
        <img src="~public/images/Icon1.png">
        <h2>Heading One</h2>
        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium</p>
      </div>
      <div class="featureColumn">
        <img src="~public/images/Icon2.png">
        <h2>Heading Two</h2>
        <p>Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit velit</p>
      </div>
      <div class="featureColumn">
        <img src="~public/images/Icon3.png">
        <h2>Heading Three</h2>
        <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae</p>
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

.row {
  width: 100% !important;
}

.span-image {
  position: relative;
  z-index: -1;
}

.landingImage {
  position: absolute;
  width: 100%;
  height: 40vh;
  margin: auto;
  object-fit: cover;
  object-position: 0 -130px;
}

#textOverImage {
  margin: 0 16%;
}

.titleArea h1 {
  padding-top: 0.15em;
  font-family: paralucent, sans-serif;
  font-style: italic;
  font-weight: 700;
  font-size: 10em;
  line-height: 0.9em;
  color: white;
  text-shadow: 2px 2px 5px black;
}

.logoProgress {
  margin-left: 0.3em;
}

.aboutRow {
  margin-top: 75px;
  text-align: center;
}

.aboutRowSubHeader {
  margin-top: 20px;
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

.infoButton {
  font-family: paralucent, sans-serif;
  font-style: 'normal';
  font-weight: 400;
  font-size: 1.5em;
  letter-spacing: 0.2em;
  color: #d50a0a;
  background-color: white;
  padding: 10px 5% 10px 5%;
  text-transform: uppercase;
}

.subHeader {
  color: white;
  font-family: paralucent, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 1.5em;
  letter-spacing: 0.1em;
}

.header3 {
  max-width: 100%;
  margin: 2.5% 0 0 0;
  font-family: paralucent, sans-serif;
  font-style: 'normal';
  font-weight: 400;
  font-size: 1.5em;
  color: #013369;
}

.header3 p {
  margin: 0 auto;
  font-family: paralucent, sans-serif;
  font-style: normal;
  font-weight: 400;
  font-size: 1.5em;
  text-transform: uppercase;
  letter-spacing: 0.2em;
}

.featureSpotlight {
  margin: 35px 16% 0 16%;
  text-align: center;
}

.featureSpotlight .featureColumn {
  width: 33%;
  margin: 0 auto;
  display: inline-block;
  text-align: center;
}

.featureSpotlight .featureColumn img {
  width: 50%;
}

.featureColumn h2 {
  color: #d50a0a;
  font-family: paralucent, sans-serif;
  font-style: normal;
  font-weight: 500;
  font-size: 2.1em;
  text-transform: uppercase;
  letter-spacing: 0.30em;
  margin-top: 15px;
}

.featureColumn p {
  color: black;
  font-family: 'Open Sans', sans-serif;
  margin: 0 15%;
  font-size: 1.5em;
}

</style>
