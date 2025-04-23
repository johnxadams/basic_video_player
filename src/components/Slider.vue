<template>
  <div class="slider">
    <div class="slider__bar" ref="bar">
      <div class="slider__handler" ref="handler" :style="handlerStyle"></div>
      <div class="slider__fill" :style="fillStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
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
const handlerWidth = ref(0) // track the handler element and update when window resizes
const barWidth = ref(0) // track the value of the width of the bar

const bar = ref(null)
const handler = ref(null)

onMounted(() => {
  getDimensions()
  window.addEventListener('resize', throttledWindowResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)
})

const fillRatio = computed(() => {
  return props.value / props.max
})

const fillStyle = computed(() => {
  return {
    transformOrigin: 'left center',
    transform: `scaleX(${fillRatio.value})`,
  }
})

const handlerStyle = computed(() => {
  const offset = barWidth.value * fillRatio.value - handlerWidth.value * 0.5

  return {
    transform: `translateX(${offset}px)`,
  }
})

const onWindowResize = () => {
  getDimensions()
}

const throttledWindowResize = throttle(onWindowResize, 200)

const getDimensions = () => {
  // target DOM Element thru ref="bar/handler"
  handlerWidth.value = handler.value.offsetWidth
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
  &__handler {
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

  &__fill {
    position: relative;
    height: 100%;
    width: 100%;
    background-color: rgb(14, 126, 178);
    z-index: 1;
  }
}
</style>
