<template>
  <div class="app" :style="size">
    <div class="rect" :class="reset?'drop':''">
      <Decorate/>
      <div class="screen">
        <div class="panel">
          <Matrix :snake="snake" :food="food" :reset="reset" :status="status" />
          <div class="state">
            <Point :cur="status === 'playing'" :max="max" :point="points" />
            <p>{{difficultyLabel}}</p>
            <Number :number="difficultyCode" :length="1" />
            <div class="bottom">
              <Music :data="music" />
              <Pause :data="pause" />
              <Number :propTime="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Keyboard :filling='filling' :wallPass="wallPass" :difficulty="difficulty" />
    <Guide/>
  </div>
</template>

<style lang="less">
@import './app.less';
@import './loader.less';
</style>

<script src="./app.js"></script>