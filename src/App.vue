<template>
  <div class="app" :style="size">
    <div class="rect" :class="reset?'drop':''">
      <Decorate/>
      <div class="screen">
        <div class="panel">
          <div class="status-bar">
            <Point :cur="status === 'playing'" :max="max" :point="points" />
            <div class="icons">
              <Music :data="music"/>
              <Pause :data="pause"/>
            </div>
          </div>
          <Matrix :snake="snake" :food="food" :wallPass="wallPass" :reset="reset" :status="status" />
          <Guide
            :wallPass="wallPass"
            :difficulty="difficulty"
            @toggleWallPass="toggleWallPass"
            @changeDifficulty="changeDifficulty"
          />
        </div>
      </div>
    </div>
    <Keyboard :filling='filling' />
  </div>
</template>

<style lang="less">
@import './app.less';
@import './loader.less';
</style>

<script src="./app.js"></script>