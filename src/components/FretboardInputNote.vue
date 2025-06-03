<script setup lang="ts">
import { 
  getIntersectionOfStringAndFret
} from '../utils/fretboard'
import { computed } from 'vue'
import { getNoteColor } from '../utils/notes'
import { playNote } from '../utils/audio'
import { useAppState } from '../composables/useAppState'

const { getSelectedFret, setSelectedFret } = useAppState()

const props = defineProps<{
  string: number
  fret: number
  note: string
}>()

const { x, y } = getIntersectionOfStringAndFret(props.string, props.fret)

const isActive = computed(() => {
  return getSelectedFret(props.string) === props.fret
})

const select = () => {
  setSelectedFret(props.string, props.fret)
  playNote(props.note)
}
</script>

<template>
  <g
    :class="{ active: isActive }"
    @click="select"
  >

    <circle 
      :id="`note-${string}-${fret}`" 
      :cx="x" 
      :cy="y" 
      r=".6" 
      class="note" 
      :fill="isActive ? 'black' : getNoteColor(note)"
    />
    <text 
      :x="x" 
      :y="y+.03" 
      class="note-text select-none" 
      text-anchor="middle" 
      dominant-baseline="middle"
      :fill="isActive ? 'white' : 'black'"

    >
      {{ note.substring(0, note.length - 1) }}
    </text>
  </g>
</template>

<style scoped>
g {
  cursor: pointer;
  transition: transform 0.2s;
  transform-box: border-box;
  transform-origin: center;

  &:hover {
    transform: scale(1.2);
  }
  &.active {
    transform: scale(1.2);
  }
}

circle.note {
  stroke: black;
  stroke-width: 0.04;
}

.note-text {
  font-family: "Encode Sans Semi Condensed", sans-serif;
  /* font-family:Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif; */
  font-size: 0.5px;
}
</style>