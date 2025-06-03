<script setup lang="ts">
import { 
  getFretLine,
  getEdgeLine,
  getStringLine
} from '../utils/fretboard'
import { getNoteFromNoteLabelAndSemitones } from '../utils/notes'

import FretboardInputNote from './FretboardInputNote.vue'
import FretboardInputInlay from './FretboardInputInlay.vue'
import FretboardInputX from './FretboardInputX.vue'

defineProps<{
  tuning: string[]
}>()
</script>

<template>

  <svg 
    version="1.1" 
    viewBox="0 0 45.4263 13.2672" 
    xmlns="http://www.w3.org/2000/svg"
  >

    <g id="underlay">
      <path id="nut" class="nut" :d="getFretLine(0)" />
      <g id="frets">
        <path id="fret1" class="fret" :d="getFretLine(1)" />
        <path id="fret2" class="fret" :d="getFretLine(2)" />
        <path id="fret3" class="fret" :d="getFretLine(3)" />
        <path id="fret4" class="fret" :d="getFretLine(4)" />
        <path id="fret5" class="fret" :d="getFretLine(5)" />
        <path id="fret6" class="fret" :d="getFretLine(6)" />
        <path id="fret7" class="fret" :d="getFretLine(7)" />
        <path id="fret8" class="fret" :d="getFretLine(8)" />
        <path id="fret9" class="fret" :d="getFretLine(9)" />
        <path id="fret10" class="fret" :d="getFretLine(10)" />
        <path id="fret11" class="fret" :d="getFretLine(11)" />
        <path id="fret12" class="fret" :d="getFretLine(12)" />
        <path id="fret13" class="fret" :d="getFretLine(13)" />
        <path id="fret14" class="fret" :d="getFretLine(14)" />
        <path id="fret15" class="fret" :d="getFretLine(15)" />
        <path id="fret16" class="fret" :d="getFretLine(16)" />
        <path id="fret17" class="fret" :d="getFretLine(17)" />
        <path id="fret18" class="fret" :d="getFretLine(18)" />
        <path id="fret19" class="fret" :d="getFretLine(19)" />
        <path id="fret20" class="fret" :d="getFretLine(20)" />
      </g>
      <g id="edges">
        <path id="top" class="edge" :d="getEdgeLine('top')" />
        <path id="bottom" class="edge" :d="getEdgeLine('bottom')" />
      </g>
      <g id="strings">
        <path id="string6" class="string" :d="getStringLine(6)" />
        <path id="string5" class="string" :d="getStringLine(5)" />
        <path id="string4" class="string" :d="getStringLine(4)" />
        <path id="string3" class="string" :d="getStringLine(3)" />
        <path id="string2" class="string" :d="getStringLine(2)" />
        <path id="string1" class="string" :d="getStringLine(1)" />
      </g>
      <g id="inlays">
        <FretboardInputInlay fret="3" />
        <FretboardInputInlay fret="5" />
        <FretboardInputInlay fret="7" />
        <FretboardInputInlay fret="9" />
        <FretboardInputInlay fret="12" placement="top" />
        <FretboardInputInlay fret="12" placement="bottom" />
        <FretboardInputInlay fret="15" />
        <FretboardInputInlay fret="17" />
        <FretboardInputInlay fret="19" />
      </g>
    </g>
    <g id="overlay">
      <g id="notes">



        <template v-for="string in [1, 2, 3, 4, 5, 6]">
          <g :id="`string-${string}`">
            <FretboardInputX :string="string" />
            <FretboardInputNote 
              v-for="fret in [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]"
              :string="string" 
              :fret="fret" 
              :key="`${string}-${fret}`" 
              :note="getNoteFromNoteLabelAndSemitones(tuning[string - 1], fret)" 
            />
          </g>
        </template>
      </g>
    </g>

  </svg>

</template>

<style scoped>
.string {
  stroke: #8c8c8c;
  stroke-width: .16546;
}

.edge {
  stroke: #8c8c8c;
  stroke-width: .16546;
}

.fret {
  stroke: #8c8c8c;
  stroke-width: .16546;
}

.nut {
  stroke: #8c8c8c;
  stroke-width: .4;
}

.note {
  fill: rgb(255, 255, 255);
  stroke: rgb(0, 0, 0);
  stroke-width: 50%;
}
</style>