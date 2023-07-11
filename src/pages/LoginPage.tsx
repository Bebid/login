import AuthNav from "../components/Auth/UI/AuthNav";
import { Outlet } from "react-router-dom";
import { Typography, Stack } from "@mui/material";

function LoginPage() {
    return (
        <>
            <Typography variant="h2">Login</Typography>
            <Stack spacing={3}>
                <AuthNav></AuthNav>
                <Outlet></Outlet>
            </Stack>
        </>
    );
}

export default LoginPage;
