<script setup lang="ts">
import { useChordDiagram } from '../composables/useChordDiagram'
import { computed } from 'vue'
import ChordDiagramStringX from './ChordDiagramStringX.vue'
import ChordDiagramStringOpen from './ChordDiagramStringOpen.vue'
import ChordDiagramStringFinger from './ChordDiagramStringFinger.vue'

const props = defineProps<{
  string: number
}>()

const diagramConfig = useChordDiagram()
const fret = computed(() => {
  return diagramConfig.value?.relativeFrets?.[props.string]
})
</script>

<template>
  <ChordDiagramStringX 
    v-if="fret === undefined"
    :string="string" 
  />
  <ChordDiagramStringOpen 
    v-else-if="fret === 0"
    :string="string" 
  />
  <ChordDiagramStringFinger 
    v-else
    :string="string" 
    :fret="fret" 
    :hasNut="diagramConfig.hasNut"
  />

</template>
