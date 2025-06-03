const width = 400
const height = 616.4869647216797
const nutOffset = 6.4459991455078125

// (x1 + x2) / 2
const stringX = {
  1: 80,
  2: 128,
  3: 176,
  4: 224,
  5: 272,
  6: 320,
}

const stringStartY = 292.880313873291
const stringEndY = 570.630313873291

const fingerY = {
  1: 320.480313873291,
  2: 375.68031387329097,
  3: 430.880313873291,
  4: 486.08031387329095,
  5: 541.280313873291
}

const fretY = {
  1: 348.080313873291,
  2: 403.280313873291,
  3: 458.48031387329104,
  4: 513.680313873291,
  5: 568.880313873291,
}

function getOpenNotePosition(string: number) {
  // const length = 14.4
  const cy = 265.3263130187988
  const cx = stringX[string]

  return {
    cx,
    cy
  }
}

function getFingerPosition(string: number, fret: number, hasNut: boolean) {
  const x = stringX[string]
  const validFret = fret > 5 ? 5 : fret < 1 ? 1 : fret
  const y = fingerY[validFret] + (hasNut ? nutOffset : 0)
  return {
    x,
    y
  }
}

function getFretY(fret: number, hasNut: boolean) {
  return fretY[fret] + (hasNut ? nutOffset : 0)
}

function getStringPosition(string: number, hasNut: boolean) {
  const x = stringX[string]
  return {
    x,
    y1: stringStartY + (hasNut ? nutOffset : 0),
    y2: stringEndY + (hasNut ? nutOffset : 0),
  }
}

export {
  getOpenNotePosition,
  getFingerPosition,
  getFretY,
  getStringPosition,
}