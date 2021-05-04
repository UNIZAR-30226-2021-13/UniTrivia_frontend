import React, { Component } from 'react'

// react-colour-wheel:
import ColourWheel from './src/components/colourWheel/ColourWheel'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import Button from '@material-ui/core/Button'

const yourDefaultColour = 'rgb(255, 255, 255)'

class Board extends Component {
    state = {
        selectedColour: yourDefaultColour,
        dado: 0
    }

    clearColourWheel = () => {
        this.colourWheel.clear(() => {
            // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
            this.setState({ selectedColour: yourDefaultColour })
        })
    }

    iniciarPartida = () => {
        this.colourWheel.iniciarPartida(() => {
            // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
            this.setState({ selectedColour: yourDefaultColour })
        })
    }

    jugada = () => {
        let dado=this.state.dado
        console.log('num'+this.state.dado)
        this.colourWheel.jugada(dado,() => {
            // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
            this.setState({ selectedColour: yourDefaultColour })
        })
    }

    rollDoneCallback =(num) =>{
        console.log(`You rolled a ${num}`)
        //this.state.dado={num}
        this.setState({dado: num})
        console.log(`sacaste un `+this.state.dado)
        this.jugada()


    }

    render () {
        const { selectedColour } = this.state




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
                    numPlayers={4}
                    playerName={['jugador1','jugador2','test','test2']}
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
                    onClick={this.iniciarPartida}
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
                        rollDone={this.rollDoneCallback}
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

export default Board
