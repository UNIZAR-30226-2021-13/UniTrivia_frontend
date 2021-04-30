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
    casilla = 0
  } else if (r === 255 && g === 255 && b === 255) {
    casilla = 1
  } else if (r === 0 && g === 136 && b === 19) {
    casilla = 2
  } else if (r === 0 && g === 145 && b === 226) {
    casilla = 3
  } else if (r === 255 && g === 100 && b === 0) {
    casilla = 10
  } else if (r === 255 && g === 255 && b === 254) {
    casilla = 11
  } else if (r === 236 && g === 215 && b === 0) {
    casilla = 12
  } else if (r === 0 && g === 136 && b === 18) {
    casilla = 13
  } else if (r === 0 && g === 145 && b === 225) {
    casilla = 20
  } else if (r === 255 && g === 255 && b === 253) {
    casilla = 21
  } else if (r === 255 && g === 100 && b === 1) {
    casilla = 22
  } else if (r === 0 && g === 145 && b === 224) {
    casilla = 23
  } else if (r === 0 && g === 136 && b === 17) {
    casilla = 30
  } else if (r === 255 && g === 255 && b === 252) {
    casilla = 31
  } else if (r === 236 && g === 215 && b === 1) {
    casilla = 32
  } else if (r === 59 && g === 56 && b === 134) {
    casilla = 33
  } else if (r === 255 && g === 0 && b === 235) {//
    casilla = 40
  } else if (r === 255 && g === 255 && b === 251) {
    casilla = 41
  } else if (r === 255 && g === 0 && b === 234) {
    casilla = 42
  } else if (r === 59 && g === 56 && b === 133) {
    casilla = 43
  } else if (r === 236 && g === 215 && b === 2) {
    casilla = 50
  } else if (r === 255 && g === 255 && b === 250) {
    casilla = 51
  } else if (r === 255 && g === 0 && b === 233) {
    casilla = 52
  } else if (r === 255 && g === 100 && b === 2) {
    casilla = 53
  }
  else if (r === 255 && g === 100 && b === 3) {//radio 0
    casilla = 63
  } else if (r === 236 && g === 215 && b === 3) {
    casilla = 62
  } else if (r === 0 && g === 145 && b === 223) {
    casilla = 61
  }
  else if (r === 255 && g === 0 && b === 237) {//radio 1
    casilla = 73
  } else if (r === 0 && g === 136 && b === 16) {
    casilla = 72
  } else if (r === 0 && g === 145 && b === 221) {
    casilla = 71
  }
  else if (r === 59 && g === 56 && b === 132) {//radio 2
    casilla = 83
  } else if (r === 255 && g === 0 && b === 238) {
    casilla = 82
  } else if (r === 255 && g === 100 && b === 4) {
    casilla = 81
  }
  else if (r === 236 && g === 215 && b === 4) {//radio 3
    casilla = 93
  } else if (r === 255 && g === 0 && b === 236) {
    casilla = 92
  } else if (r === 0 && g === 145 && b === 222) {
    casilla = 91
  }
  else if (r === 255 && g === 100 && b === 5) {//radio 4
    casilla = 103
  } else if (r === 59 && g === 56 && b === 131) {
    casilla = 102
  } else if (r === 0 && g === 136 && b === 15) {
    casilla = 101
  }
  else if (r === 0 && g === 136 && b === 14) {//radio 5
    casilla = 113
  } else if (r === 59 && g === 56 && b === 130) {
    casilla = 112
  } else if (r === 255 && g === 0 && b === 239) {
    casilla = 111
  }
  return casilla
}
