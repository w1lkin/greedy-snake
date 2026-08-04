<template>
  <div class="music-icon" :class="data?'on':'off'">
    <span class="icon">{{data ? '♪' : '✕'}}</span>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>