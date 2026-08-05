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
      <p>{{difficultyLabel}}:
        <span class="diff-btn" :class="{active: $store.state.difficulty==='easy'}" @click="setDifficulty('easy')">1</span>
        <span class="diff-btn" :class="{active: $store.state.difficulty==='normal'}" @click="setDifficulty('normal')">2</span>
        <span class="diff-btn" :class="{active: $store.state.difficulty==='hard'}" @click="setDifficulty('hard')">3</span>
      </p>
      <p>{{wallPassLabel}}:
        <span class="toggle-switch" :class="{active: $store.state.wallPass}" @click="toggleWallPass">
          <span class="toggle-knob"></span>
        </span>
      </p>
      <div class="space">SPACE</div>
    </div>
  </div>
</template>

<script src="./index.js">
</script>

<style lang="less">
@import './index.less';
</style>
