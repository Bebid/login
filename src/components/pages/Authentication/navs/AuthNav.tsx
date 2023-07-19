import { NavLink } from "react-router-dom";
import { Stack, Link } from "@mui/material";

import MyLink from "../../../UI/MyLink";
import "../../../../assets/styles/nav.css";

function AuthNav() {
    return (
        <Stack spacing={2} direction="row">
            <MyLink component="nav-link" to="email">
                Email
            </MyLink>
            <MyLink component="nav-link" to="phone">
                Phone
            </MyLink>
        </Stack>
    );
}

export default AuthNav;
