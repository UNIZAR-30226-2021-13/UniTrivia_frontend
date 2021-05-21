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
import {Card, CardContent, Grid, ListItemAvatar, Popper, Typography} from "@material-ui/core";
import {green} from "@material-ui/core/colors";
import Quiz from "./src/Quiz/Quiz";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Room from "./room";
import IconButton from "@material-ui/core/IconButton";
import {ArrowBack, HelpOutline, MusicNote, MusicOff, VolumeOff, VolumeUp} from "@material-ui/icons";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import Cheese from "./Cheese";
import {withStyles} from "@material-ui/core/styles";
import Avatar from '@material-ui/core/Avatar';
import musica from "../music/ascensor.mp3";
import Sound from "react-sound";
import {CountdownCircleTimer} from "react-countdown-circle-timer";
import {color} from "@material-ui/system";

const yourDefaultColour = 'rgb(255, 255, 255)'


const useStyles = (theme) => ({
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
});



class Board extends Component {
    state = {
        selectedColour: yourDefaultColour,
        dado: 0,
        play: false,
        turno:'',
        admin:'',
        open:false,
        datosJugadores:[{
            avatar:"",
            nombre:"",
            coloresAcertados: [],
            banner:"",
            ficha:""
        }],
        desconectados: [],
        coloresAcertados: [],
        jugadores: [],
        codigoSala: null,
        username: "",
        esprimero: true,
        nuevoJugador: false,

        puedoTirar: false,
        sounds: false,
        music: false,
        partidaEmpezada:false,
        yes:true,

    }


    cambiarSonido=()=>{
        this.setState({sounds: !this.state.sounds})
    }
    cambiarMusica =()=>{
        this.setState({music: !this.state.music})
    }
    audio = new Audio(dados)

    constructor(props) {
        super(props);
        axios.get('https://unitrivia.herokuapp.com/api/profile',{headers: {
                jwt: getToken()
            }}).then((response) => {
            this.setState({username:response.data._id})
            console.log(this.state.jugadores);
            console.log(response.data._id);
            console.log("no se que poner ", response.data._id, this.state.esprimero, this.state.jugadores.length, this.state.jugadores);
            if (this.state.jugadores.length == 0 &&  this.state.esprimero) {
                console.log("Es el primero, lo ponemos como admin");
                const list = this.state.jugadores.concat(response.data._id);
                //this.state.admin = response.data._id;
                this.setState({jugadores:list,
                    admin: response.data._id})


            } else if (this.state.jugadores.length == 1 &&  this.state.esprimero){
                this.setState({admin: response.data._id})

            } else {
                console.log("Se intenta meter un usuario que ya estaba");

            }
        }).catch((code) => {
            console.log(code.response)
        });
    }

    activarDado(){
        this.setState({
            puedoTirar: true
        })
    }

    desactivarDado(){
        this.setState({
            puedoTirar: false
        })
    }

    rellenarQuesitos=(color)=>{
        //this.state({coloresAcertados: color});

    }

    listarJugadores = (classes) => {

        console.log("Entrando a listar jugadores...")

        let desconectados = this.state.desconectados;
        let datosJugadores = this.state.datosJugadores;

        //datosJugadores.some((user) => desconectados.includes(user.nombre)) ? color = '#D64728' : color = '#000000';
        console.log(desconectados)

        return (

            <List dense className={classes.root}>
                {datosJugadores.map((value) => {
                    let color = '';
                    desconectados.includes(value.nombre) ? color = '#D64728' : color = '#000000';
                    console.log(color)

                    const labelId = `checkbox-list-secondary-label-${value}`;
                    let error;
                    if (value.banner === 'banner0' || value.banner === 'banner4') {
                        error = 'black'
                    } else {
                        error = 'white'
                    }

                    return (
                        <div style={{
                            backgroundImage: "url(" + "/images/banners/" + value.banner + ".jpg" + ")",
                            backgroundSize: 'cover', color: error ,blockSize: 100, alignContent: 'stretch',
                            border: 'solid', borderColor: 'black', textSizeAdjust: 'auto'
                        }}>
                            <ListItem key={value}>
                                <ListItemAvatar>
                                    <Avatar altP="Remy Sharp" src={"/images/fichas/" + value.ficha + ".png"}/>
                                </ListItemAvatar>
                                <ListItemAvatar>
                                    <Avatar altP="Remy Sharp" src={"/images/avatars/" + value.avatar + ".jpg"}/>
                                </ListItemAvatar>
                                <ListItemText
                                    id={labelId}
                                    disableTypography
                                    primary={
                                        <Typography type="body2" style={{ color: color }}>
                                            {value.nombre}
                                        </Typography>
                                    }
                                />
                                <ListItemSecondaryAction>
                                    <Cheese color={value.coloresAcertados}></Cheese>
                                </ListItemSecondaryAction>
                            </ListItem>

                        </div>

                    );
                })}
            </List>
        )
    }


    /*
        devolverCodigoSala(){
            conn.emit("obtenerIdSala",(id)=>{
                //this.state.codigoSala = id;
                this.setCodigoSala(id)
                this.setState({codigoSala: id});
                console.log(id);
                console.log(this.state.codigoSala)
            })
            console.log("El identificador es :"+ this.state.codigoSala);

        }
    */


    botonEmpezar = () => {

        if(this.state.username===this.state.admin){
            if(!this.state.partidaEmpezada){
                return(
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={this.iniciarPartidaa}
                    >
                        Empezar Partida
                    </Button>
                )
            }

        }
    }


    componentDidMount(){
        axios.get('https://unitrivia.herokuapp.com/api/profile',{headers: {
                jwt: getToken()
            }}).then((response) => {
            console.log(response)
            this.setState({username:response.data._id})
            console.log(this.state.jugadores);
            console.log(response.data._id);
            if (this.state.jugadores.length==0 &&  this.state.esprimero) {
                console.log("Es el primero, lo ponemos como admin");
                const list = this.state.jugadores.concat(response.data._id);
                //this.state.admin = response.data._id;
                this.setState({
                    jugadores:list,
                    admin: response.data._id,
                    datosJugadores:[{
                        avatar: response.data.avtr,
                        banner: response.data.bnr,
                        ficha: response.data.fich,
                        nombre: response.data._id,
                        coloresAcertados: []
                    }
                    ]
                    })
            } else {
                console.log("Se intenta meter un usuario que ya estaba");
            }
        }).catch((code) => {
            console.log(code.response)
        });

        conn.on('nuevoJugador',(user)=> {
            console.log("Cargando nuevo jugador...")
            const usuario = user.jugador;
            if (!this.state.jugadores.includes(usuario)) {
                const listDatos = this.state.datosJugadores.concat({
                    ficha:user.imgs.ficha,
                    nombre: user.jugador,
                    banner:user.imgs.banner,
                    avatar:user.imgs.avatar,
                    coloresAcertados: []
                })
                this.setState({datosJugadores:listDatos});
                const list = this.state.jugadores.concat(usuario);
                this.setState({jugadores:list})
                conn.emit("mensaje", "El jugador " + usuario + " ha entrado a la sala.");
            }
        })
        conn.on('cargarJugadores',(users)=>{
            console.log(users);
            console.log(users.jugadores.usuario);
            let list = [];
            let gamers = [];
            for(let i = 0; i<users.jugadores.length; i++){
                list.push(users.jugadores[i]);
                gamers.push({
                    nombre:users.jugadores[i].usuario,
                    ficha:users.jugadores[i].imgs.ficha,
                    banner:users.jugadores[i].imgs.banner,
                    avatar:users.jugadores[i].imgs.avatar,
                    coloresAcertados: []});
            }
            console.log(list);
            console.log(gamers);


            if(list.length > 1){
                this.setState({admin: '',
                    esprimero:false, datosJugadores: gamers});
            } else {
                this.setState({admin: this.state.username,
                    esprimero:true, datosJugadores: gamers});
            }


            //console.log(users.jugadores.prototype);
            //setJugadores([...users.jugadores]);
            //this.state.jugadores = users.jugadores;
            //this.setState({jugadores: users.jugadores})
        })

        conn.on('reconexionJugador',(user)=> {
            let desconectados = this.state.desconectados;
            let arrayJugadores = this.state.datosJugadores;
            let nombre = user.jugador;
            let indexUser = desconectados.indexOf(nombre)

            if(indexUser > -1){ //si esta reconocido como desconectado lo elimina
                desconectados.splice(indexUser,1);
                this.setState({desconectados: desconectados})

            }else if (!arrayJugadores.some((elemento) => elemento.nombre === nombre)){ //si no, comprueba que esté en la partida
                console.log("ERROR AL ENCONTRAR JUGADOR: NO ESTABA EN LA PARTIDA");
            } else {
                console.log("AVISO AL ENCONTRAR JUGADOR: NO ESTABA EN DESCONECTADOS");
            }

            conn.emit("mensaje", "El jugador " + nombre + " se ha reconectado.");
        })

        conn.on('estadoPartida',(users)=>{//arreglar
            console.log(users);
            let userList = [];
            for(let i = 0; i < users.jugadores.length; i++){
                userList.push({
                    ficha:users.jugadores[i].imgs.ficha,
                    nombre: users.jugadores[i].usuario,
                    banner:users.jugadores[i].imgs.banner,
                    avatar:users.jugadores[i].imgs.avatar,
                    coloresAcertados: users.jugadores[i].quesitos
                })
            }
            console.log(userList);
            this.setState({admin: userList[0].nombre,
                esprimero:false, datosJugadores: userList});

            console.log("Volviendo a la partida");
            let casillas = [];
            for(let i = 0; i < users.jugadores.length; i++){
                casillas.push(users.jugadores[i].casilla)
            }
            //TODO: cargar un estado de partida de forma dinámica, es decir, distinto del inicial
            let quienSoy=0
            for(let i=0;i<this.state.datosJugadores.length;i++){
                if(this.state.datosJugadores[i].nombre===getUser()){
                    quienSoy=i
                }
            }
            this.setState({partidaEmpezada:true})
            this.colourWheel.setValores(this.state.datosJugadores,this.state.datosJugadores.length,quienSoy)
            console.log(casillas)
            this.colourWheel.cargarPartida(casillas,quienSoy)
            this.colourWheel.drawPlayers()
        })

        conn.on('abandonoSala',(user)=>{
            console.log("Entramos en abandono de sala "+this.state.jugadores);
            var arrayJugadores = this.state.datosJugadores;
            //var arrayDatosJugadores = this.state.datosJugadores;
            //var indexUser = arrayJugadores.indexOf(user);
            let quienSoy
            let indexUser = 0 //arrayJugadores.nombre.indexOf(antiguo);
            let length = arrayJugadores.length
            //console.log(arrayJugadores[0])
            for(let i=0;i<length;i++){
                if (arrayJugadores[i].nombre===user) {
                    indexUser = i;
                }
                if(arrayJugadores[i].nombre===user){
                    quienSoy=i;
                }
            }

            if(indexUser>-1){//no ha dado error
                console.log("Hemos sacado el index del jugador que abandona");
                arrayJugadores.splice(indexUser,1); // quitamos el usuario del array de jugadores
                //arrayDatosJugadores.splice(indexUser,1);
                //this.state.jugadores = arrayJugadores;
                this.setState({datosJugadores:arrayJugadores})
                this.colourWheel.setValores(this.state.datosJugadores,this.state.datosJugadores.length,quienSoy)
                conn.emit("mensaje", "El jugador " + user + " Ha abandonado la sala.");
            }else{
                console.log("ha dado error el indexOf");
                //this.state.jugadores = arrayJugadores;
                this.setState({jugadores: arrayJugadores})
            }
        })

        conn.on('jugadorSale',(user)=>{
            console.log("Jugador saliendo...");
            let desconectados = this.state.desconectados;

            if(!desconectados.includes(user)){ //si no está lo mete
                desconectados.push(user);
                console.log(desconectados)
                this.setState({desconectados: desconectados})

            }else{
                console.log("POSIBLE ERROR AL DESCONECTAR JUGADOR: YA ESTABA DESCONECTADO");
            }
            conn.emit("mensaje", "El jugador " + user + "ha abandonado la partida");
        })

        conn.on('cambioLider',({antiguo,nuevo})=>{
            console.log("Antiguo lider: "+antiguo+ " nuevo: "+nuevo);
            var arrayJugadores = this.state.datosJugadores;
            console.log(arrayJugadores)
            let indexUser = 0 //arrayJugadores.nombre.indexOf(antiguo);
            let length = arrayJugadores.length
            console.log(arrayJugadores[0])
            for(let i=0;i<length;i++){
                if (arrayJugadores[i].nombre==antiguo) {
                    indexUser = i;
                }
            }
            if(indexUser>-1){//no ha dado error
                console.log("Hemos sacado el index del jugador que abandona(en cambio Lider)");
                arrayJugadores.splice(indexUser,1); // quitamos el usuario del array de jugadores
                //this.state.jugadores = arrayJugadores;
                this.setState({jugadores: arrayJugadores,
                    admin: nuevo})
                //this.state.admin = nuevo;
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
            console.log(getUser())
            //this.state.turno=info
            this.setState({turno:info})
            if(info===getUser() || !getUser()){
                //alert('Es tu turno!')
                this.activarDado()
            }else{
                //alert('Es el turno de '+info)
            }
        })

        conn.on('finDelJuego', (usuario) => {
            console.log("Fin del juego, gana: " + usuario);
            this.handleOpen()
        })

        conn.emit("obtenerIdSala",(id)=>{
            //this.state.codigoSala = id;
            this.setState({codigoSala: id});
        })

        conn.on('comienzoPartida', () => {
            console.log("Comienza la partida");
            let quienSoy=0
            for(var i=0;i<this.state.datosJugadores.length;i++){
                if(this.state.datosJugadores[i].nombre===getUser()){
                    quienSoy=i
                }
            }
            this.colourWheel.setValores(this.state.datosJugadores,this.state.datosJugadores.length,quienSoy)
            console.log('dibujand')

            //this.drawCenterCircle()
            this.colourWheel.inicializarTablero()

        })
    }

    componentWillUnmount() {
        this.audio.removeEventListener('ended', () => this.setState({ play: false }));
    }

    togglePlay = () => {
        this.setState({ play: !this.state.play }, () => {
            this.state.sounds ? this.audio.play() : this.audio.pause();
        });
    }

    iniciarPartidaa = () => {

        let quienSoy=0
        for(var i=0;i<this.state.jugadores.length;i++){
            if(this.state.jugadores[i]===getUser()){
                quienSoy=i
            }
        }
        console.log(this.state.jugadores)
        console.log(this.colourWheel)
        this.colourWheel.setValores(this.state.datosJugadores,this.state.datosJugadores.length,quienSoy)

        this.colourWheel.iniciarPartida(() => {
            // Do some other stuff in this callback if you want -- other than re-setting your selectedColour.
            this.setState({ selectedColour: yourDefaultColour })
        })
        this.setState({partidaEmpezada:true})
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
        setTimeout(()=>{this.rollDoneCallback(num)}, 1000);//2000
    }

    turn =() =>{
        return(
            <h1>{this.state.turno}</h1>
        )
    }


    handleOpen = () => {

        //this.state.open=true;
        this.setState({open: true})
    };

    handleClose = () => {

        this.setState({open:false});
    };
    getOpen(){
        return this.state.open
    }


    handleQuesitos=(response)=>{
        console.log(response);
        console.log('quesito de'+response.quesito);
        let color;
        if(response.quesito!=="") {
            switch (response.quesito) {
                case "Historia":
                    color = "yellow";
                    break;
                case "Deportes":
                    color = "orange";
                    break;
                case "Entretenimiento":
                    color = "pink";
                    break;
                case "Ciencias":
                    color = "green";
                    break;
                case "Geografia":
                    color = "blue";
                    break;
                case "Cultura General":
                    color = "purple";
                    break;
            }
            const colors = this.state.coloresAcertados;
            colors.push(color);
            this.setState({coloresAcertados: colors});
            var arrayDatosJugadores = this.state.datosJugadores;
            for (var i = 0; i < arrayDatosJugadores.length; i++) {
                if (arrayDatosJugadores[i].nombre === response.user) {
                    arrayDatosJugadores[i].coloresAcertados.push(color)
                }
            }
            this.setState({datosJugadores: arrayDatosJugadores});
        }
        //this.setState({})
        //console.log(this.state.coloresAcertados)
    }


    render () {
        const {classes} = this.props
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
            <Grid container>
                <Grid item xs={2} direction="row">
                    <Card >
                        <CardContent>
                            <div style={{height: "fit-content"}}>
                                <h2>
                                    Sala
                                </h2>
                                <div>
                                    {this.listarJugadores(classes)}
                                </div>
                                <div>
                                    {/*this.devolverCodigoSala()*/}
                                    <h6 style={{ font: 'arial'}}>CÓDIGO: {this.state.codigoSala}</h6>

                                </div>
                                <div>
                                    {this.botonEmpezar()}
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={8} >
                    <Card style={{ color: green[500] }} >
                        <CardContent>

                            <div>
                                <IconButton color="secondary" variant="contained" aria-label="add an alarm" href={'/Play'}>
                                    <ArrowBack color="primary"/>
                                    Volver
                                </IconButton>

                                <Popup trigger={
                                    <IconButton color="secondary" variant="contained" >
                                        <HelpOutline color="primary"/>
                                    </IconButton>} position="right top" >
                                    <div>
                                        <h5>INFORMACIÓN</h5>
                                        <li><font size={2}>AMARILLO: historia</font></li>
                                        <li><font size={2}>VERDE: Ciencias</font></li>
                                        <li><font size={2}>ROSA: Entretenimiento</font></li>
                                        <li><font size={2}>MORADO: Cultura General</font></li>
                                        <li><font size={2}>NARANJA: Deportes</font></li>
                                        <li><font size={2}>AZUL: Geografia</font></li>
                                        <li><font size={2}>BLANCO: tira otra vez</font></li>
                                    </div>
                                </Popup>

                                <IconButton onClick={this.cambiarSonido} >
                                    {this.state.sounds ? <VolumeUp color="primary"/>:<VolumeOff color="primary"/>}
                                </IconButton>

                                <IconButton onClick={this.cambiarMusica} color="secondary">
                                    {this.state.music ? <MusicNote color="primary"/>:<MusicOff color="primary"/>}
                                </IconButton>



                                <Sound
                                    url={musica}
                                    playStatus={
                                        this.state.music ?Sound.status.PLAYING:Sound.status.PAUSED
                                    }
                                    playFromPosition={300}
                                    loop={true}
                                    volume={20}
                                />


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
                                    {this.state.turno === getUser()?<h2>Tu turno!</h2>:<h2>Turno de :{this.state.turno}</h2>}
                                </div>

                                <ColourWheel
                                    numPlayers={this.state.jugadores.length}
                                    playerName={this.state.jugadores}
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
                                    desactivarDado={this.desactivarDado.bind(this)}
                                    activarDado={this.activarDado.bind(this)}
                                    onResponse={this.handleQuesitos}

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



                                <Button
                                    style={{
                                        cursor: 'pointer',
                                        fontSize: 20,
                                        fontWeight: '500',
                                        color: '#FFFFFF',
                                        marginTop: 20
                                    }}
                                    onClick={this.togglePlay}
                                    disabled={!this.state.puedoTirar}



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
                                        sound={this.state.sounds?'../music/dado.mp3':''}
                                        disableIndividual={!this.state.puedoTirar}
                                    />

                                </Button>

                            </div>

                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(Board);
