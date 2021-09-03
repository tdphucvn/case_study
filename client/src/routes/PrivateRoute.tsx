import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const PrivateRoute = (props: any) => {
    const {component: Component, ...rest} = props;
    const { authenticated } = useSelector((state: RootState) => state.auth);

    return (
        <Route {...rest} render={() => (authenticated ? <Component /> : <Redirect to="/" />)}/>
    )
};

export default PrivateRoute;