<template>
  <div class="number">
    <span v-for="(item,index) in data" :class="'bg s_'+item" :key="index"></span>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>
