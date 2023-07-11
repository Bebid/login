import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import ForgetPassword from "./components/Auth/ForgetPassword";
import Dashboard from "./pages/Dashboard";
import Authenticated from "./middleware/Authenticated";
import React, { useEffect, useState } from "react";
import Actions from "./components/Auth/Actions";
import getFirebaseAuth from "./firebase/auth";
import { Auth, User, onAuthStateChanged } from "firebase/auth";
import LoginPage from "./pages/LoginPage";
import LoginByEmail from "./components/Auth/LoginByEmail";
import LoginByPhone from "./components/Auth/LoginByPhone";
import CenteredContent from "./pages/CenteredContent";
import Signup from "./components/Auth/Signup";
import Home from "./pages/Home";
import PageLoader from "./components/PageLoader";

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

    if (loading) {
        return <PageLoader />;
    }

    return (
        <authContext.Provider value={{ auth, user }}>
            <Box sx={{ height: "100vh", padding: 2 }}>
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
                            <CenteredContent>
                                <LoginPage />
                            </CenteredContent>
                        }
                    >
                        <Route index element={<LoginByEmail />} />
                        <Route path="email" element={<LoginByEmail />} />
                        <Route path="phone" element={<LoginByPhone />} />
                    </Route>
                    <Route
                        path="/signup"
                        element={
                            <CenteredContent>
                                <Signup></Signup>
                            </CenteredContent>
                        }
                    />
                    <Route
                        path="/forgot_password"
                        element={
                            <CenteredContent>
                                <ForgetPassword />
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
            </Box>
        </authContext.Provider>
    );
}

export default App;
