import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Switch, Route, Redirect } from 'react-router-dom';

import { CssBaseline } from '@material-ui/core';
import Homepage from './views/Homepage';
import LoginPanel from './components/LoginPanel';
import Footer from './components/Footer';
import SignUp from './components/SignUp';
import Navbar from './components/Navbar';
import EditCard from './views/EditCard';
//import UserList from './components/UsersList';
//import { getUserInfo } from './store/currentUser';
import { setCsrfFunc } from './store/authentication';
import './nsa.css';

const PrivateRoute = ({ component: Component, ...rest }) => {
    let needLogin = useSelector(state => !state.authentication.id);
    return (
        <Route {...rest} render={(props) => (
            needLogin
                ? <Redirect to='/login' />
                : <Component {...props} />
        )} />
    )
}

function App() {
    //let currentUserId = useSelector(state => state.authentication.id);
    let location = useLocation();
    let dispatch = useDispatch();
    // useEffect(() => {
    //     dispatch(getUserInfo(currentUserId));
    // }, [currentUserId, dispatch])
    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);

    useEffect(() => {
        async function restoreCSRF() {
            const response = await fetch('/api/csrf/restore', {
                method: 'GET',
                credentials: 'include'
            });
            if (response.ok) {
                const authData = await response.json();
                setFetchWithCSRF(() => {
                    return (resource, init) => {
                        if (init.headers) {
                            init.headers['X-CSRFToken'] = authData.csrf_token;
                        } else {
                            init.headers = {
                                'X-CSRFToken': authData.csrf_token
                            }
                        }
                        return fetch(resource, init);
                    }
                });
            }
        }
        restoreCSRF();
    }, []);


    useEffect(() => {
        dispatch(setCsrfFunc(fetchWithCSRF));
    }, [fetchWithCSRF, dispatch]);

    return (
        <>
            <CssBaseline />
            <Navbar />
            <Switch>
                <Route path="/login" component={LoginPanel} />
                {/* <PrivateRoute
                    path="/profile"
                    exact={true}
                    component={LoginPanel}
                /> */}
                <Route
                    path="/signup"
                    exact={true}
                    component={SignUp}
                />
                <Route
                    path="/cards/edit"
                    exact={true}
                    component={EditCard}
                />
                <Route
                    path="/"
                    exact={true}
                    component={Homepage}
                />
            </Switch>
            <Footer />
        </>
    );
}

export default App;
