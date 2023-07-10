import AuthNav from "../components/Auth/UI/AuthNav";
import { Outlet, Link } from "react-router-dom";

function LoginPage() {
    return (
        <>
            <AuthNav></AuthNav>
            <Outlet />
            <Link to="/signup">Signup</Link>
        </>
    );
}

export default LoginPage;
