import React, { useState, useEffect } from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import axios from 'axios';

import Login from './Login';
import Home from './Home';

import PrivateRoute from './Utils/PrivateRoute';
import PublicRoute from './Utils/PublicRoute';
import { getToken, removeUserSession, setUserSession } from './Utils/Common';
import ChangePassword from "./ChangePassword";
import Register from "./Register";
import Menu from "./Menu";
import Profile from './profile';
import Settings from './Settings';


function App(props) {
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      return;
    }

    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(response => {
      setUserSession(response.data.token, response.data.user);
      setAuthLoading(false);
    }).catch(error => {
      //removeUserSession();
      setAuthLoading(false);
    });
  }, []);

  if (authLoading && getToken()) {
    return <div className="content" >Checking Authentication...</div>
  }

  return (
    <div className="App">
      <BrowserRouter>
        <div>
          <div className="content">
            <Switch>
              <Route path="/login" component={Login} />
              <Route exact path="/ChangePassword" component={ChangePassword} />
              <Route path="/register" component={Register}/>
              <PrivateRoute path="/Menu" component={Menu}/>
              <PrivateRoute path="/Settings" component={Settings}/>
              <PrivateRoute path="/Profile" component={Profile}/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}
/*

*/
export default App;
