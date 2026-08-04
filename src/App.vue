<template>
  <div class="app" :style="size">
    <div class="rect" :class="reset?'drop':''">
      <Decorate/>
      <div class="screen">
        <div class="panel">
          <Matrix :snake="snake" :food="food" :wallPass="wallPass" :reset="reset" :status="status" />
          <div class="state">
            <Point :cur="status === 'playing'" :max="max" :point="points" />
            <p>{{difficultyLabel}}</p>
            <Number :number="speedRun" :length="3" />
            <p>{{wallPassLabel}}</p>
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
    <Guide :wallPass="wallPass" :difficulty="difficulty" />
  </div>
</template>

<style lang="less">
@import './app.less';
@import './loader.less';
</style>

<script src="./app.js"></script>
