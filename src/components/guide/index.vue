<template>
  <div v-show="!isMobile">
    <div class="guide right">
      <div class="up">
        <em style="transform:translate(0,-3px) scale(1,2)" />
      </div>
      <div class="left">
        <em style="transform:translate(-7px,3px) rotate(-90deg) scale(1,2)" />
      </div>
      <div class="down">
        <em style="transform: translate(0,9px) rotate(180deg) scale(1,2)" />
      </div>
      <div class="right">
        <em style="transform: translate(7px,3px)rotate(90deg) scale(1,2)" />
      </div>
    </div>
    <div class="guide left">
      <div class="settings">
        <div class="setting-row">
          <span class="setting-label">{{difficultyLabel}}:</span>
          <div class="diff-btns">
            <span class="diff-btn" :class="{active: difficulty==='easy'}" @click="$emit('changeDifficulty','easy')">1</span>
            <span class="diff-btn" :class="{active: difficulty==='normal'}" @click="$emit('changeDifficulty','normal')">2</span>
            <span class="diff-btn" :class="{active: difficulty==='hard'}" @click="$emit('changeDifficulty','hard')">3</span>
          </div>
        </div>
        <div class="setting-row">
          <span class="setting-label">{{wallPassLabel}}:</span>
          <span class="toggle-switch" :class="{active: wallPass}" @click="$emit('toggleWallPass')">
            <span class="toggle-knob"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>