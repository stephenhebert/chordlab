<script setup lang="ts">
import { getOpenNotePosition } from '../utils/chordDiagram'
import { computed } from 'vue'

const size = 28.8

const props = defineProps({
  string: {
    type: Number,
    required: true,
  }
})

const position = computed(() => {
  return getOpenNotePosition(props.string)
})
</script>

<template>
  <g>
    <line
      :id="`x${string}-1`"
      :x1="position.cx - (size / 2)"
      :y1="position.cy - (size / 2)"
      :x2="position.cx + (size / 2)"
      :y2="position.cy + (size / 2)"
      class="x"
    />
    <line
      :id="`x${string}-2`"
      :x1="position.cx + (size / 2)"
      :y1="position.cy - (size / 2)"
      :x2="position.cx - (size / 2)"
      :y2="position.cy + (size / 2)"
      class="x"
    />
  </g>
</template>

<style scoped>
.x {
  stroke: #000000;
  stroke-width: 3.5;
  fill: none;
}
</style>