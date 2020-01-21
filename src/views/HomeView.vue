<template>
  <div id="landingContainer">
    <div class="featured-section">
      <div class="row header3 mb-3">
        <p>Leading the Way Forward in Football Analysis</p>
      </div>
      <b-row align-h="center">
        <b-col cols="4">
          <b-carousel
            id="landing-page-article-carousel"
            :interval="4000"
            fade
            controls
            indicators
            background="#ababab"
            img-width="100%"
            img-height="400px"
            v-model="currentSlide"
          >
            <b-carousel-slide v-for="post in carouselSlides" v-bind:key="post.id"
              :img-src="post.coverImageURL"
            />
          </b-carousel>
          <div class="slider-article-description">
            <div class="slider-description-content">
              <div class="slider-title">{{ currentSlidePost.title }}</div>
              <div class="slider-subtitle">{{ currentSlidePost.subTitle }}</div>
            </div>
          </div>
        </b-col>
        <b-col cols="4">
          <div class="latest-container">
            <div class="red-title">
              LATEST
            </div>
            <div>
              <div v-for="post in otherLatestPosts" v-bind:key="post.id" class="latest-post">
                <div class="post-title">
                  {{ truncate(post.title, 'title') }}
                </div>
                <div class="post-subtitle">
                  {{ truncate(post.subTitle, 'subtitle') }}
                </div>
                <div v-if="!isLastLatestPost(post)" class="divider"/>
              </div>
            </div>
          </div>
        </b-col>
      </b-row>
    </div>
    <div
      class="featureSpotlight"
      style="border-top:1px dotted black;padding-top:30px;"
    >
      <div class="featureColumn">
        <img src="~public/images/Icon1.png" >
        <h2>Articles</h2>
        <p>Dedicated analysis from top NFL insiders.</p>
      </div>
      <div class="featureColumn">
        <img src="~public/images/Icon2.png" >
        <h2>Data Visualization</h2>
        <p>Leaders in NFL stats analysis and visualiztion.</p>
      </div>
      <div class="featureColumn">
        <img src="~public/images/Icon3.png" >
        <h2>Live Updates</h2>
        <p>Live updates and insights that only NFL insiders can provide.</p>
      </div>
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      appData: "appData",
      latestPosts: "blog/getLatestPosts"
    }),
    carouselSlides() {
      return this.latestPosts.slice(0, 3);
    },
    otherLatestPosts() {
      return this.latestPosts.slice(3, 6);
    },
    currentSlidePost() {
      return this.carouselSlides[this.currentSlide];
    }
  },
  data() {
    return {
      currentSlide: 0
    };
  },
  methods: {
    isLastLatestPost(post) {
      return _.last(this.otherLatestPosts) === post;
    },
    truncate(text, type) {
      if (type === "title" && text.length > 60) {
        return text.slice(0, 59) + "...";
      } else if (type === "subtitle" && text.length > 70) {
        return text.slice(0, 69) + "...";
      } else {
        return text;
      }
    }
  }
};
</script>

<style>
.featured-section {
  overflow: hidden;
}

.slider-title {
  font-size: 18px;
}

.slider-subtitle {
  font-size: 14px;
}

.slider-description-content {
  padding: 20px;
}

.slider-title,
.slider-subtitle {
  color: #ffffff;
}

.red-title {
  letter-spacing: 1.5pt;
  color: #ff0200;
  width: 100%;
  text-align: center;
  padding: 3px 0px;
  font-size: 20px;
  border-top: 2px solid #d50a0a;
  border-bottom: 2px solid #d50a0a;
}

.slider-article-description {
  height: 100%;
  background-color: #013369;
  color: #ffffff;
}

.divider {
  width: 80%;
  margin: 10px auto 0px;
  border-bottom: 1px solid #000000;
}

.post-title {
  font-size: 18px;
}

.post-subtitle {
  font-size: 14px;
}

.post-subtitle,
.post-title {
  color: #013369;
}

.latest-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.latest-post {
  padding: 5px 0px;
}

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
  font-style: "normal";
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
  font-style: "normal";
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
  letter-spacing: 0.3em;
  margin-top: 15px;
}

.featureColumn p {
  color: black;
  font-family: "Open Sans", sans-serif;
  margin: 0 15%;
  font-size: 1.5em;
}

@media (max-width: 374px) {
  .row {
    margin: 0;
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
