<script setup lang="ts">
import { getInlayPosition } from '../utils/fretboard'
import { computed, useId } from 'vue'

const props = defineProps({
  fret: {
    type: Number,
    required: true
  },
  placement: {
    type: String,
    default: 'center'
  },
})

const id = useId()

const position = computed(() => getInlayPosition(props.fret, props.placement))
</script>

<template>
  <circle 
    :id="`inlay${id}`"
    class="inlay" 
    :cx="position.x" 
    :cy="position.y" 
    r=".28808" 
  />
</template>

<style scoped>
.inlay {
  fill: #8c8c8c;
}
</style>