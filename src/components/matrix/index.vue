<template>
  <div class="matrix">
    <p v-for="(row, idx) in propMatrix" :key="idx">
      <b
        v-for="(cell, jdx) in row"
        :key="jdx"
        :class="cell === 1 ? 'c' : cell === 2 ? 'd' : ''"
      />
    </p>
  </div>
</template>

<script>
export default {
  props: ['propMatrix']
}
</script>

<style lang="less">
@import './index.less';
</style>