<script setup lang="ts">
import FretboardInput from './components/FretboardInput.vue'
import ChordDiagram from './components/ChordDiagram.vue'
import { useAppState } from './composables/useAppState'

const { 
  selectedNotes, 
  tuning,
  selectedFrets, 
} = useAppState()
</script>

<template>
  <div>

    <div class="mx-8 mt-8">
      <h1 class="text-xl">Chord<b>Lab</b></h1>
    </div>

    <div class="mx-0">
      <div class="overflow-x-auto max-w-full overscroll-none">
        <div class="min-w-1200px">
          <FretboardInput :tuning="tuning" />
        </div>
      </div>
    </div>
    <ChordDiagram />

  </div>

</template>

<style>
</style>