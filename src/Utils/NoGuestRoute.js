import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {getToken, getUser} from './Common';

// handle the private routes
function NoGuestRoute({ component: Component, ...rest }) {
    return (
        <Route
            {...rest}
            render={(props) => getToken() && getUser() ? <Component {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
        />
    )
}

export default NoGuestRoute;