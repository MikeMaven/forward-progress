<template>
  <div
    class="single-photo"
    @click="selectPhoto"
  >
    <img
      class="uploaded-image" 
      :src="url"
    />
    <font-awesome-icon
      class="ex"
      icon="times"
      size="2x"
      @click="deletePhoto"
    />
  </div>
</template>

<script>
export default {
  props: {
    url: String
  },
  methods: {
    selectPhoto() {
      this.$emit('select', this.url);
    },
    deletePhoto() {
      this.$emit('delete', this.url);
    }
  }
};
</script>

<style scoped>
.single-photo {
  display: flex;
  margin: 8px;
  border-style: solid;
  border-width: 2px;
  border-color: transparent;
}

.single-photo:hover {
  border-style: solid;
  border-width: 2px;
  border-color: #e5e5e5;
}

.ex {
  color: #e5e5e5;
  margin: 4px;
  visibility: hidden;
}

.single-photo:hover > .ex {
  visibility: visible;
}

.single-photo:hover > .ex:hover {
  color: #103466;
  visibility: visible;
}

.uploaded-image {
  height: 100px;
  width: 100px;
  margin: 16px;
  margin-right: 0;
}
</style>