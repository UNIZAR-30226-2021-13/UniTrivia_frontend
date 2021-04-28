import React, { Component } from 'react'

// react-colour-wheel:
import ColourWheel from './components/colourWheel/ColourWheel'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import Button from '@material-ui/core/Button'

const yourDefaultColour = 'rgb(255, 255, 255)'

class App extends Component {
  state = {
    selectedColour: yourDefaultColour
  }

  clearColourWheel = () => {
    this.colourWheel.clear(() => {
      // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
      this.setState({ selectedColour: yourDefaultColour })
    })
  }

  partida = () => {
    this.colourWheel.partida(() => {
      // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
      this.setState({ selectedColour: yourDefaultColour })
    })
  }

  jugada = () => {
    this.colourWheel.jugada(() => {
      // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
      this.setState({ selectedColour: yourDefaultColour })
    })
  }
  num

  render () {
    const { selectedColour } = this.state

    function rollDoneCallback (num) {
      console.log(`You rolled a ${num}`)
    }


    return (
      <div
        style={{
          height: '100vh',
          width: '100vw',
          display: 'flex',
          backgroundColor: '#394032',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <div style={{ textAlign: 'center', color: '#FFFFFF' }}>
          <h1><span>UniTrivia</span></h1>
        </div>

        <ColourWheel

          radius={250}
          padding={10}
          lineWidth={50}
          onColourSelected={(rgb) => this.setState({ selectedColour: rgb })}
          onRef={ref => (this.colourWheel = ref)}
          spacers={{
            colour: '#FFFFFF',
            shadowColour: 'grey',
            shadowBlur: 5
          }}
          preset // You can set this bool depending on whether you have a pre-selected colour in state.
          presetColour={this.state.selectedColour}
          animated
          numPlayers={4}
        />

        <div
          onClick={this.clearColourWheel}
          style={{
            cursor: 'pointer',
            fontSize: 20,
            fontWeight: '500',
            color: '#FFFFFF',
            marginTop: 20
          }}>
          clear
        </div>
        <div
          onClick={this.partida}
          style={{
            cursor: 'pointer',
            fontSize: 20,
            fontWeight: '500',
            color: '#FFFFFF',
            marginTop: 20
          }}>
          Iniciar partida
        </div>
        <div
          onClick={this.jugada}
          style={{
            cursor: 'pointer',
            fontSize: 20,
            fontWeight: '500',
            color: '#FFFFFF',
            marginTop: 20
          }}>
          tirar dado
          <ReactDice
            numDice={1}
            rollDone={rollDoneCallback}
            ref={dice => this.reactDice = dice}
            outline={true}
            faceColor={'white'}
            dotColor={'black'}
            rollTime={0.1}
          />

        </div>
      </div>
    )
  }
}

export default App
