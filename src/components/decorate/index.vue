<template>
  <div class="decorate">
    <h1>{{title}}</h1>
    <div class="snake-deco left">
      <svg viewBox="0 0 40 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="20" height="20" fill="#494536"/>
        <rect x="0" y="40" width="20" height="20" fill="#494536"/>
        <rect x="20" y="40" width="20" height="20" fill="#494536"/>
        <rect x="20" y="60" width="20" height="20" fill="#494536"/>
        <rect x="0" y="80" width="20" height="20" fill="#494536"/>
        <rect x="0" y="120" width="20" height="20" fill="#494536"/>
        <rect x="20" y="120" width="20" height="20" fill="#494536"/>
        <rect x="20" y="140" width="20" height="20" fill="#494536"/>
        <rect x="0" y="160" width="20" height="20" fill="#494536"/>
      </svg>
    </div>
    <div class="snake-deco right">
      <svg viewBox="0 0 40 200" xmlns="http://www.w3.org/2000/svg">
        <rect x="20" y="0" width="20" height="20" fill="#494536"/>
        <rect x="20" y="40" width="20" height="20" fill="#494536"/>
        <rect x="0" y="40" width="20" height="20" fill="#494536"/>
        <rect x="0" y="60" width="20" height="20" fill="#494536"/>
        <rect x="20" y="80" width="20" height="20" fill="#494536"/>
        <rect x="20" y="120" width="20" height="20" fill="#494536"/>
        <rect x="0" y="120" width="20" height="20" fill="#494536"/>
        <rect x="0" y="140" width="20" height="20" fill="#494536"/>
        <rect x="20" y="160" width="20" height="20" fill="#494536"/>
      </svg>
    </div>
    <div class="topBorder">
      <span class="l mr" style="width:40px;" />
      <span class="l mr" />
      <span class="l mr" />
      <span class="l mr" />
      <span class="l mr" />
      <span class="r ml" style="width:40px;" />
      <span class="r ml" />
      <span class="r ml" />
      <span class="r ml" />
      <span class="r ml" />
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>