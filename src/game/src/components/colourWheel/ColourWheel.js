// NOTES:
// -- Array-destructuring assignment won't work w vanilla ie11; needs babel-polyfill lol

import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Quiz from '../../Quiz/Quiz'

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
import { Box, Popover, Typography } from '@material-ui/core'
import {conn} from '../../../../Play'
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
      positionsX: [50,50,50,50,50,50],
      positionsY: [50,60,70,80,90,100],
      puedoMover: false,
      playerName: ['1','2','3','4','5','6'],
      dado: 0
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
    this.state.numPlayers=this.props.numPlayers
    const { radius } = this.props

    const width = radius * 2
    const height = radius * 2

    this.ctx.clearRect(0, 0, width, height)

    this.drawOuterWheel(1)
    this.drawSpacers()
    //this.drawCenterCircle()
    //this.drawPlayers()
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
      this.innerWheelRadius - this.centerCircleRadius,
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
        this.drawInnerWheel()//borrar lo anterior
        this.drawOuterWheel(1)//dibujar rueda
        this.drawRadius()//dibujar radios
        this.drawSpacers()//dibujar spacer
        this.drawCenterCircle()//dibujar circulo central con los jugadores
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
  pregunta=true

  outerWheelClicked (evtPos) {
    const { radius,colours } = this.props

    // returns an rgba array of the pixel-clicked.
    const rgbaArr = this.ctx.getImageData(evtPos.x, evtPos.y, 1, 1).data
    const [r, g, b,opac] = rgbaArr
    console.log('opac='+opac)

    const rgb = { r, g, b }

    // Whether the user wants rgb-strings or rgb objects returned.
    const rgbArg = convertObjToString(rgb) // TODO: Let user set different return values in props; e.g. rbg obj, string, etc.
    this.pregunta=false;
    this.props.onColourSelected(rgbArg)
    let opa
    console.log(rgbaArr)
    /*if (r == 255 && g == 255 && b == 255) {
      opa = 0.1
    } else {
      opa = 1
    }*/
    opa=1

    console.log(getCasillaNumber(r, g, b))
    console.log(colours[7])
    console.log(convertObjToString(colours[7]))
    console.log(evtPos.x)
    console.log(this.state.puedoMover)
    this.setState(
      {
        rgb,
        innerWheelOpen: true,
        centerCircleOpen: true,

      },
      () => {


        if(opac===255 && this.state.puedoMover===true){
          this.drawInnerWheel()
          this.drawOuterWheel(opa)
          this.changePosition(evtPos.x, evtPos.y)
          this.drawRadius()
          this.drawSpacers()
          this.drawCenterCircle()
          this.state.puedoMover=false;


        }else{

        }
      }
    )
  }

  innerWheelClicked (evtPos) {
    const rgbaArr = this.ctx.getImageData(evtPos.x, evtPos.y, 1, 1).data
    const [r, g, b,opac] = rgbaArr

    const rgb = { r, g, b }

    const rgbArg = convertObjToString(rgb)
    console.log(rgbaArr)


    console.log(getCasillaNumber(r, g, b))

    this.props.onColourSelected(rgbArg)

    this.setState(
      {
        rgb,
        centerCircleOpen: true
      },
      () => {
        if(opac===255 && this.state.puedoMover===true){
          this.drawInnerWheel()
          this.drawOuterWheel(1)
          this.changePosition(evtPos.x, evtPos.y)
          this.drawRadius()
          this.drawSpacers()
          this.drawCenterCircle()
          this.state.puedoMover=false;


        }else{

        }
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

  dibujarTablero(casillasMarcadas=[]){

    // Reset state & re-draw.
    //this.initCanvas()

    this.drawInnerWheel()
    const num1=Math.floor(Math.random() * 24) + 1;
    const num2 = Math.floor(Math.random() * 24) + 1;

    this.drawOuterWheel(1,casillasMarcadas)
    this.drawRadius(0.1,casillasMarcadas)
    this.drawSpacers()
    this.drawCenterCircle()
  }

  jugada (dado,callback = false) {
    this.setState(
      {
        rgb: '#ffffff',
        innerWheelOpen: true,
        centerCircleOpen: false,

      },
      () => {
        //dibujar tablero
        //this.drawPosition()

        if (callback) callback()
      }
    )
    console.log('dado'+dado)
    /*
    tirar dado
    conn.emit('posibles jugadas',(data)=>{

    })
     */

    conn.emit("posiblesJugadas", dado, (res)=>{
      console.log("Posibles jugadas con dado: " + dado.toString());
      console.log(res['res']);
      console.log(res['info']);
      if(res['res']!='err'){
        if(res['info']==="No es el turno."){
          console.log('no turno')
          this.state.puedoMover=false;
        }else{
          this.state.puedoMover=true;
        }
        console.log(res['info'].length);
        console.log(res['info'][0]);
        let casillas=[];
        for(var i=0;i<res['info'].length;i++){

          casillas[i]=res['info'][i].casilla.num
        }
        console.log(casillas[0])
        if(this.state.puedoMover){//si es mi turno
          this.dibujarTablero(casillas)
        }
      }

    })


  }



  inicializarTablero(){
    this.drawInnerWheel()//borrar lo anterior
    this.drawOuterWheel(1)//dibujar rueda
    this.drawRadius()//dibujar radios
    this.drawSpacers()//dibujar spacer
    this.drawCenterCircle()//dibujar circulo central con los jugadores
  }


  iniciarPartida (callback = false) {

    const { radius } = this.props

    const height = radius * 2
    const width = radius * 2
    this.setState(
      {
        rgb: '#ffffff',
        innerWheelOpen: false,
        centerCircleOpen: false,
        numPlayers: this.props.numPlayers,
        positionsX: [width / 2,
          width / 2,
          width / 2,
          width / 2,
          width / 2,
          width / 2
        ],
        positionsY: [height / 2 +0*10,
          height / 2 +1*10,
          height / 2 +2*10,
          height / 2 +3*10,
          height / 2 +4*10,
          height / 2 +5*10],
        playerName: [this.props.playerName[0],
          this.props.playerName[1],
          this.props.playerName[2],
          this.props.playerName[3],
          this.props.playerName[4],
          this.props.playerName[5],
          ]


      },
      () => {
        // Reset state & re-draw.

       this.inicializarTablero()
        conn.emit("comenzarPartida", (res)=>{
          console.log(res)
          console.log("Al comenzar partida: " + res.res + " " + res.info);
        });
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
              if (getCasillaNumber(rgb.r, rgb.g, rgb.b) === (val)) {
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

  drawRadius (opa,casillasMarcadas=[]) {
    this.drawRad(-27,-90,0,['#ff6403','#ecd703','#0091df'],opa,casillasMarcadas)//radio 0
    this.drawRad(27,90,180,['#ecd704','#ff00ec','#0091de'],opa,casillasMarcadas)//radio 3
    this.drawRad(65,-70,60,['#ff00ed','#008810','#0091dd'],opa,casillasMarcadas)//radio 1
    this.drawRad(94,20,120,['#3b3884','#ff00ee','#ff6404'],opa,casillasMarcadas)//radio 2
    this.drawRad(-65,70,240,['#ff6405','#3b3883','#00880f'],opa,casillasMarcadas)//radio 4
    this.drawRad(-94,-20,-60,['#00880e','#3b3882','#ff00ef'],opa,casillasMarcadas)//radio 5



  }

  drawRad (xs,ys,angle,colors,opa=1,casillasMarcadas=[]) {
    // raf setup.
    const { radius } = this.props
    this.ctx.beginPath()
    //65,-70 y 60º
    //90,27 y 120º
    //-65,70 y 240
    //-90,-27 y -60
    let x = [xs]//-27,27,
    let y = [ys]//-90,90
    this.ctx.translate(radius + x[0], radius + y[0]);
    this.ctx.rotate(angle * Math.PI/180 );
    this.ctx.translate(-(radius + x[0]),-( radius + y[0]));
    for (var i=0;i<3;i++){
      const rgb = colourToRgbObj(colors[i])
      if (casillasMarcadas.length != 0) {
        let marcada=0
        casillasMarcadas.forEach((val, j) => {
          if (getCasillaNumber(rgb.r, rgb.g, rgb.b) === (val)) {
            this.ctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b},${1})`
            marcada=1
          }
        })
        if(marcada!=1){
          this.ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b},${0.1})`

        }
      }else{
        this.ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b},${opa})`

      }

      //this.ctx.rotate(45 * Math.PI / 180);
      //this.ctx.fillStyle = `rgb(${rgb.r},${rgb.g},${rgb.b},${opa})`
      this.ctx.fillRect(
        radius + x[0],
        radius + y[0]-50*i,
        50, 50
      );
      this.ctx.stroke()

    }
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
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.closePath()
  }

  changePosition(x,y,player=0) {
    // raf setup.
    /*this.ctx.beginPath()
    this.ctx.fillText('PLAYER',x,
      y)*/
    //this.ctx.strokeStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b},${opa})`
    this.state.positionsX[player]=x
    this.state.positionsY[player]=y
    /*this.ctx.stroke()
    this.ctx.closePath()*/
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
    //this.drawSpacers()

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

    for(var i=0;i<this.state.numPlayers;i++){

      this.ctx.fillText(
        this.state.playerName[i],
        this.state.positionsX[i],
        this.state.positionsY[i]
      )
    }



    this.ctx.stroke()
    this.ctx.closePath()
  }



  render () {


    const { radius, dynamicCursor } = this.props



    return dynamicCursor ? (
      <div>
        <canvas
          id="colour-picker"
          onClick={this.onCanvasClick}
          onMouseMove={this.onCanvasHover}
          width={`${radius * 2}px`}
          height={`${radius * 2}px`}
        />
        <div>
          <PopupState variant="popover" popupId="demo-popup-popover">
            {(popupState) => (
              <div>
                <Button variant="contained" color="primary" {...bindTrigger(popupState)} disabled={this.pregunta} >
                  Responder Pregunta
                </Button>
                <Popover
                  {...bindPopover(popupState)}
                  anchorReference="anchorPosition"
                  anchorPosition={{ top: 100, left: 400 }}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                  }}
                  transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                  }}
                >
                  <Box p={2}>
                    <Typography>The content of the Popover.</Typography>
                    <Quiz></Quiz>
                  </Box>
                </Popover>
              </div>
            )}
          </PopupState>

        </div>
      </div>
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
  numPlayers: PropTypes.number,
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
