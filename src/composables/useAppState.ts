import { reactive, readonly, ref, Ref, computed } from 'vue'
import { getNoteFromNoteLabelAndSemitones } from '../utils/notes'

const selectedFrets = reactive({
  1: undefined,
  2: undefined,
  3: undefined,
  4: undefined,
  5: undefined,
  6: undefined,
})

const tuning: Ref<string[]> = ref([
  // 'E2',
  'D3',
  'A3',
  'D4',
  'G4',
  'A4',
  'D5',
  // 'B3',
  // 'E4'
])

const selectedNotes = computed(() => {
  const notes = {}
  for (const string in selectedFrets) {
    const fret = selectedFrets[string]
    if (fret !== undefined) {
      notes[string] = getNoteFromNoteLabelAndSemitones(tuning.value[string - 1], fret)
    }
  }
  return notes
})

function setSelectedFret(string: number, fret: number | undefined) {
  selectedFrets[string] = fret
}

function getSelectedFret(string: number) {
  return selectedFrets[string]
}

function getSelectedNote(string: number) {
  return selectedNotes.value[string]
}

export function useAppState() {
  return { 
    selectedFrets: readonly(selectedFrets), 
    setSelectedFret, 
    getSelectedFret, 
    getSelectedNote,
    tuning,
    selectedNotes, 
  }
}