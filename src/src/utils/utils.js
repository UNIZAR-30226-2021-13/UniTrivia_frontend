import tinycolor from 'tinycolor2' // TODO: Make this smaller?

export function produceRgbShades (r, g, b, amount) {
  let shades = []

  const hsl = tinycolor(`rgb(${r}, ${g}, ${b})`).toHsl()

  for (let i = 9; i > 1; i -= 8 / amount) { // Decrements from 9 - 1; i being what luminosity (hsl.l) is multiplied by.
    hsl.l = 0.1 * i
    shades.push(tinycolor(hsl).toRgb())
  }

  return shades
}

export function colourToRgbObj (colour) { // TODO: Note which colours tinycolor() can take; i.e. hex / rgb strings, objects, etc.
  return tinycolor(colour).toRgb()
}

export function calculateBounds (min, max) { // i.e. min & max pixels away from the center of the canvas.
  return {
    inside: (cursorPosFromCenter) => { // our relative mouse-position is passed through here to check.
      return cursorPosFromCenter >= min && cursorPosFromCenter <= max
    }
  }
}

export function convertObjToString (obj) {
  return tinycolor(obj).toRgbString()
}

// Method is helpful for generating a radius representative of the stroke + taking into account lineWidth.
export function getEffectiveRadius (trueRadius, lineWidth) {
  return trueRadius - lineWidth / 2
}

// Method is helpful for generating a radius representative of the stroke + taking into account lineWidth.
export function getCasillaNumber (r, g, b) {
  let casilla;
  if (r === 59 && g === 56 && b === 135) {
    casilla = 1
  } else if (r === 255 && g === 255 && b === 255) {
    casilla = 2
  } else if (r === 0 && g === 136 && b === 19) {
    casilla = 3
  } else if (r === 0 && g === 145 && b === 226) {
    casilla = 4
  } else if (r === 255 && g === 100 && b === 0) {
    casilla = 5
  } else if (r === 255 && g === 255 && b === 254) {
    casilla = 6
  } else if (r === 236 && g === 215 && b === 0) {
    casilla = 7
  } else if (r === 0 && g === 136 && b === 18) {
    casilla = 8
  } else if (r === 0 && g === 145 && b === 225) {
    casilla = 9
  } else if (r === 255 && g === 255 && b === 253) {
    casilla = 10
  } else if (r === 255 && g === 100 && b === 1) {
    casilla = 11
  } else if (r === 0 && g === 145 && b === 224) {
    casilla = 12
  } else if (r === 0 && g === 136 && b === 17) {
    casilla = 13
  } else if (r === 255 && g === 255 && b === 252) {
    casilla = 14
  } else if (r === 236 && g === 215 && b === 1) {
    casilla = 15
  } else if (r === 59 && g === 56 && b === 134) {
    casilla = 16
  } else if (r === 255 && g === 0 && b === 235) {//
    casilla = 17
  } else if (r === 255 && g === 255 && b === 251) {
    casilla = 18
  } else if (r === 255 && g === 0 && b === 234) {
    casilla = 19
  } else if (r === 59 && g === 56 && b === 133) {
    casilla = 20
  } else if (r === 236 && g === 215 && b === 2) {
    casilla = 21
  } else if (r === 255 && g === 255 && b === 250) {
    casilla = 22
  } else if (r === 255 && g === 0 && b === 233) {
    casilla = 23
  } else if (r === 255 && g === 100 && b === 2) {
    casilla = 24
  }
  return casilla
}
