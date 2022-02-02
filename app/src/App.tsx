import React, { useEffect, useState } from 'react';
import { Route, BrowserRouter } from "react-router-dom";
import { Routes } from "react-router";
import routes from './config/routes';
import authService from './services/auth.service';
import { Navigate } from 'react-router-dom';




const App: React.FunctionComponent = () => {




    const [user, setUser] = useState({ login: null, type: null });


    useEffect(() => {

        if (!user.login) {
            const userData = authService.getCurrentUser();

            if (userData) {
                setUser({
                    login: userData.login,
                    type: userData.type
                })
            }
        }

    });

    return (
        <div>
            <BrowserRouter>
                <Routes>
                    {routes.map((route, index) => {

                        if ((route.access && (route.access === user.type)) || !route.access) {
                            return <Route key={index} path={route.path} element={<route.component />} />
                        }

                    })}
                </Routes>
            </BrowserRouter>
        </div>

    );

}

export default App;