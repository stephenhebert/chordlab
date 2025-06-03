<script setup lang="ts">
import { getOpenNotePosition } from '../utils/chordDiagram'
import { computed } from 'vue'

const props = defineProps({
  string: {
    type: Number,
    required: true,
  }
})

const size = 28.8


const position = computed(() => {
  return getOpenNotePosition(props.string)
})
</script>

<template>
  <g>
    <circle
      :id="`o${string}`"
      :cx="position.cx"
      :cy="position.cy"
      :r="size / 2"
      class="o"
    />
  </g>
</template>

<style scoped>
.o {
  stroke: #000000;
  stroke-width: 3.5;
  fill: none;
}
</style>