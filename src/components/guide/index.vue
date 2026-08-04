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
        <div class="setting-item">
          <span>{{wallPassLabel}}:</span>
          <span class="toggle-switch" :class="{active: wallPass}" @click="toggleWallPass">
            <span class="toggle-knob"></span>
          </span>
        </div>
        <div class="setting-item">
          <span>{{difficultyLabel}}:</span>
          <select class="diff-select" :value="difficulty" @change="changeDifficulty">
            <option value="easy">{{easyLabel}}</option>
            <option value="normal">{{normalLabel}}</option>
            <option value="hard">{{hardLabel}}</option>
          </select>
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
