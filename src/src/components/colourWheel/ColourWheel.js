// NOTES:
// -- Array-destructuring assignment won't work w vanilla ie11; needs babel-polyfill lol

import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Utils:
import {
  calculateBounds,
  colourToRgbObj,
  convertObjToString,
  getCasillaNumber,
  getEffectiveRadius,
  produceRgbShades
} from '../../utils/utils'
import hexStrings from '../../utils/hexStrings'

// Global-vars:
const fullCircle = 2 * Math.PI
const quarterCircle = fullCircle / 4

class ColourWheel extends Component {
  constructor () {
    super()

    this.state = {
      rgb: null,
      innerWheelOpen: false,
      centerCircleOpen: false,
      numPlayers: 0,
      positions: [0,0,0,0,0,0]
    }

    // Initialised just before the DOM has loaded; after constructor().
    this.outerWheelBounds = null
    this.innerWheelBounds = null
    this.centerCircleBounds = null

    this.outerWheelRadius = null
    this.innerWheelRadius = null
    this.centerCircleRadius = null
    this.firstSpacerRadius = null
    this.secondSpacerRadius = null

    // Initialised once the DOM has loaded.
    this.canvasEl = null
    this.ctx = null

    // Bindings:
    this.onCanvasHover = this.onCanvasHover.bind(this)
    this.onCanvasClick = this.onCanvasClick.bind(this)
  }

  // MARK - Common:
  getRelativeMousePos (clientX, clientY) {
    const { radius } = this.props

    const canvasPos = this.canvasEl.getBoundingClientRect()
    const h = radius * 2
    const w = radius * 2

    // evtPos relative to our canvas.
    const onCanvas = {
      x: clientX - canvasPos.left,
      y: clientY - canvasPos.top
    }

    // e is our mouse-position relative to the center of the canvasEl; using pythag
    const fromCenter = Math.sqrt(
      (onCanvas.x - w / 2) * (onCanvas.x - w / 2) +
      (onCanvas.y - h / 2) * (onCanvas.y - h / 2)
    )

    // This returns an object in which we have both mouse-pos relative to the canvas, as well as the true-middle.
    return {
      fromCenter,
      onCanvas
    }
  }

  initCanvas () {
    const { radius } = this.props

    const width = radius * 2
    const height = radius * 2

    this.ctx.clearRect(0, 0, width, height)

    this.drawOuterWheel(1)
    this.drawSpacers()
    //this.drawCenterCircle()
    this.drawPlayers()
  }

  // MARK - Life-cycle methods:
  componentWillMount () {
    const { radius, lineWidth, padding } = this.props

    // Setting effective radii:
    this.outerWheelRadius = radius
    this.innerWheelRadius = this.outerWheelRadius - lineWidth - padding
    this.centerCircleRadius = this.innerWheelRadius - lineWidth - padding
    this.firstSpacerRadius = this.outerWheelRadius - lineWidth // NOTE: effectiveRadius will take into account padding as lineWidth.
    this.secondSpacerRadius = this.innerWheelRadius - lineWidth

    // Defining our bounds-objects, exposes a .inside(e) -> boolean method:
    this.outerWheelBounds = calculateBounds(radius - lineWidth, radius)
    this.innerWheelBounds = calculateBounds(
      this.innerWheelRadius - lineWidth,
      this.innerWheelRadius
    )
    this.centerCircleBounds = calculateBounds(0, this.centerCircleRadius)
    this.firstSpacerBounds = calculateBounds(
      this.firstSpacerRadius - padding,
      this.firstSpacerRadius
    )
    this.secondSpacerBounds = calculateBounds(
      this.secondSpacerRadius - padding,
      this.secondSpacerRadius
    )
  }

  componentDidMount () {
    // Giving this context to our parent component.
    this.props.onRef(this)

    // Initialising our canvas & context objs.
    this.canvasEl = document.getElementById('colour-picker')
    this.ctx = this.canvasEl.getContext('2d')

    if (this.props.preset) {
      const rgb = colourToRgbObj(this.props.presetColour)

      this.setState({ rgb }, () => {
        this.drawOuterWheel(1,[12,13])
        //this.drawInnerWheel()
        this.drawCenterCircle()
        this.drawSpacers()
      })
    } else {
      this.drawOuterWheel(1)
      this.drawSpacers()
    }
  }

  componentWillUnmount () {
    this.props.onRef(undefined)
  }

  // MARK - mouse-events:
  onCanvasHover ({ clientX, clientY }) {
    const evt = this.getRelativeMousePos(clientX, clientY)

    // Cases for mouse-location:
    if (this.outerWheelBounds.inside(evt.fromCenter)) {
      this.canvasEl.style.cursor = 'crosshair'
    } else if (
      this.innerWheelBounds.inside(evt.fromCenter) &&
      this.state.innerWheelOpen
    ) {
      this.canvasEl.style.cursor = 'crosshair'
    } else if (
      this.centerCircleBounds.inside(evt.fromCenter) &&
      this.state.centerCircleOpen
    ) {
      // TODO: Have it clear on click?
      this.canvasEl.style.cursor = 'pointer'
    } else {
      this.canvasEl.style.cursor = 'auto'
    }
  }

  onCanvasClick ({ clientX, clientY }) {
    const evt = this.getRelativeMousePos(clientX, clientY)

    // Cases for click-events:
    if (this.outerWheelBounds.inside(evt.fromCenter)) {
      this.outerWheelClicked(evt.onCanvas)
    } else if (
      this.innerWheelBounds.inside(evt.fromCenter) &&
      this.state.innerWheelOpen
    ) {
      this.innerWheelClicked(evt.onCanvas)
    }
  }

  // MARK - Clicks & action methods:
  outerWheelClicked (evtPos) {
    const { radius,colours } = this.props

    // returns an rgba array of the pixel-clicked.
    const rgbaArr = this.ctx.getImageData(evtPos.x, evtPos.y, 1, 1).data
    const [r, g, b] = rgbaArr

    const rgb = { r, g, b }

    // Whether the user wants rgb-strings or rgb objects returned.
    const rgbArg = convertObjToString(rgb) // TODO: Let user set different return values in props; e.g. rbg obj, string, etc.

    this.props.onColourSelected(rgbArg)
    let opa
    console.log(rgbaArr)
    if (r == 255 && g == 255 && b == 255) {
      opa = 0.1
    } else {
      opa = 1
    }

    console.log(getCasillaNumber(r, g, b))
    console.log(colours[7])
    console.log(convertObjToString(colours[7]))
    console.log(evtPos.x)
    this.setState(
      {
        rgb,
        innerWheelOpen: true,
        centerCircleOpen: true
      },
      () => {

        this.drawInnerWheel()
        this.drawOuterWheel(opa)
        this.drawCenterCircle()
        this.drawPosition(evtPos.x, evtPos.y)
      }
    )
  }

  innerWheelClicked (evtPos) {
    const rgbaArr = this.ctx.getImageData(evtPos.x, evtPos.y, 1, 1).data
    const [r, g, b] = rgbaArr

    const rgb = { r, g, b }

    const rgbArg = convertObjToString(rgb)

    this.props.onColourSelected(rgbArg)

    this.setState(
      {
        rgb,
        centerCircleOpen: true
      },
      () => {
        this.drawCenterCircle()
      }
    )
  }

  clear (callback = false) {
    this.setState(
      {
        rgb: '#ffffff',
        innerWheelOpen: false,
        centerCircleOpen: false
      },
      () => {
        // Reset state & re-draw.
        this.initCanvas()
        this.drawCenterCircle()
        if (callback) callback()
      }
    )
  }

  jugada (callback = false) {
    this.setState(
      {
        rgb: '#ffffff',
        innerWheelOpen: false,
        centerCircleOpen: false
      },
      () => {
        // Reset state & re-draw.
        //this.initCanvas()
        this.drawInnerWheel()
        this.drawOuterWheel(1,[1,7])
        this.drawCenterCircle()
        if (callback) callback()
      }
    )

  }

  // MARK - Drawing:
  drawOuterWheel (opa,casillasMarcadas) {
    // TODO: Draw outline; separate method.
    const { radius, colours, lineWidth } = this.props
    const height = radius * 2
    const width = radius * 2

    // This value ensures that the stroke accounts for the lineWidth provided to produce an accurately represented radius.
    const effectiveRadius = getEffectiveRadius(radius, lineWidth)

    // Converting each colour into a relative rgb-object we can iterate through.
    const rgbArr = colours.map((colour) => colourToRgbObj(colour))

    rgbArr.forEach((rgb, i) => {
      this.ctx.beginPath()

      // Creates strokes 1 / rgbArr.length of the circle circumference.
      const startAngle = (fullCircle / rgbArr.length) * i
      const endAngle = (fullCircle / rgbArr.length) * (i + 1)
      this.ctx.arc(
        width / 2,
        height / 2,
        effectiveRadius,
        startAngle + 3,
        endAngle + 3
      )
      this.ctx.lineWidth = lineWidth // This is the width of the innerWheel.
      //this.ctx.fillText('holaas dfa sdf',50+i*5 ,50+i*5);
      // Stroke-style changes based on the shade:
      //this.ctx.strokeText('h',50+i*5 ,50+i*5) ;
      //rgb.r=rgb.r-100;
      if (casillasMarcadas != null) {
        let op = 0.1
        //console.log(casillasMarcadas)
        //console.log(25% 24)
        casillasMarcadas.forEach((val, j) => {
              if (i === (val+6)%24) {
                op = 1
              }

          this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b},${op})`
        })
        if(op!=1){
          this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b},${op})`

        }
      console.log('opacidad= '+op)
      }else{
        this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b},${opa})`

      }
      this.ctx.stroke()
      this.ctx.closePath()


    })
  }

  drawSpacers () {
    if (this.props.spacers) {
      this.drawSpacer(this.firstSpacerRadius)
      //this.drawSpacer(this.secondSpacerRadius)
    }
  }

  drawSpacer (spacerRadius) {
    const {
      radius,
      padding,
      spacers: { colour, shadowColour, shadowBlur }
    } = this.props

    const height = radius * 2
    const width = radius * 2

    const effectiveRadius = getEffectiveRadius(spacerRadius, padding)

    this.ctx.beginPath()

    this.ctx.arc(width / 2, height / 2, effectiveRadius, 0, fullCircle)
    this.ctx.lineWidth = padding

    this.ctx.shadowColor = shadowColour
    this.ctx.shadowBlur = shadowBlur
    this.ctx.strokeStyle = colour
    this.ctx.stroke()
    this.ctx.closePath()

    // To reset our shadowColor for other strokes.
    this.ctx.shadowColor = 'transparent'
  }

  drawRadius () {
    // raf setup.
    const { radius } = this.props
    this.ctx.beginPath()
    let x = [0, 43, 43, 0, -43, -43]
    let y = [-50, -25, -25, 50, 25, 25]
    x.forEach((val, i) => {
      this.ctx.fillRect(
        radius + x[i],
        radius + y[i],
        40, 40
      )
    })
    /*for(var i=1;i<7;i++){
      const startAngle = (fullCircle) * i + quarterCircle;
      const endAngle =
        (fullCircle) * (i + 1) + (1 / 2) * Math.PI;
      /*const fromCenter = Math.sqrt(
        (onCanvas.x - w / 2) * (onCanvas.x - w / 2) +
        (onCanvas.y - h / 2) * (onCanvas.y - h / 2)
      );
      this.ctx.fillRect(
        radius,
        radius-50,
        20,20
      );
    }*/
    this.ctx.stroke()
    this.ctx.closePath()
  }

  drawPosition (x,y) {
    // raf setup.
    this.ctx.beginPath()
    this.ctx.fillRect(x,
      y,
      100,
      100)
    //this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b},${opa})`
    this.ctx.stroke()
    this.ctx.closePath()
  }

  drawInnerWheel (animationPercentage = 0) {
    // raf setup.
    let requestAnimationFrame =
      window.requestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.msRequestAnimationFrame
    window.requestAnimationFrame = requestAnimationFrame

    const {
      rgb: { r, g, b }
    } = this.state
    const { radius, lineWidth, shades, animated } = this.props

    const height = radius * 2
    const width = radius * 2

    const effectiveRadius = getEffectiveRadius(
      this.innerWheelRadius,
      lineWidth
    )

    // Re-initialising canvas.
    this.ctx.clearRect(0, 0, width, height)

    //this.drawOuterWheel(1);
    //this.drawRadius();
    this.drawSpacers()

    const rgbShades = produceRgbShades(r, g, b, shades)

    // Different functions for drawing our inner-wheel of shades.
    function drawShades () {
      rgbShades.forEach((rgb, i) => {
        this.ctx.beginPath()

        const startAngle = (fullCircle / rgbShades.length) * i + quarterCircle
        const endAngle =
          (fullCircle / rgbShades.length) * (i + 1) + (1 / 2) * Math.PI

        this.ctx.arc(
          width / 2,
          height / 2,
          effectiveRadius,
          startAngle,
          endAngle
        )
        this.ctx.lineWidth = lineWidth // This is the width of the innerWheel.

        // Stroke style changes based on the shade:
        this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        this.ctx.stroke()
        this.ctx.closePath()
      })
    }

    function animateShades () {
      rgbShades.forEach((rgb, i) => {
        this.ctx.beginPath()

        const startAngle = (fullCircle / rgbShades.length) * i + quarterCircle
        const endAngle =
          (fullCircle / rgbShades.length) * (i + 1) + (1 / 2) * Math.PI

        this.ctx.arc(
          width / 2,
          height / 2,
          effectiveRadius,
          startAngle,
          endAngle
        )
        this.ctx.lineWidth = lineWidth * animationPercentage // This is the width of the innerWheel.

        // Stroke style changes based on the shade:
        this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
        this.ctx.stroke()
        this.ctx.closePath()
      })

      // TODO: Make this animation speed dynamic.
      animationPercentage += 1 / 10 // i.e. 1 / x frames

      // Essentially re-draws rgbShades.forEach until the animationPercentage reaches 1, i.e. 100%
      if (animationPercentage < 1) requestAnimationFrame(animateShades)
    }

    animateShades = animateShades.bind(this)
    drawShades = drawShades.bind(this)

    if (animated) {
      //animateShades()
    } else {
      // TODO: Refactor into its own func.
      //drawShades()
    }
  }

  drawCenterCircle () {
    const { rgb } = this.state
    const { radius } = this.props

    const height = radius * 2
    const width = radius * 2
    this.ctx.lineWidth = 0

    this.ctx.beginPath()
    this.ctx.arc(
      width / 2,
      height / 2,
      50,
      0,
      2 * Math.PI
    )
    this.ctx.fillStyle = `rgb(${255}, ${255}, ${255})`
    this.ctx.fill()
    this.ctx.lineWidth = 0.1
    this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    this.ctx.stroke()
    this.ctx.closePath()
    this.drawPlayers()
  }

  drawPlayers () {
    const { radius } = this.props

    const height = radius * 2
    const width = radius * 2

    this.ctx.beginPath()

    this.ctx.fillStyle = `rgb(${0}, ${0}, ${0})`
    this.state.numPlayers=3
    for(var i=0;i<this.state.numPlayers;i++){
      this.ctx.fillText(
        'player'+i,
        width / 2,
        height / 2 +i*10
      )
    }



    this.ctx.stroke()
    this.ctx.closePath()
  }

  render () {
    const { radius, dynamicCursor } = this.props

    return dynamicCursor ? (
      <canvas
        id="colour-picker"
        onClick={this.onCanvasClick}
        onMouseMove={this.onCanvasHover}
        width={`${radius * 2}px`}
        height={`${radius * 2}px`}
      />
    ) : (
      <canvas
        id="colour-picker"
        onClick={this.onCanvasClick}
        width={`${radius * 2}px`}
        height={`${radius * 2}px`}
      />
    )
  }
}

ColourWheel.propTypes = {
  radius: PropTypes.number.isRequired,
  lineWidth: PropTypes.number.isRequired,
  colours: PropTypes.array,
  shades: PropTypes.number,
  padding: PropTypes.number,
  dynamicCursor: PropTypes.bool,
  spacers: PropTypes.object,
  onColourSelected: PropTypes.func,
  preset: PropTypes.bool
  // presetColour: PropTypes.string
}

ColourWheel.defaultProps = {
  colours: hexStrings,
  shades: 16,
  padding: 0,
  dynamicCursor: true,
  preset: false,
  animate: false
}

export default ColourWheel
