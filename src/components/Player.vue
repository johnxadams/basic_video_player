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
        <q-btn color="white" round flat>
          <q-icon name="mdi-play" />
        </q-btn>
        <q-btn color="white" round flat>
          <q-icon name="mdi-volume-high" />
        </q-btn>
        <Slider class="player__sound-slider" :value="1" />
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
}
</style>
