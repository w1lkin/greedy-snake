<template>
  <div class="guide-bar">
    <div class="guide-item">
      <span class="guide-label">{{highestScoreLabel}}:</span>
      <span class="guide-value">{{max}}</span>
    </div>
    <div class="guide-item">
      <span class="guide-label">{{difficultyLabel}}:</span>
      <div class="diff-buttons">
        <span
          v-for="d in ['easy','normal','hard']"
          :key="d"
          class="diff-btn"
          :class="{active: difficulty === d}"
          @click="$emit('changeDifficulty', d)"
        >{{$t(d)}}</span>
      </div>
    </div>
    <div class="guide-item">
      <span class="guide-label">{{wallPassLabel}}:</span>
      <span class="toggle-switch" :class="{active: wallPass}" @click="$emit('toggleWallPass')">
        <span class="toggle-knob"></span>
      </span>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>