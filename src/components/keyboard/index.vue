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
          @touchstart.native.prevent.stop="onUpStart" @mousedown.native.prevent.stop="onUpStart"
          @touchend.native="onUpEnd" @mouseup.native="onUpEnd" @mouseleave.native="onUpEnd"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="180"
          :left="374"
          :label="labelDown"
          arrow="translate(0,-71px) rotate(180deg)"
          :active="keyboard['down']"
          @touchstart.native.prevent.stop="onDownStart" @mousedown.native.prevent.stop="onDownStart"
          @touchend.native="onDownEnd" @mouseup.native="onDownEnd" @mouseleave.native="onDownEnd"
        />
        <vbutton
          color="blue"
          size="s1"
          :top="90"
          :left="284"
          :label="labelLeft"
          arrow="translate(60px, -12px) rotate(270deg)"
          :active="keyboard['left']"
          @touchstart.native.prevent.stop="onLeftStart" @mousedown.native.prevent.stop="onLeftStart"
          @touchend.native="onLeftEnd" @mouseup.native="onLeftEnd" @mouseleave.native="onLeftEnd"
        />
        <vbutton
          color="blue"
          size="s1"
          :top='90'
          :left='464'
          :label="labelRight"
          arrow="translate(-60px, -12px) rotate(90deg)"
          :active="keyboard['right']"
          @touchstart.native.prevent.stop="onRightStart" @mousedown.native.prevent.stop="onRightStart"
          @touchend.native="onRightEnd" @mouseup.native="onRightEnd" @mouseleave.native="onRightEnd"
        />
        <vbutton
          color="red"
          size="s2"
          :top="0"
          :left="196"
          :label="labelResetR"
          :active="keyboard['reset']"
          @touchstart.native.prevent.stop="onResetDown" @mousedown.native.prevent.stop="onResetDown"
          @touchend.native="onResetUp" @mouseup.native="onResetUp" @mouseleave.native="onResetUp"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="106"
          :label="labelSoundS"
          :active="keyboard['music']"
          @touchstart.native.prevent.stop="onMusicDown" @mousedown.native.prevent.stop="onMusicDown"
          @touchend.native="onMusicUp" @mouseup.native="onMusicUp" @mouseleave.native="onMusicUp"
        />
        <vbutton
          color="green"
          size="s2"
          :top="0"
          :left="16"
          :label="labelPauseP"
          :active="keyboard['pause']"
          @touchstart.native.prevent.stop="onPauseDown" @mousedown.native.prevent.stop="onPauseDown"
          @touchend.native="onPauseUp" @mouseup.native="onPauseUp" @mouseleave.native="onPauseUp"
        />
        <div class="big-btn">
          <span>GO</span>
        </div>
      </div>
</template>
<style lang="less">
 @import './index.less';
</style>

<script src="./index.js">
</script>