<template>
  <div class="slider">
    <div class="slider__bar" ref="bar">
      <div class="slider__handler" ref="handle"></div>
      <div class="slider__fill"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { throttle } from 'lodash'

const props = defineProps({
  min: {
    type: Number,
    default: 0,
  },
  max: {
    type: Number,
    default: 1,
  },
  value: Number,
  disabled: Boolean,
})

const isDragging = ref(false) // check if element is being dragged or not
const handleWidth = ref(0) // track the handle element and update when window resizes
const barWidth = ref(0) // track the value of the width of the bar

const bar = ref(null)
const handle = ref(null)

onMounted(() => {
  console.log('handle width:', handle)

  const barWidth = bar.value.offsetWidth
  console.log('Bar width:', barWidth)

  getDimensions()
  window.addEventListener('resize', throttledWindowResize)
  //   window.addEventListener('resize', onWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})

const onWindowResize = () => {
  getDimensions()
}

const throttledWindowResize = throttle(onWindowResize, 200)

const getDimensions = () => {
  // Zugriff auf die DOM-Elemente über die Refs
  handleWidth.value = handle.value.offsetWidth
  barWidth.value = bar.value.offsetWidth
}
</script>

<style lang="scss" scoped>
.slider {
  width: 100%; // occupy the full width of the page-orientation
  height: 24px; // raum schaffen für den cursor pointer // hover effect
  display: flex;
  align-items: center;
  cursor: pointer;

  &__fill,
  &__handle {
    transition: transform 0.3s ease-in-out;
  }

  &__bar {
    position: relative;
    width: 100%;
    height: 4px;
    background-color: rgba($color: #cf3d3d, $alpha: 0.7);
  }

  &__handler {
    position: absolute;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #3b53cd;
    left: 0;
    top: calc(50% - 7px); // align element in the middle  -> 7px is 50% of 14px height&width
    z-index: 2; // set handle above fill_Element
  }
}
</style>
