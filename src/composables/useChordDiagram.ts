import { useAppState } from "./useAppState"
import { computed } from 'vue'

export function useChordDiagram() {
  const { selectedFrets } = useAppState()

  const bounds = computed(() => {
    let min = Infinity
    let max = -Infinity
    for (const string in selectedFrets) {
      const fret = selectedFrets[string]
      if (fret !== undefined && fret > 0 && fret < min) {
        min = fret
      }
      if (fret !== undefined && fret > 0 && fret > max) {
        max = fret
      }
    }
    if (min === Infinity) {
      min = 0
    }
    if (max === -Infinity) {
      max = 0
    }
    return { min, max }
  })

  const lowestFret = computed(() => {
    if (bounds.value.max <= 5) return 0
    return bounds.value.min
  })

  const relativeFrets = computed(() => {
    const relativeFrets = {}
    for (const string in selectedFrets) {
      const fret = selectedFrets[string]
      let lowestFretValue
      if (fret === undefined || fret === 0 || lowestFret.value <= 1) {
        lowestFretValue = fret
      }
      else {
        lowestFretValue = fret - lowestFret.value + 1
      }
      relativeFrets[string] = lowestFretValue > 5 ? undefined : lowestFretValue
    }
    return relativeFrets
  })

  const diagramConfig = computed(() => ({
    lowestFret: lowestFret.value,
    hasNut: lowestFret.value <= 1,
    relativeFrets: relativeFrets.value,
  }))

  return diagramConfig
}