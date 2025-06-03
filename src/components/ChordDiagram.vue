<script setup lang="ts">
import { getFretY } from '../utils/chordDiagram'
import ChordDiagramFretLabel from './ChordDiagramFretLabel.vue'
import ChordDiagramString from './ChordDiagramString.vue'
import ChordDiagramNoteIndicator from './ChordDiagramNoteIndicator.vue'
import { useChordDiagram } from '../composables/useChordDiagram'
import { ref } from 'vue'

const diagramConfig = useChordDiagram()

const input = ref(null)
const chordName = ref('C')
</script>

<template>
  <input 
    ref="input"
    class="hidden" 
    type="text" 
    v-model="chordName"
  />

  <div class="w-200px m-auto border-1 border-black rounded">

    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      version="1.1" 
      preserveAspectRatio="xMidYMid meet" 
      viewBox="0 0 400 616.4869647216797"
    >

      <!-- autoscale text -->
      <g
        @click="() => input.focus()"
        class="cursor-text"
      >
        <text 
          x="200" 
          y="-0.38782501220703125" 
          text-anchor="middle" 
          class="title active "
        >
          <!-- TODO: have to get real fancy to get element bounding to show blinking cursor -->
          <tspan dy="208" x="200">
            {{ chordName }}
          </tspan>
        </text>
      </g>


      <line v-if="diagramConfig.hasNut" x1="78.25" y1="294.3263130187988" x2="321.75" y2="294.3263130187988" class="nut" />
      <line v-else x1="78.25" y1="291.130313873291" x2="321.75" y2="291.130313873291" class="fret" />

      <ChordDiagramFretLabel 
        v-if="diagramConfig.lowestFret > 1"
        :lowestFret="diagramConfig.lowestFret" 
      />

      <!-- frets -->
      <line x1="80" :y1="getFretY(1, diagramConfig.hasNut)" x2="320" :y2="getFretY(1, diagramConfig.hasNut)" class="fret" />
      <line x1="80" :y1="getFretY(2, diagramConfig.hasNut)" x2="320" :y2="getFretY(2, diagramConfig.hasNut)" class="fret" />
      <line x1="80" :y1="getFretY(3, diagramConfig.hasNut)" x2="320" :y2="getFretY(3, diagramConfig.hasNut)" class="fret" />
      <line x1="80" :y1="getFretY(4, diagramConfig.hasNut)" x2="320" :y2="getFretY(4, diagramConfig.hasNut)" class="fret" />
      <line x1="80" :y1="getFretY(5, diagramConfig.hasNut)" x2="320" :y2="getFretY(5, diagramConfig.hasNut)" class="fret" />

      <template
        v-for="string in [1, 2, 3, 4, 5, 6]"
      >
        <ChordDiagramString 
          :string="string" 
          :hasNut="diagramConfig.hasNut"
        />
        <ChordDiagramNoteIndicator 
          :string="string" 
        />
      </template>


    </svg>

  </div>

</template>

<style scoped>
.title {
  font-family: Arial, Helvetica, sans-serif;
  font-weight: bold;
  font-size: 160px;
  fill: #000000;

  /* &.active:after {
    content: " ";
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    stroke: #000000;
    border: 150px solid #000000;
  } */
  &.active {
    /* font-size: 160px;
    tspan {
      fill: #F00;
    } */
  }
}

.nut {
  stroke: #000000;
  stroke-width: 10;
}

.fret {
  stroke: #000000;
  stroke-width: 3.5;
}
</style>