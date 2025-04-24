<template>
  <div class="player">
    <div class="player__sizer">
      <video>
        <source type="video/webm" :src="videoUrl" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="player__gradient" />

    <div class="player__controls">
      <q-toolbar class="bg-transparent player__toolbar" dense flat>
        <q-btn color="white" flat round icon="mdi-play" />
        <q-btn color="white" flat round icon="mdi-volume-high" />

        <Slider class="player__sound-slider q-mr-md" :value="1" />

        <div class="player__time">00:000 / 00/00</div>

        <q-space />

        <q-btn color="white" flat round icon="mdi-fullscreen" />
      </q-toolbar>
    </div>

    <!-- <div class="player__control">
      <Slider :value="value" @input="(val) => (value = val)" />
    </div> -->
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Slider from './Slider.vue'

// const value = ref(0.3)
const videoUrl = ref(
  'https://meetyoo-code-challenge.s3.eu-central-1.amazonaws.com/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm',
)
</script>

<style lang="scss" scoped>
.player {
  position: relative;
  width: 100%;

  video {
    position: absolute;

    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &__sizer {
    position: relative;
    width: 100%;
    padding-top: 56.25%; // 16 by 9 ratio value. the height of the element will be always 56.25 of of 100%
  }

  &__controls {
    position: absolute;
    border: 2px red solid;
    bottom: 0;
    left: 0;
    right: 0;
  }

  &__sound-slider {
    width: 96px;
  }

  &__time {
    color: #fff;
  }

  &__gradient {
    background: #000000;
    background: linear-gradient(0deg, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%);
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    height: 25%; //  responsiveness
    opacity: 0.7;
  }
}
</style>
