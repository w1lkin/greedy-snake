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
          @touchstart.native.prevent="onUpDown" @mousedown.native="onUpDown"
          @touchend.native="onUpUp" @mouseup.native="onUpUp" @mouseleave.native="onUpUp"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="180"
          :left="374"
          :label="labelDown"
          arrow="translate(0,-71px) rotate(180deg)"
          :active="keyboard['down']"
          @touchstart.native.prevent="onDownDown" @mousedown.native="onDownDown"
          @touchend.native="onDownUp" @mouseup.native="onDownUp" @mouseleave.native="onDownUp"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="90"
          :left="284"
          :label="labelLeft"
          arrow="translate(60px, -12px) rotate(270deg)"
          :active="keyboard['left']"
          @touchstart.native.prevent="onLeftDown" @mousedown.native="onLeftDown"
          @touchend.native="onLeftUp" @mouseup.native="onLeftUp" @mouseleave.native="onLeftUp"
        />
        <vbutton
          color="blue"
          size="s1"
          :top='90'
          :left='464'
          :label="labelRight"
          arrow="translate(-60px, -12px) rotate(90deg)"
          :active="keyboard['right']"
          @touchstart.native.prevent="onRightDown" @mousedown.native="onRightDown"
          @touchend.native="onRightUp" @mouseup.native="onRightUp" @mouseleave.native="onRightUp"
        />
        <vbutton
          color="red"
          size="s2"
          :top="0"
          :left="196"
          :label="labelResetR"
          :active="keyboard['reset']"
          @touchstart.native.prevent="onReset" @mousedown.native="onReset"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="106"
          :label="labelSoundS"
          :active="keyboard['music']"
          @touchstart.native.prevent="onMusic" @mousedown.native="onMusic"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="16"
          :label="labelPauseP"
          :active="keyboard['pause']"
          @touchstart.native.prevent="onPause" @mousedown.native="onPause"
        />
      </div>
</template>
<style lang="less">
 @import './index.less';
</style>

<script src="./index.js">
</script>