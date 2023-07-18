import "./assets/styles/style.css";

import React, { useEffect, useState } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import { Auth, User, onAuthStateChanged } from "firebase/auth";

import getFirebaseAuth from "./libs/firebase/auth";

import CenteredContent from "./layouts/CenteredContent";

import Authenticated from "./middleware/Authenticated";

import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Actions from "./components/pages/Authentication/Actions";
import ForgetPasswordForm from "./components/pages/Authentication/forms/ForgetPasswordForm";
import LoginByEmailForm from "./components/pages/Authentication/forms/LoginByEmailForm";
import LoginByPhoneForm from "./components/pages/Authentication/forms/LoginByPhoneForm";
import SignupForm from "./components/pages/Authentication/forms/SignupForm";
import AuthNav from "./components/pages/Authentication/navs/AuthNav";
import PageLoader from "./components/UI/PageLoader";

export type AuthContext = {
    auth: Auth | null;
    user: User | null;
};

export const authContext = React.createContext<AuthContext>({
    auth: null,
    user: null,
});

function App() {
    const auth = getFirebaseAuth();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        onAuthStateChanged(auth, (response) => {
            setLoading(false);
            setUser(response);
        });
    });

    return (
        <authContext.Provider value={{ auth, user }}>
            <Box sx={{ height: "100vh", paddingX: 2 }}>
                {loading ? (
                    <PageLoader />
                ) : (
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <CenteredContent spacing={3}>
                                    <Home></Home>
                                </CenteredContent>
                            }
                        />
                        <Route
                            path="/login"
                            element={
                                <CenteredContent title="Login" spacing={4}>
                                    <AuthNav></AuthNav>
                                    <Outlet />
                                </CenteredContent>
                            }
                        >
                            <Route index element={<LoginByEmailForm />} />
                            <Route
                                path="email"
                                element={<LoginByEmailForm />}
                            />
                            <Route
                                path="phone"
                                element={<LoginByPhoneForm />}
                            />
                        </Route>
                        <Route
                            path="/signup"
                            element={
                                <CenteredContent spacing={4} title="Signup">
                                    <SignupForm></SignupForm>
                                </CenteredContent>
                            }
                        />
                        <Route
                            path="/forgot_password"
                            element={
                                <CenteredContent>
                                    <ForgetPasswordForm />
                                </CenteredContent>
                            }
                        />
                        <Route
                            path="/auth/action"
                            element={
                                <CenteredContent>
                                    <Actions />
                                </CenteredContent>
                            }
                        />
                        <Route
                            path="/dashboard"
                            element={
                                <Authenticated>
                                    <Dashboard></Dashboard>
                                </Authenticated>
                            }
                        />
                    </Routes>
                )}
            </Box>
        </authContext.Provider>
    );
}

export default App;
