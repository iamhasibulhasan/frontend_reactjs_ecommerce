import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthUser from '../Axios/AuthUser';

const PrivateRoute = ({ children, ...rest }) => {
    const { token } = AuthUser();
    return (
        <Route
            {...rest}
            render={({ location }) => token ? children : <Redirect
                to={{
                    pathname: "/login",
                    state: { from: location }
                }}
            ></Redirect>}
        >

        </Route>
    );
};

export default PrivateRoute;