import './App.less';
import "react-image-gallery/styles/css/image-gallery.css";
import 'antd/dist/antd.css';

import Cookies from 'js-cookie'
import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, Switch, Route } from 'react-router-dom';

import NavAndFooter from './views/NavAndFooter';
import Login from './views/Login'
import Homepage from './views/Homepage'
import EditCardLayout from './components/EditCardLayout';

import { UserContext } from './Context';

// const PrivateRoute = ({ component: Component, ...rest }) => {
//     let needLogin = useSelector(state => !state.authentication.id);
//     return (
//         <Route {...rest} render={(props) => (
//             needLogin
//                 ? <Redirect to='/login' />
//                 : <Component {...props} />
//         )} />
//     )
// }


function App() {
    // let location = useLocation();

    const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
    const login = async (username, password) => {
        const res = await fetchWithCSRF('/api/session/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: 'include',
            body: JSON.stringify({ username, password })
        })
        if (res.ok) {
            const data = await res.json();
            const { user } = data[0]
            await setUserInfo(user);
            return user;
        }
    }

    const [userInfo, setUserInfo] = useState({
        id: null,
        is_public: null,
        promotion_points: null,
        online_status: 'online',
        alias: null,
        username: null,
        email: null,
        country: null,
        city: null,
        about_me: null,
        profile_pic_src: null,
        background_src: null,
        created_at: null,
        updated_at: null
    });
    const [editCardState, setEditCardState] = useState({
        playerTarget: '',
        playerCondition: '',
        playerOperator: '',
        playerValue: 0,
        characterTarget: '',
        characterCondition: '',
        characterOperator: '',
        characterValue: 0,
        effectTarget: '',
        effect: '',
        effectValue: 0,
        turn: 1,
    });
    const providerUserInfo = useMemo(() => ({ userInfo, setUserInfo, editCardState, setEditCardState, fetchWithCSRF, login }), [userInfo, setUserInfo, editCardState, setEditCardState, fetchWithCSRF, login]);


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


    // useEffect(() => {
    //     dispatch(setCsrfFunc(fetchWithCSRF));
    // }, [fetchWithCSRF, dispatch]);

    return (
        <UserContext.Provider value={providerUserInfo}>
            <NavAndFooter>
                <Switch>
                    <Route path="/login" component={Login} />
                    {/* <PrivateRoute
                    path="/profile"
                    exact={true}
                    component={LoginPanel}
                /> */}
                    {/* <Route
                    path="/signup"
                    exact={true}
                    component={SignUp}
                /> */}
                    <Route
                        path="/cards"
                        component={EditCardLayout}
                    />
                    <Route
                        path="/"
                        exact={true}
                        component={Homepage}
                    />
                </Switch>
            </NavAndFooter >
        </UserContext.Provider>
    );
}

export default App;
