import React from "react";
import { NavLink } from "react-router-dom";
import { Stack } from "@mui/material";

function AuthNav() {
    return (
        <Stack spacing={2} direction="row">
            <NavLink to="email">Email</NavLink>
            <NavLink to="phone">Phone</NavLink>
        </Stack>
    );
}

export default AuthNav;
