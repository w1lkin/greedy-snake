<template>
  <div class="number">
    <span v-for="(item,index) in data" :key="index" :class="'d_'+item">
      {{ item === 'n' ? '' : item === 'd' ? ':' : item === 'd_c' ? ':' : item }}
    </span>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>