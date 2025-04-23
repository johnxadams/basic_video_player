<template>
  <div class="player">
    Player
    <div class="player__sizer">
      <video>
        <source type="video/webm" :src="videoUrl" />
        Your browser does not support the video tag.
      </video>
      Player Sizer
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const videoUrl = ref(
  'https://meetyoo-code-challenge.s3.eu-central-1.amazonaws.com/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm',
)
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  width: 100%;
  outline: 2px green dotted;

  &__sizer {
    position: relative;
    width: 100%;
    padding-top: 56.25%; // 16 by 9 ratio value. the height of the element would be always 56.25 of of 100%
    border: 1px blue solid;
  }
}
</style>
