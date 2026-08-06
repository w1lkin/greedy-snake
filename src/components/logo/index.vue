<template>
  <div class="logo" :style="'display:'+display">
    <div class="snake" :class="style">
      <b />
      <b class="eye" />
    </div>
    <p v-html="titleCenter" />
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>
