import "./assets/styles/style.css";

import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import { Auth, User, onAuthStateChanged } from "firebase/auth";

import getFirebaseAuth from "./libs/firebase/auth";

import Authenticated from "./middleware/Authenticated";

import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Actions from "./components/pages/Actions";
import ForgetPassword from "./components/forms/ForgetPasswordForm";
import LoginByEmail from "./components/forms/LoginByEmailForm";
import LoginByPhone from "./components/forms/LoginByPhoneForm";
import Signup from "./components/forms/SignupForm";
import PageLoader from "./components/UI/PageLoader";
import Login from "./components/pages/Login";

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
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        onAuthStateChanged(auth, (response) => {
            setLoading(false);
            setUser(response);
        });
    }, []);

    return (
        <authContext.Provider value={{ auth, user }}>
            <Box sx={{ height: "100vh", paddingX: 2 }}>
                {loading ? (
                    <PageLoader />
                ) : (
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />}>
                            <Route index element={<LoginByEmail />} />
                            <Route path="email" element={<LoginByEmail />} />
                            <Route path="phone" element={<LoginByPhone />} />
                        </Route>
                        <Route path="/signup" element={<Signup />} />
                        <Route
                            path="/forgot_password"
                            element={<ForgetPassword />}
                        />
                        <Route path="/auth/action" element={<Actions />} />
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
