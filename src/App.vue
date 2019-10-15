<template>
  <div id="app">
    <app-header/>
    <div class="container" id="mainContainer">
      <transition
        name="fade"
        mode="out-in">
        <router-view class="view"/>
      </transition>
    </div>
  </div>
</template>
<script>
import AppHeader from './components/AppHeader.vue';

export default {
  components: {
    'app-header': AppHeader,
  }
};
</script>
<style lang="scss">
body {
  padding-top: 0px!important;
}
@import './styles/index';
@import '~bootstrap/scss/bootstrap';
@import '~bootstrap-vue/src/index.scss';
</style>
