import { Outlet } from "react-router-dom";

import CenteredContent from "../../layouts/CenteredContent";
import AuthNav from "./Authentication/navs/AuthNav";

function Login() {
    return (
        <CenteredContent title="Login">
            <AuthNav></AuthNav>
            <Outlet />
        </CenteredContent>
    );
}

export default Login;
