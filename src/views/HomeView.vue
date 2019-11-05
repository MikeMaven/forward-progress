<template>
  <div class="container" id="landingContainer">
    <div class="span-image">
      <img src="/public/images/field.jpg" class="landingImage">
    </div>
    <div id="textOverImage">
      <div class="col titleArea">
        <h1>Forward<br><span class="logoProgress">Progress</span></h1>
      </div>
    </div>
    <div class="row">
      <div class="col aboutRow">
          <router-link to="about" class="aboutButton infoButton">Who We Are</router-link>
      </div>
    </div>
    <div class="row">
      <div class="col aboutRow aboutRowSubHeader">
        <p class="subHeader">A web based SaaS platform for front office NFL executives.</p>
      </div>
    </div>
    <div class="row header3">
      <p>Leading the Way Forward in Football Analysis</p>
    </div>
    <div class="featureSpotlight">
      <div class="featureColumn">
        <img src="~public/images/Icon1.png">
        <h2>Articles</h2>
        <p>Dedicated analysis from top NFL insiders.</p>
      </div>
      <div class="featureColumn">
        <img src="~public/images/Icon2.png">
        <h2>Data Visualization</h2>
        <p>Leaders in NFL stats analysis and visualiztion.</p>
      </div>
      <div class="featureColumn">
        <img src="~public/images/Icon3.png">
        <h2>Live Updates</h2>
        <p>Live updates and insights that only NFL insiders can provide.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['appData'])
  },
  mounted() {
    this.$store.dispatch('blog/getBlogPosts');
  },
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
  height: 360px;
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

@media (max-width: 374px) {
  .row {
    margin: 0;
  }

  .span-image {
  }

  .landingImage {
    height: 325px;
  }

  #textOverImage {
    margin: 0 10%;
  }

  .titleArea h1 {
    margin-left: 15px;
    margin-bottom: 10px;
    font-size: 3em;
  }

  .aboutRow {
    margin-top: 25px;
  }

  .featureSpotlight .featureColumn {
    width: 100%;
    margin-bottom: 35px;
  }

  .featureSpotlight .featureColumn img {
    width: 85%;
  }

  .header3 {
    text-align: center;
    font-size: 1.25em;
  }

  .header3 p {
    margin: 5px 5px -15px 5px;
  }
}

@media (min-width: 375px) and (max-width: 413px) {
  .row {
    margin: 0;
  }

  .span-image {
  }

  .landingImage {
    height: 360px;
  }

  #textOverImage {
    margin: 0 10%;
  }

  .titleArea h1 {
    margin-left: 15px;
    margin-bottom: 10px;
    font-size: 5em;
  }

  .aboutRow {
    margin-top: 25px;
  }

  .featureSpotlight .featureColumn {
    width: 100%;
    margin-bottom: 35px;
  }

  .featureSpotlight .featureColumn img {
    width: 85%;
  }

  .header3 {
    text-align: center;
    font-size: 1.25em;
  }

  .header3 p {
    margin: 5px 5px -15px 5px;
  }
}

@media (min-width: 414px) and (max-width: 629px) {
  .row {
    margin: 0;
  }

  .span-image {
  }

  .landingImage {
    height: 360px !important;
  }

  #textOverImage {
    margin: 0 10%;
  }

  .titleArea h1 {
    margin-left: 15px;
    margin-bottom: 10px;
    font-size: 5em;
  }

  .aboutRow {
    margin-top: 25px;
  }

  .landingImage {
    height: 220px;
  }

  .header3 {
    text-align: center;
    font-size: 1em;
  }

  .header3 p {
    margin: 0 10%;
  }

  .featureSpotlight {
    margin: 35px 4% 60px 4%;
  }

  .featureSpotlight .featureColumn {
    width: 30%;
    height: 275px;
  }

  .aboutRowSubHeader {
    margin-bottom: 30px;
  }
}

@media (min-width: 630px) and (max-width: 767px) {
  .titleArea h1 {
    margin-left: 15px;
    font-size: 7em;
  }

  .aboutRow {
    margin-top: 40px;
  }

  .landingImage {
    height: 285px;
  }

  .header3 {
    text-align: center;
    font-size: 1em;
  }

  .header3 p {
    margin: 0 10%;
  }

  .featureSpotlight {
    margin: 35px 4% 60px 4%;
  }

  .featureSpotlight .featureColumn {
    width: 30%;
    height: 275px;
  }
}

@media (min-width: 768px) and (max-width: 1365px) {
  .header3 {
    text-align: center;
    font-size: 1.25em;
  }

  .header3 p {
    margin: 0 10%;
  }
}

@media (min-width: 1366px) and (max-width: 1599px) {
}

@media (min-width: 1600px) and (max-width: 1919px) {
}

@media (min-width: 1920px) {
}

</style>
