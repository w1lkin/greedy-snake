<template>
  <div class="matrix" :class="{ reset: reset }">
    <template v-for="(row, rowIdx) in grid">
      <p v-for="(col, colIdx) in row" :key="rowIdx + '-' + colIdx">
        <b :class="{c:col===1, d:col===2}"></b>
      </p>
    </template>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>
