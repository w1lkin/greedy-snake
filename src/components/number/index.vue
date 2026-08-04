<template>
  <div class="number">
    <span v-for="(item,index) in data" :class="'d_'+item" :key="index">{{item === 'n' ? '' : item === 'd' ? ':' : item === 'd_c' ? ':' : item}}</span>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>