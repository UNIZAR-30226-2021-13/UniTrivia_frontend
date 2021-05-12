import React, {Component, useEffect, useState} from 'react'

// react-colour-wheel:
import ColourWheel from './src/components/colourWheel/ColourWheel'
import ReactDice from 'react-dice-complete'
import 'react-dice-complete/dist/react-dice-complete.css'
import Button from '@material-ui/core/Button'
import {getPlayers, getSoyAdmin, getToken, getUser, setPlayers} from "../Utils/Common";
import {get} from "react-hook-form";
import dados from '../music/dado.mp3'
import {conn} from "../Play";
import {Card, CardContent, Grid, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import Quiz from "./src/Quiz/Quiz";
import Popup from "reactjs-popup";
import Room from "./room";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack, HelpOutline} from "@material-ui/icons";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Cheese from "./Cheese";
import {makeStyles} from "@material-ui/core/styles";

const yourDefaultColour = 'rgb(255, 255, 255)'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    image: {
        backgroundImage: 'url(https://img.freepik.com/vector-gratis/modelo-inconsutil-pregunta-papel-aislada-realista-decoracion-invitacion-concepto-concurso-trivia_269299-1004.jpg?size=626&ext=jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

class Board extends Component {
    state = {
        selectedColour: yourDefaultColour,
        dado: 0,
        play: false,
        turno:'',
        admin:'',
        open:false,

        coloresAcertados: ["yellow","pink"],
        jugadores: [],
        codigoSala: null,
        username: "",
        esprimero: true,
        nuevoJugador: false

    }

    audio = new Audio(dados)
    classes = useStyles();

    quesitos=()=>{
        console.log("EStoy en quesitos");

    }

    listarJugadores = () => {
        return(
            <List dense className={this.classes.root}>
                {this.state.jugadores.map((value) => {
                    const labelId = `checkbox-list-secondary-label-${value}`;
                    return (
                        <div>
                            <ListItem key={value} button>
                                <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                                <ListItemSecondaryAction>
                                    <Cheese color={this.state.coloresAcertados}></Cheese>
                                </ListItemSecondaryAction>
                            </ListItem>

                        </div>

                    );
                })}
            </List>
        )
    }
    devolverCodigoSala = () => {
        conn.emit("obtenerIdSala",(id)=>{
            //console.log("En obtener id ");
            console.assert(id!=='','Error al obtener idSala');
            this.state.codigoSala = id;
            //console.log(id);
        })
        //console.log("El identificador es :");
        return (
            <h6>El codigo de la sala es {this.state.codigoSala}</h6>
        )
    }
    /*
    empezarPartida=()=>{
        conn.on('comienzoPartida',()=>{
            console.log("Comienza la partida");
        })
    }


    botonEmpezar = () => {
        console.log("Estoy en boton: username: "+this.state.username+"  y admin  "+this.state.admin);
        if(this.state.username===this.state.admin){
            return(
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={this.classes.submit}
                    onClick={this.empezarPartida}
                >
                    Empezar Partida
                </Button>
            )
        }
    }
    */

    componentDidMount(){
        axios.get('https://unitrivia.herokuapp.com/api/profile',{headers: {
                jwt: getToken()
            }}).then((response) => {
            this.state.username = response.data._id;
            console.log(this.state.jugadores);
            console.log(response.data._id);
            if (this.state.jugadores.length==0 &&  this.state.esprimero) {
                console.log("Es el primero, lo ponemos como admin");
                const list = this.state.jugadores.concat(response.data._id);
                this.state.admin = response.data._id;
                this.state.jugadores = list;
            } else {
                console.log("Se intenta meter un usuario que ya estaba");
            }
        }).catch((code,message) => {
            console.log(code.response)
        });

        conn.on('nuevoJugador',(user)=> {
            console.log(user);
            console.log(this.state.admin);
            if (!this.state.jugadores.includes(user)) {
                console.log("Es nuevo de verdad");
                const list = this.state.jugadores.concat(user);
                this.state.jugadores = list;
            } else {
                console.log("Se intenta meter un usuario que ya estaba");
            }
        })
        conn.on('cargarJugadores',(users)=>{
            console.log(users);
            console.log(users.jugadores);
            this.state.admin = users.jugadores[0];
            this.state.esprimero=false;
            //console.log(users.jugadores.prototype);
            //setJugadores([...users.jugadores]);
            this.state.jugadores = users.jugadores;
        })
        conn.on('abandonoSala',(user)=>{
            console.log("Entramos en abandono de sala "+jugadores);
            var arrayJugadores = this.state.jugadores;
            var indexUser = arrayJugadores.indexOf(user);
            if(indexUser>-1){//no ha dado error
                console.log("Hemos sacado el index del jugador que abandona");
                arrayJugadores.splice(indexUser,1); // quitamos el usuario del array de jugadores
                this.state.jugadores = arrayJugadores;
            }else{
                console.log("ha dado error el indexOf");
                this.state.jugadores = arrayJugadores;
            }
        })
        conn.on('cambioLider',({antiguo,nuevo})=>{
            console.log("Antiguo lider: "+antiguo+ " nuevo: "+nuevo);
            var arrayJugadores = this.state.jugadores;
            var indexUser = arrayJugadores.indexOf(antiguo);
            if(indexUser>-1){//no ha dado error
                console.log("Hemos sacado el index del jugador que abandona(en cambio Lider)");
                arrayJugadores.splice(indexUser,1); // quitamos el usuario del array de jugadores
                this.state.jugadores = arrayJugadores;
                this.state.admin = nuevo;
            }else{
                console.log("ha dado error el indexOf");

            }
        })
        /*
        conn.on('estadoPartida',(info)=>{
            console.log(info);
        })*/

        this.audio.addEventListener('ended', () => this.setState({ play: false }));

        conn.on('turno', (info) => {
            console.log("Turno de: " + info);
            this.state.turno=info
            if(info===getUser()){
                alert('Es tu turno!')
            }else{
                alert('Es el turno de '+info)
            }
        })

        conn.on('finDelJuego', (usuario) => {
            console.log("Fin del juego, gana: " + usuario);
            this.handleOpen()
        })
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


        /*
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
                    <Button disabled={!getSoyAdmin()}>Iniciar partida{console.log(getSoyAdmin())}</Button>
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
        )*/

        return (
            <Grid>
                <Grid item xs={2} direction="row">
                    <div>
                        <div>
                            Hola
                        </div>
                        <div>
                            {this.listarJugadores()}
                        </div>
                        <div>
                            {this.devolverCodigoSala()}
                        </div>
                        <div>
                            {this.botonEmpezar()}
                        </div>
                    </div>
                </Grid>
                <Grid item xs={8} >
                    <Card style={{ color: green[500] }} >
                        <CardContent>

                            <div>
                                <IconButton color="secondary" variant="contained" aria-label="add an alarm" href={'/Play'}>
                                    <ArrowBack color="primary"/>
                                    Volver
                                </IconButton>
                                <IconButton color="secondary" variant="contained" >
                                    <HelpOutline color="primary"/>

                                </IconButton>

                            </div>
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
                                    <Button disabled={!getSoyAdmin()}>Iniciar partida{console.log(getSoyAdmin())}</Button>
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

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default Board
