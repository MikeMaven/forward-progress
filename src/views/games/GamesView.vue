<template>
  <div id="gamesContainer">
      <ul class="sub-nav">
        <li>
          <router-link to="/games/category/nfl">Upcoming NFL Games</router-link>
        </li>
        <li>
          <router-link to="/games/category/college">Upcoming College Football Games</router-link>
        </li>
      </ul>
    <!-- Header -->
    <div class="row">
      <div class="column">
        <transition
          name="fade"
          mode="out-in">
          <router-view class="view"/>
        </transition>
      </div>
    </div>
  </div>
</template>
<script>
const CategoryView = () => import('./prefetch/CategoryView.vue');
const ModalView = () => import('./modal/ModalView.vue');
export default {
  created() {
    let { routes } = this.$router.options;
    let routeData = routes.find(r => r.path === this.$route.path);
    routeData.children = [
      { path: 'category/:id', name: 'category', component: CategoryView },
      { path: 'modal', name: 'modal', component: ModalView }
    ];
    this.$router.addRoutes([routeData]);
  }
};
</script>

<style scoped>
#gamesContainer {
  margin: 10px 16% 0 16%;
}

#gamesContainer li {
  margin-right: 20px;
}
</style>