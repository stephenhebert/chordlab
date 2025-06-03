const svgWidth = 45.4263;
const svgHeight = 13.2672;
const svgOriginalHeight = 9.2672
const svgLeftMargin = 1;
const svgRightMargin = 0.3;
const svgTopMargin = 0.2;
const svgBottomMargin = 1;

const xScale = svgWidth - svgLeftMargin - svgRightMargin
const yScale = svgHeight - svgTopMargin - svgBottomMargin

// const startX = 0.2517;
// const endX = 43.7617;
const startX = 0 + svgLeftMargin
const endX = svgWidth - svgRightMargin
const startY = 0 + svgTopMargin
const endY = svgHeight - svgBottomMargin
const cy = startY + ( (endY - startY) / 2 )

const stringOffsetX = 1.5

const scaleX = (x: number) => x * (xScale / svgWidth)
const scaleY = (y: number) => y * (svgHeight / svgOriginalHeight) * (yScale / svgHeight)

const getX = (x: number) => stringOffsetX + startX + scaleX(x)
const getY = (y: number) => startY + scaleY(y)



const fretLines = [
  { x: getX(0), length: scaleY(7.5) },
  { x: getX(3.5581), length: scaleY(7) },
  { x: getX(6.9165), length: scaleY(7.2) },
  { x: getX(10.0863), length: scaleY(7.2) },
  { x: getX(13.0783), length: scaleY(7.5) },
  { x: getX(15.9033), length: scaleY(7.6) },
  { x: getX(18.5683), length: scaleY(7.8) },
  { x: getX(21.0843), length: scaleY(8) },
  { x: getX(23.4593), length: scaleY(8) },
  { x: getX(25.7013), length: scaleY(8.2) },
  { x: getX(27.8163), length: scaleY(8.2) },
  { x: getX(29.8133), length: scaleY(8.2) },
  { x: getX(31.6993), length: scaleY(8.4) },
  { x: getX(33.4783), length: scaleY(8.5) },
  { x: getX(35.1573), length: scaleY(8.5818) },
  { x: getX(36.7413), length: scaleY(8.6) },
  { x: getX(38.2373), length: scaleY(8.7) },
  { x: getX(39.6503), length: scaleY(8.8) },
  { x: getX(40.9823), length: scaleY(8.9) },
  { x: getX(42.2403), length: scaleY(9) },
  { x: getX(43.4263), length: scaleY(9.1) },

]

const edgeLines = {
  // top: { y1: 1.2104, dy: -1.1277 },
  // bottom: { y1: 8.0568, dy: 1.1277 },
  top: { y1: getY(1.2104), dy: scaleY(-1.1277) },
  bottom: { y1: getY(8.0568), dy: scaleY(1.1277) },
}

const stringLines = [
  { y1: getY(7.646), dy: scaleY(1.1277) },
  { y1: getY(6.4411), dy: scaleY(0.67664) },
  { y1: getY(5.2361), dy: scaleY(0.22552) },
  { y1: getY(4.0311), dy: scaleY(-0.22555) },
  { y1: getY(2.8261), dy: scaleY(-0.67664) },
  { y1: getY(1.6212), dy: scaleY(-1.1277) },
]

function svgVerticalLineFromCenter(cx: number, length: number) {
  const y1 = cy - length / 2
  const y2 = cy + length / 2
  return `M${cx},${y1}V${y2}`
}

function svgHorizontalLine(y1: number, dy: number) {
  const dx = endX - startX - (stringOffsetX) - 0.41
  return `m${startX + stringOffsetX} ${y1} ${dx} ${dy}`
}

function getStringLine(string: number) {
  const { y1, dy } = stringLines[string - 1]
  return svgHorizontalLine(y1, dy)
}

function getEdgeLine(edge: 'top' | 'bottom') {
  const { y1, dy } = edgeLines[edge]
  return svgHorizontalLine(y1, dy)
}

function getFretLine(fret: number) {
  // TODO: calculate length based on fret position - similar to intersections with strings but with edges
  // TODO: incorporate x offset and factor
  const { x, length } = fretLines[fret]
  return svgVerticalLineFromCenter(x, length)
}

function getXPosition(string: number) {
  const x = 1
  const weight = 1
  const stringLine = stringLines[string - 1]
  const y = cy - ( (cy - stringLine.y1) * weight )
  return { x, y }
}

function getIntersectionOfStringAndFret(string: number, fret: number) {
  const { x } = fretLines[fret]
  const ratio = (x - startX) / endX
  const stringLine = stringLines[string - 1]
  const y = stringLine.y1 + stringLine.dy * ratio
  return { x, y }
}

function getInlayPosition(fret: number, placement: 'top' | 'bottom' | 'center') {
  const fretBefore = fret - 1
  const fretAfter = fret

  const x1 = fretLines[fretBefore].x
  const x2 = fretLines[fretAfter].x
  const x = x1 + (x2 - x1) / 2
  let y1, y2, y3, y4
  if (placement === 'top') {
    y1 = getIntersectionOfStringAndFret(2, fretBefore).y
    y2 = getIntersectionOfStringAndFret(3, fretBefore).y
    y3 = getIntersectionOfStringAndFret(2, fretAfter).y
    y4 = getIntersectionOfStringAndFret(3, fretAfter).y
  } else if (placement === 'bottom') {
    y1 = getIntersectionOfStringAndFret(4, fretBefore).y
    y2 = getIntersectionOfStringAndFret(5, fretBefore).y
    y3 = getIntersectionOfStringAndFret(4, fretAfter).y
    y4 = getIntersectionOfStringAndFret(5, fretAfter).y
  } else {
    y1 = cy
    y2 = cy
    y3 = cy
    y4 = cy
  }

  const y = ( ( (y1 + y2) / 2 ) + ( (y3 + y4) / 2 ) ) / 2
  return { x, y }
}

export {
  // fretLines,
  // stringLines,
  getStringLine,
  getFretLine,
  getEdgeLine,
  getIntersectionOfStringAndFret,
  getInlayPosition,
  getXPosition,
}