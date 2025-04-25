<template>
  <div class="player">
    <div class="player__sizer">
      <video
        ref="videoRef"
        @play="onVideoPlay"
        @pause="onVideoPause"
        @click="togglePlay"
        @volumechange="onVideoVolumeChange"
        @loadedmetadata="onVideoLoadedMetaData"
        @timeupdate="onVideoTimeupdate"
      >
        <source type="video/webm" :src="videoUrl" />
        Your browser does not support the video tag.
      </video>
    </div>

    <div class="player__gradient" />

    <div class="player__controls">
      <q-toolbar class="bg-transparent player__toolbar" dense flat>
        <q-btn
          color="white"
          flat
          round
          :icon="isPlaying ? 'mdi-pause' : 'mdi-play'"
          @click="togglePlay"
        />
        <q-btn
          color="white"
          flat
          round
          :icon="isMuted ? 'mdi-volume-off' : 'mdi-volume-high'"
          @click="toggleSound"
        />

        <Slider
          class="player__sound-slider q-mr-md"
          :value="isMuted ? 0 : volume"
          @input="handleVolumeSliderChange"
        />

        <div class="player__time">{{ currentTimeFormatted }} / {{ durationFormatted }}</div>

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
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import Slider from './Slider.vue'

// const value = ref(0.3)
const videoUrl = ref(
  'https://meetyoo-code-challenge.s3.eu-central-1.amazonaws.com/live/S14JJ9Z6PKoO/bf1d4883-5305-4d65-a299-cbb654ef1ed9/video.webm',
)

const isPlaying = ref(false)
const isMuted = ref(false)
const volume = ref(1)
const isFullscreen = ref(false)
const duration = ref(0)
const currentTime = ref(0)
const videoRef = ref(null)

onMounted(() => {
  document.addEventListener('keyup', onDocumentKeyUp)
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', onDocumentKeyUp)
})

const togglePlay = () => {
  const video = videoRef.value
  if (!video) return

  if (video.paused) {
    video.play()
  } else {
    video.pause()
  }
}

const onVideoPlay = () => {
  isPlaying.value = true
}

const onVideoPause = () => {
  isPlaying.value = false
}

// Time Control / Update */
const formatTime = (seconds) => {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainingSeconds = Math.floor(seconds % 60)

  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`

  return formattedTime
}

const onVideoLoadedMetaData = () => {
  const video = videoRef.value

  // get video meta data(time) after video is loaded
  if (video) {
    duration.value = video.duration
    currentTime.value = video.currentTime
  }
}

const currentTimeFormatted = computed(() => {
  return formatTime(Math.round(currentTime.value))
})

const durationFormatted = computed(() => {
  return formatTime(Math.round(duration.value))
})

const onVideoTimeupdate = () => {
  const video = videoRef.value
  // native timeUpdate
  currentTime.value = video.currentTime
}

const onDocumentKeyUp = (e) => {
  if (e.keyCode === 32) {
    togglePlay()
  }
}

// Sound Control
const toggleSound = () => {
  const video = videoRef.value
  if (!video) return

  if (video.volume <= 0) {
    video.volume = 0.5
  }

  video.muted = !video.muted
}

const onVideoVolumeChange = () => {
  const video = videoRef.value

  if (video) {
    /**
     * native values of video element —
     * whether it's muted or has sound —
     * are passed to isMuted and volume refs.
     * synchronize natives & variables
     */
    isMuted.value = video.muted
    volume.value = video.volume
  }
}

const handleVolumeSliderChange = (value) => {
  const video = videoRef.value

  // unmute video + icon, if slider value > 0
  if (video) {
    if (video.muted && value > 0) {
      video.muted = false
    }

    // switch vid + icon to mute, if user slides volume to 0
    if (value <= 0) {
      video.muted = true
    }

    video.volume = value

    volume.value = value
    isMuted.value = video.muted
  }
}
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
