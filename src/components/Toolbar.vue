<template>
  <div id="toolbar">
    <select class="ql-size">
      <option value="small"></option>
      <!-- Note a missing, thus falsy value, is used to reset to default -->
      <option selected></option>
      <option value="large"></option>
      <option value="huge"></option>
    </select>
    <button class="ql-bold"></button>
    <button class="ql-italic"></button>
    <button class="ql-underline"></button>
    <button class="ql-strike"></button>
    <button class="ql-blockquote"></button>
    <button class="ql-code-block"></button>
    <button class="ql-script" value="super"></button>
    <button class="ql-script" value="sub"></button>
    <button class="ql-list" value="ordered"></button>
    <button class="ql-list" value="bullet"></button>
    <button class="ql-indent" value="-1"></button>
    <button class="ql-indent" value="+1"></button>
    <button class="ql-customButton">GRID</button>
    <button class="ql-clean"></button>
  </div>
</template>

<script>
export default {
  name: 'ToolBar'
};
</script>