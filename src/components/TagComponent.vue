<template>
  <div class="noteIndexTag">
    <H6>{{ tag.name }}</H6>
  </div>
</template>

<script>

export default {
  title: 'TagComponent',
  props: ['tag']
};
</script>

<style>
.noteIndexTag {
  float: right;
  display: inline-block;
  padding: 8px 26px 4px 26px;
  background-color: #0E4689;
  border-radius: 5px;
  color: white;
  text-align: center;
  margin-left: 15px;
}

.noteIndexTag h6 {
  font-size: 1.25em;
  line-height: 1em;
}
</style>