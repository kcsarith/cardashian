import './App.less';
import "react-image-gallery/styles/css/image-gallery.css";
import 'antd/dist/antd.css';
import './index.css'

import Cookies from 'js-cookie'
import React, { useMemo, useState, useEffect } from 'react';
import { useLocation, Switch, Route } from 'react-router-dom';

import NavAndFooter from './views/NavAndFooter';
import Login from './views/Login';
import Homepage from './views/Homepage';
import GamesPage from './views/GamesPage.js';
import CardsPage from './views/CardsPage';
import UserPage from './views/UserPage';
import Settings from './views/Settings';
import Signup from './views/Signup';
import EditCardLayout from './components/EditCardLayout';

import { UserContext } from './Context';

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
            const { user, access_token } = data[0]
            Cookies.set("XSRF_TOKEN", access_token)
            await setUserInfo(user);
            return user;
        }
    }

    const getUserFromXSRF = async () => {
        const XSRF_Token = await Cookies.get()
        console.log(XSRF_Token)
        const res = await fetchWithCSRF('/api/session/load')
        if (res.ok) {
            const { user } = await res.json();
            await setUserInfo(user);
            return user;
        }
    }

    const [userInfo, setUserInfo] = useState({});
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

    const [featuredGamesList, setFeaturedGamesList] = useState([]);
    const [featuredCardsList, setFeaturedCardsList] = useState([]);
    const providerUserInfo = useMemo(() => ({ userInfo, setUserInfo, editCardState, setEditCardState, fetchWithCSRF, login, featuredGamesList, featuredCardsList }), [userInfo, setUserInfo, editCardState, setEditCardState, fetchWithCSRF, login, featuredGamesList, featuredCardsList]);


    useEffect(() => {
        async function restoreCSRF() {
            const response = await fetch('/api/csrf/restore', {
                method: 'GET',
                credentials: 'include'
            });
            const featuredGamesRes = await fetch('/api/games/featured', {
                method: 'GET',
                credentials: 'include'
            });
            if (featuredGamesRes.ok) {
                const { games } = await featuredGamesRes.json()
                setFeaturedGamesList(games)
            }
            const featuredCardsRes = await fetch('/api/cards/featured', {
                method: 'GET',
                credentials: 'include'
            });
            if (featuredCardsRes.ok) {
                const { cards } = await featuredCardsRes.json()
                setFeaturedCardsList(cards)
            }
            const xsrfFect = await getUserFromXSRF();
            console.log(xsrfFect)
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
            } else {
                console.log('Failed to fetch login info from token')
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
                    <Route path="/users/login" component={Login} />
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
                        path="/"
                        exact={true}
                        component={Homepage}
                    />
                    <Route
                        path="/signup"
                        exact={true}
                        component={Signup}
                    />
                    <Route
                        path="/games"
                        exact={true}
                        component={GamesPage}
                    />
                    <Route
                        path="/cards"
                        exact={true}
                        component={CardsPage}
                    />
                    <Route
                        path="/about"
                        exact={true}
                    // component={CardsPage}
                    />
                    <Route
                        path="/card-edit"
                        component={EditCardLayout}
                    />
                    <Route
                        path="/card-edit/:cardId"
                        component={EditCardLayout}
                    />
                    <Route
                        path="/card-edit/:cardId/visuals"
                        component={EditCardLayout}
                    />
                    <Route
                        path="/card-edit/:cardId/stats"
                        component={EditCardLayout}
                    />
                    <Route
                        path="/card-edit/:cardId/effects"
                        component={EditCardLayout}
                    />
                    <Route
                        path="/settings"
                        exact={true}
                        component={Settings}
                    />
                    <Route
                        path="/:username"
                        exact={true}
                        component={UserPage}
                    />
                    <Route
                        path="/:username/:gamename"
                        exact={true}
                        component={UserPage}
                    />
                    <Route
                        path="/:username/:gamename/:cardname"
                        exact={true}
                        component={UserPage}
                    />
                </Switch>
            </NavAndFooter >
        </UserContext.Provider>
    );
}

export default App;
