import logo from "../../assets/images/logo.png";
import react from "../../assets/images/react.png";
import mui from "../../assets/images/mui.png";
import firebase from "../../assets/images/firebase.png";

import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

import CenteredContent from "../../layouts/CenteredContent";

function Home() {
    return (
        <CenteredContent>
            <Stack spacing={2}>
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
            </Stack>

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
        </CenteredContent>
    );
}

export default Home;
