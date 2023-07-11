import React from "react";
import { NavLink } from "react-router-dom";
import { Stack, Link } from "@mui/material";
import "./nav.css";

function AuthNav() {
    return (
        <Stack spacing={2} direction="row">
            <Link
                component={NavLink}
                style={{ textDecoration: "none" }}
                to="email"
            >
                Email
            </Link>
            <Link
                component={NavLink}
                style={{ textDecoration: "none" }}
                to="phone"
            >
                Phone
            </Link>
        </Stack>
    );
}

export default AuthNav;
