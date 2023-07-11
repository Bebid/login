import React from "react";
import logo from "../images/logo.png";
import react from "../images/react.png";
import mui from "../images/mui.png";
import firebase from "../images/firebase.png";

import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Home() {
    return (
        <>
            <Stack direction="row" alignItems="center" spacing={3}>
                <img
                    src={logo}
                    alt="logo"
                    style={{ width: "64px", height: "auto" }}
                ></img>
                <Typography variant="h2">Login</Typography>
            </Stack>
            <Typography variant="subtitle1">
                A case study aimed to familiarized with user authentication
            </Typography>

            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography variant="h5">Tech Stack:</Typography>
                <img
                    src={firebase}
                    style={{ height: "40px", width: "auto" }}
                    alt="firebase-logo"
                    title="Firebase"
                />
                <img
                    src={react}
                    style={{ height: "40px", width: "auto" }}
                    alt="react-js-logo"
                    title="React JS"
                />
                <img
                    src={mui}
                    style={{ height: "40px", width: "auto" }}
                    alt="material-ui-logo"
                    title="Material UI"
                />
            </Stack>

            <Link to="/login">
                <Button disableElevation variant="contained">
                    TRY NOW
                </Button>
            </Link>
        </>
    );
}

export default Home;
