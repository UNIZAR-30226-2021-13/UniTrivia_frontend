import React, {useEffect} from 'react';
import AppBar from './home/AppBar'
import {getToken, getUser} from "./Utils/Common";
import axios from "axios";

function Home(props) {

    useEffect(() => {

        if(getUser()!=null){
            props.history.push('/menu');
        }
    }, []);
  return (
      <React.Fragment>
        <AppBar></AppBar>
        <div>
          Welcome to the Home Page!
        </div>
      </React.Fragment>
  );
}

export default Home;
