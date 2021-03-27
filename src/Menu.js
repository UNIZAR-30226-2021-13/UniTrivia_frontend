import React, {useState} from 'react'
import axios from "axios";
import {setUserSession} from "./Utils/Common";
import styled from "styled-components";
import Popup from 'reactjs-popup';

const But=styled.button`
  background-color: #fce2e2;
  font-size: 32px;
  color: #6c6ce3;
`;

const Div=styled.div`
  display: flex;
  flex-direction: column;
  width: 70%;
  margin: 2em auto;

  @media screen and (min-width: 1180px) {
    width: 50%;
  }
`;

class Menu extends React.Component {
    render() {



        return (

            <Div>
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


                </div>
                {/*<But>hole</But>
                <Popup trigger={<button> Trigger</button>} position="top center">
                    <div>Popup content here !!</div>
                </Popup>

                */}


            </Div>
        );
    }
}





export default Menu;