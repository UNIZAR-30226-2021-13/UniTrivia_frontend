import React, { Component } from 'react'

// react-colour-wheel:
import ColourWheel from './src/components/colourWheel/ColourWheel'

const yourDefaultColour = 'rgb(255, 255, 255)'

class Board extends Component {
    state = {
        selectedColour: yourDefaultColour
    }

    clearColourWheel = () => {
        this.colourWheel.clear(() => {
            // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
            this.setState({ selectedColour: yourDefaultColour })
        })
    }

    partidaa = () => {
        this.colourWheel.partida(() => {
            // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
            this.setState({ selectedColour: yourDefaultColour })
        })
    }

    jugadaa = () => {
        this.colourWheel.jugada(() => {
            // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
            this.setState({ selectedColour: yourDefaultColour })
        })
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
                    <h1><span>react-colour-wheel</span></h1>
                    <h2><span style={{ color: selectedColour }}>{selectedColour}</span></h2>
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
                    onClick={this.partidaa}
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
                    onClick={this.jugadaa}
                    style={{
                        cursor: 'pointer',
                        fontSize: 20,
                        fontWeight: '500',
                        color: '#FFFFFF',
                        marginTop: 20
                    }}>
                    tirar dado
                </div>
            </div>
        )
    }
}

export default Board
