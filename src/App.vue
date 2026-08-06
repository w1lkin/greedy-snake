<template>
  <div class="app" :style="size">
    <div class="rect" :class="reset?'drop':''">
      <Decorate/>
      <div class="screen">
        <div class="panel">
          <Matrix :propMatrix="matrix" />
          <Logo :cur="status==='playing'" :reset="reset" />
          <div class="state">
            <Point :cur="status==='playing'" :max="max" :point="points" />
            <p>{{foodLabel}}</p>
            <Number :number="foodCount" />
            <p>{{wallPassLabel}}</p>
            <Number :number="wallPass ? 1 : 0" :length="1" />
            <p>{{levelLabel}}</p>
            <Number :number="speedRun + 1" :length="1" />
            <div class="bottom">
              <Music :data="music" />
              <Pause :data="pause" />
              <Number :propTime="true" />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Keyboard :filling='filling' :wallPass="wallPass" />
    <Guide/>
  </div>
</template>

<style lang="less">
@import './app.less';
@import './loader.less';
</style>

<script src="./app.js"></script>
