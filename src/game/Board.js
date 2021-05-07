import React, { Component } from 'react'

// react-colour-wheel:
import ColourWheel from './src/components/colourWheel/ColourWheel'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import Button from '@material-ui/core/Button'
import {getPlayers, getUser, setPlayers} from "../Utils/Common";
import {get} from "react-hook-form";


const yourDefaultColour = 'rgb(255, 255, 255)'

class Board extends Component {
    state = {
        selectedColour: yourDefaultColour,
        dado: 0
    }



      iniciarPartidaa = () => {
        let players=getPlayers()
        players=JSON.parse(players)
        console.log(players)
        console.log(JSON.parse(getPlayers()))
        console.log(JSON.parse(getPlayers()).length)
        console.log(getPlayers()[1])
        let quienSoy=0
        for(var i=0;i<JSON.parse(getPlayers()).length;i++){
            if(JSON.parse(getPlayers())[i]===getUser()){
                quienSoy=i
            }
        }
        this.colourWheel.setValores(JSON.parse(getPlayers()),JSON.parse(getPlayers()).length,quienSoy)

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

//                    backgroundImage: 'url(https://vips.org/wp-content/uploads/2018/09/question-background.png)',


        return (
            <div
                style={{
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    backgroundColor: '#353833',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <div style={{ textAlign: 'center', color: '#FFFFFF' }}>
                    <h1><span>UniTrivia</span></h1>
                </div>

                <ColourWheel
                    numPlayers={JSON.parse(getPlayers()).length}
                    playerName={JSON.parse(getPlayers())}
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
                    onClick={this.iniciarPartidaa}
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
