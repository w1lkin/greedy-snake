<template>
  <div class="decorate">
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
    <h1>{{title}}</h1>
    <!-- 左侧蛇形装饰 -->
    <div class="view l">
      <b class="c" /><b class="c" /><div class="clear" />
      <em/><b class="c" /><div class="clear" />
      <em/><b class="c" /><div class="clear" />
      <b class="c" /><b class="c" /><div class="clear" />
      <b class="c" /><b class="c" /><div class="clear" />
      <b class="c" /><p/>
      <b class="c" /><b class="c" /><b class="c" /><b class="c" />
    </div>
    <!-- 右侧蛇形装饰 -->
    <div class="view">
      <b class="c" /><b class="c" /><div class="clear" />
      <b class="c" /><em/><div class="clear" />
      <b class="c" /><em/><div class="clear" />
      <b class="c" /><b class="c" /><div class="clear" />
      <b class="c" /><b class="c" /><div class="clear" />
      <p/><b class="c" />
      <b class="c" /><b class="c" /><b class="c" /><b class="c" />
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>