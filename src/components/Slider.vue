<template>
  <div :class="classes" @mousedown="onSliderMouseDown" @click="onSliderClick">
    <div class="slider__bar" ref="bar">
      <div class="slider__handler" ref="handler" :style="handlerStyle"></div>
      <div class="slider__fill" :style="fillStyle"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { getRelativeXPosition } from '@/utils/helpers'
import { throttle } from 'lodash'

const emit = defineEmits(['dragstart', 'dragend', 'click', 'input'])
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

const dragTimeout = ref(null) // value of setTimeout fn
const isDragging = ref(false) // check if element is being dragged or not
const dragDelay = ref(100) // setTimerout duration
const handlerWidth = ref(0) // track the handler element and update when window resizes
const barWidth = ref(0) // track the value of the width of the bar

const bar = ref(null)
const handler = ref(null)

onMounted(() => {
  getDimensions()
  window.addEventListener('resize', throttledWindowResize)

  document.addEventListener('mouseup', onDocumentMouseUp)
  document.addEventListener('mousemove', onDocumentMouseMove)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', onWindowResize)

  document.removeEventListener('mouseup', onDocumentMouseUp)
  document.removeEventListener('mousemove', onDocumentMouseMove)
})

/** Computed Start */

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
  // const offset = barWidth.value * fillRatio.value - handlerWidth.value * 0.5

  return {
    // transform: `translateX(${offset}px)`,
    transform: `translateX(${barWidth.value * fillRatio.value - handlerWidth.value * 0.5}px)`,
  }
})

const classes = computed(() => {
  return {
    slider: true,
    'slider--dragging': isDragging.value,
  }
})

/** Methods Start */

const onWindowResize = () => {
  getDimensions()
}

const throttledWindowResize = throttle(onWindowResize, 200)

const getDimensions = () => {
  // target DOM Element thru ref="bar/handler"
  handlerWidth.value = handler.value.offsetWidth
  barWidth.value = bar.value.offsetWidth
}

const onSliderMouseDown = () => {
  if (props.disabled) return

  dragTimeout.value = setTimeout(() => {
    isDragging.value = true
    dragTimeout.value = null

    emit('dragstart')
    console.log('Started dragging')
  }, dragDelay.value)
}

const onSliderClick = (e) => {
  if (props.disabled) return
  calculate(e)
}

/** Method eventListener */
function onDocumentMouseMove(e) {
  if (props.disabled || !isDragging.value) return

  calculate(e)
}

const onDocumentMouseUp = () => {
  if (props.disabled) return

  if (dragTimeout.value) {
    clearTimeout(dragTimeout.value)
    dragTimeout.value = null

    emit('click')
    console.log('Clicked')
  } else {
    isDragging.value = false
    emit('dragend')
    console.log('Ended dragging')
  }
}

const lerp = (min, max, t) => {
  return min + (max - min) * t
}

const calculate = (e) => {
  /**
   * Holt die X-Position der Maus relativ zur bar
   * Berechnet den Delta-Wert (0–1) und emittiert den neuen Wert über input
   */

  if (!bar.value || barWidth.value === 0) return

  const barLevelX = getRelativeXPosition(e, bar.value)

  // volumeLevel -> ergebnis vom relativeX / barWidth is eine Zahl zwischen 0 & 1
  const volumeLevel = barLevelX / barWidth.value

  console.log('barLevelX, barWidth:', barLevelX, barWidth.value)
  console.log('props.min, props.max, volumeLevel:', props.min, props.max, volumeLevel)

  const interpolated = lerp(props.min, props.max, volumeLevel)

  emit('input', interpolated)
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
    transition: transform 0.025s ease-in-out;
  }

  .slider--dragging .slider__fill,
  .slider--dragging .slider__handle {
    transition: none;
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
