import React, { Component } from 'react'

// react-colour-wheel:
import ColourWheel from './src/components/colourWheel/ColourWheel'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import Button from '@material-ui/core/Button'
import {getPlayers, getUser, setPlayers} from "../Utils/Common";
import {get} from "react-hook-form";
import dados from '../music/dado.mp3'
import {conn} from "../Play";
import {Card, CardContent, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import Quiz from "./src/Quiz/Quiz";
import Popup from "reactjs-popup";

const yourDefaultColour = 'rgb(255, 255, 255)'

class Board extends Component {
    state = {
        selectedColour: yourDefaultColour,
        dado: 0,
        play: false,
        turno:'',
        admin:'',
        open:false

    }
    audio = new Audio(dados)

    componentDidMount() {
        this.audio.addEventListener('ended', () => this.setState({ play: false }));
    }

    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => this.setState({ play: false }));
    }

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.play ? this.audio.play() : this.audio.pause();
        });
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



    rollDoneCallback2 =(num) =>{
        setTimeout(()=>{this.rollDoneCallback(num)}, 2000);//2000
    }

    turn =() =>{
        return(
            <h1>{this.state.turno}</h1>
        )
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        conn.on('turno', (info) => {
            console.log("Turno de: " + info);
            this.state.turno=info
        })
    }

    componentDidMount() {
        conn.on('turno', (info) => {
            console.log("Turno de: " + info);
            this.state.turno=info
        })
    }

    handleOpen = () => {

        this.state.open=true;
    };

    handleClose = () => {

        this.state.open=false;
    };
    getOpen(){
        return this.state.open
    }


    render () {
        const { selectedColour } = this.state
        let audio = new Audio("../music/dado.mp3")


//                    backgroundImage: 'url(https://vips.org/wp-content/uploads/2018/09/question-background.png)',
        const start = () => {
            audio.play()
        }
//onClick={this.togglePlay}


        conn.on('finDelJuego', (usuario) => {
            console.log("Fin del juego, gana: " + usuario);
            this.handleOpen()
        })


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
                <div style={{ textAlign: 'right', color: '#FFFFFF' }}>
                    <h1><span>Turno de :{this.state.turno}</span></h1>
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
                <Popup
                    open={this.getOpen()}
                    onClose={this.handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >

                    <Card style={{ color: green[500] }} >
                        <CardContent>
                            <Typography>Fin de la partida.</Typography>
                            <Button href={'/menu'}>Volver al menú</Button>
                        </CardContent>
                    </Card>


                </Popup>


                <div
                    onClick={this.iniciarPartidaa}
                    style={{
                        cursor: 'pointer',
                        fontSize: 20,
                        fontWeight: '500',
                        color: '#FFFFFF',
                        marginTop: 20
                    }}>
                    <Button >Iniciar partida</Button>
                </div>
                <div
                    style={{
                        cursor: 'pointer',
                        fontSize: 20,
                        fontWeight: '500',
                        color: '#FFFFFF',
                        marginTop: 20
                    }}
                    onClick={this.togglePlay}

                    >
                    <Button onClick={()=>{this.reactDice.rollAll()}}>tirar dado</Button>
                    <ReactDice
                        numDice={1}
                        rollDone={this.rollDoneCallback2}
                        ref={dice => this.reactDice = dice}
                        outline={true}
                        faceColor={'white'}
                        dotColor={'black'}
                        rollTime={2}
                        sound={'../music/dado.mp3'}

                    />

                </div>

            </div>
        )
    }
}

export default Board
