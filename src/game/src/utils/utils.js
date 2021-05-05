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


export function getCoordByCasilla (casilla,i) {
  let coord={x:0,y:0}
  const offset=7
  switch (casilla) {
    case 0: coord.x=222.5 ;coord.y=4.6875+offset*i; break
    case 1: coord.x=284.5 ;coord.y=11.6875+offset*i; break
    case 2: coord.x=344.5 ;coord.y=23.6875+offset*i; break
    case 3: coord.x=401.5 ;coord.y=57.6875+offset*i; break

    case 10: coord.x=435.5;coord.y=111.6875+offset*i; break
    case 11: coord.x=449.5;coord.y=166.6875+offset*i; break
    case 12: coord.x=454.5;coord.y=220.6875+offset*i; break
    case 13: coord.x=451.5;coord.y=278.6875+offset*i; break

    case 20: coord.x=436.5;coord.y= 332.6875+offset*i; break
    case 21: coord.x=404.5 ;coord.y=378.6875+offset*i; break
    case 22: coord.x=343.5 ;coord.y=428.6875+offset*i; break
    case 23: coord.x=287.5;coord.y= 448.6875+offset*i; break

    case 30: coord.x=229.5;coord.y= 450.6875+offset*i; break
    case 31: coord.x=175.5 ;coord.y=443.6875+offset*i; break
    case 32: coord.x=124.5;coord.y= 423.6875+offset*i; break
    case 33: coord.x=82.5 ;coord.y=385.6875+offset*i; break

    case 40: coord.x=38.5 ;coord.y=341.6875+offset*i; break
    case 41: coord.x=15.5 ;coord.y=286.6875+offset*i; break
    case 42: coord.x=5.5 ;coord.y=223.6875+offset*i; break
    case 43: coord.x=15.5 ;coord.y=167.6875+offset*i; break

    case 50: coord.x=49.5 ;coord.y=108.6875+offset*i; break
    case 51: coord.x=82.5 ;coord.y=67.6875+offset*i; break
    case 52: coord.x=118.5 ;coord.y=38.6875+offset*i; break
    case 53: coord.x=169.5 ;coord.y=13.6875+offset*i; break
      //radio 0
    case 61: coord.x=230.5 ;coord.y=62.6875+offset*i; break
    case 62: coord.x=230.5 ;coord.y=113.6875+offset*i; break
    case 63: coord.x=231.5;coord.y= 161.6875+offset*i; break
      //radio 1

    case 71: coord.x=377.5 ;coord.y=145.6875+offset*i; break
    case 72: coord.x=330.5 ;coord.y=170.6875+offset*i; break
    case 73: coord.x=293.5 ;coord.y=194.6875+offset*i; break
      //radio 2
    case 81: coord.x=390.5 ;coord.y=300.6875+offset*i; break
    case 82: coord.x=343.5 ;coord.y=277.6875+offset*i; break
    case 83: coord.x=310.5 ;coord.y=259.6875+offset*i; break
      //radio 3
    case 91: coord.x=232.5 ;coord.y=392.6875+offset*i; break
    case 92: coord.x=236.5 ;coord.y=340.6875+offset*i; break
    case 93: coord.x=235.5 ;coord.y=309.6875+offset*i; break
      //radio 4
    case 101: coord.x=92.5 ;coord.y=319.6875+offset*i; break
    case 102: coord.x=135.5 ;coord.y=293.6875+offset*i; break
    case 103: coord.x=179.5 ;coord.y=267.6875+offset*i; break
      //radio 5
    case 111: coord.x=94.5 ;coord.y=145.6875+offset*i; break
    case 112: coord.x=136.5 ;coord.y=169.6875+offset*i; break
    case 113: coord.x=179.5;coord.y= 195.6875+offset*i; break
  }
  return coord


}