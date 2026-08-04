<template>
  <div
        class="keyboard"
        :style="'margin-top:'+fillingNum+'px'"
      >
        <vbutton
          color="blue"
          size="s1"
          :top="0"
          :left="374"
          :label="labelUp"
          arrow="translate(0, 63px)"
          :position="true"
          :active="keyboard['up']"
          ref="dom_up"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="180"
          :left="374"
          :label="labelDown"
          arrow="translate(0,-71px) rotate(180deg)"
          :active="keyboard['down']"
          ref="dom_down"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="90"
          :left="284"
          :label="labelLeft"
          arrow="translate(60px, -12px) rotate(270deg)"
          :active="keyboard['left']"
          ref="dom_left"
        />
        <vbutton
          color="blue"
          size="s1"
          :top='90'
          :left='464'
          :label="labelRight"
          arrow="translate(-60px, -12px) rotate(90deg)"
          :active="keyboard['right']"
          ref="dom_right"
        />
        <vbutton
          color="red"
          size="s2"
          :top="0"
          :left="196"
          :label="labelResetR"
          :active="keyboard['reset']"
          ref="dom_r"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="106"
          :label="labelSoundS"
          :active="keyboard['music']"
          ref="dom_s"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="16"
          :label="labelPauseP"
          :active="keyboard['pause']"
          ref="dom_p"
        />
        <!-- 移动端：难度切换 -->
        <div class="mobile-settings">
          <span class="mob-btn" :class="{active: difficulty==='easy'}" @click="changeDifficulty('easy')">1</span>
          <span class="mob-btn" :class="{active: difficulty==='normal'}" @click="changeDifficulty('normal')">2</span>
          <span class="mob-btn" :class="{active: difficulty==='hard'}" @click="changeDifficulty('hard')">3</span>
          <span class="mob-btn toggle" :class="{active: wallPass}" @click="toggleWallPass">{{wallPass?'WP':'--'}}</span>
        </div>
      </div>
</template>
<style lang="less">
 @import './index.less';
</style>

<script src="./index.js">
</script>