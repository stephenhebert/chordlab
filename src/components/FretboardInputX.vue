<script setup lang="ts">
import { getXPosition } from '../utils/fretboard'
import { computed, useId } from 'vue'
import { useAppState } from '../composables/useAppState'

const props = defineProps({
  string: {
    type: Number,
    required: true
  },
})

const { getSelectedFret, setSelectedFret } = useAppState()

const position = computed(() => getXPosition(props.string))
const length = .5

const id = useId()

const isActive = computed(() => {
  return getSelectedFret(props.string) === undefined
})

const select = () => {
  setSelectedFret(props.string, undefined)
}
</script>

<template>
  <g 
    :id="`x${id}`"
    :class="{ active: isActive }"
    class="x"
    @click="select"
  >
    <line 
      :id="`x${id}-1`"
      :x1="position.x - (length / 2)" 
      :y1="position.y - (length / 2)" 
      :x2="position.x + (length / 2)" 
      :y2="position.y + (length / 2)"
    />
    <line 
      :id="`x${id}-2`"
      :x1="position.x + (length / 2)" 
      :y1="position.y - (length / 2)" 
      :x2="position.x - (length / 2)" 
      :y2="position.y + (length / 2)"
    />
  </g>

</template>

<style scoped>
g.x {
  cursor: pointer;

  transition: transform 0.2s;
  transform-box: border-box;
  transform-origin: center;

  line {
    stroke: #8c8c8c;
    stroke-width: .2;
  }

  &:hover {
    transform: scale(1.2);

    line {
      stroke: #000;
    }
  }

  &.active {
    transform: scale(1.2);

    line {
      stroke: #000;
    }
  }


}
</style>