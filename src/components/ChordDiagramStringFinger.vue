<script setup lang="ts">
import { getFingerPosition } from '../utils/chordDiagram'
import { computed } from 'vue'

const size = 28.8

const props = defineProps({
  string: {
    type: Number,
    required: true,
  },
  fret: {
    type: Number,
    required: true,
  },
  hasNut: {
    type: Boolean,
    default: false,
  }
})

const position = computed(() => {
  return getFingerPosition(props.string, props.fret, props.hasNut)
})
</script>

<template>
  <g>
    <circle 
      :id="`finger${string}`" 
      r="21.36" 
      :cx="position.x" 
      :cy="position.y" 
      class="finger" 
    />
  </g>
</template>

<style scoped>
.finger {
  fill: #000000;
  stroke-width: 0;
  stroke:#000000;
}
</style>
