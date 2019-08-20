<template>
  <div>
    <div class="card-header text-dark">
      {{ post.strEvent }}
    </div>
    <div class="card-body">
      <span class="card-text">
        Date:</br>
        {{ post.dateEvent }}
      </span>
    </div>
    <div v-if="post.strThumb" class="card-footer">
      <img
        :src="post.strThumb"
        target="_blank">Read More</a>
    </div>
  </div>
</template>
<script>
export default {
  /* eslint-disable vue/require-prop-types */
  props: ['post']
};
</script>
<style scoped>
.card {
  min-height: 40%;
}
</style>
