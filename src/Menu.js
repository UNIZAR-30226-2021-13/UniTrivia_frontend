import React, {useState} from 'react'
import axios from "axios";
import {setUserSession} from "./Utils/Common";
import styled from "styled-components";

class Menu extends React.Component {
    render() {



        return (

            <div>
                <h3>UniTrivia</h3>
                MENÚ<br/><br/>
                <div>
                    <input type="button" value={'Jugar'} /><br />
                </div>
                <div style={{marginTop: 10}}>
                    <input type="button" value={'Perfil'} /><br />
                </div>
                <div style={{marginTop: 10}}>
                    <input type="button" value={'Ajustes'} /><br />
                    <button>hola</button>

                </div>

            </div>
        );
    }
}





export default Menu;