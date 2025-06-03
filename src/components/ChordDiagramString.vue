<script setup lang="ts">
import { getStringPosition } from '../utils/chordDiagram'
import { computed } from 'vue'
const props = defineProps<{
  string: number,
  hasNut: boolean
}>()
const position = computed(() => getStringPosition(props.string, props.hasNut))
</script>

<template>
  <line 
    :x1="position.x" 
    :y1="position.y1" 
    :x2="position.x" 
    :y2="position.y2" 
    class="string" 
  />
</template>

<style scoped>
.string, .fret {
  stroke: #000000;
  stroke-width: 3.5;
}
</style>
