import React from "react";
import { Link as MuiLink, Typography } from "@mui/material";
import { Link as RouteLink, NavLink } from "react-router-dom";

type Link = {
    to: string;
    children: string;
    component?: "link" | "nav-link";
};

function MyLink({ to, children, component = "link" }: Link) {
    return (
        <Typography style={{ display: "inline-block" }}>
            <MuiLink
                component={component === "link" ? RouteLink : NavLink}
                to={to}
                style={{ textDecoration: "none" }}
            >
                {children}
            </MuiLink>
        </Typography>
    );
}

export default MyLink;
