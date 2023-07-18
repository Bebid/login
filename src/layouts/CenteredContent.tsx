import React from "react";
import { Stack, Grid, Typography } from "@mui/material";

type ParentComponent = {
    title?: string;
    children: React.ReactNode;
    spacing?: number;
};
function CenteredContent({ children, spacing, title }: ParentComponent) {
    return (
        <Stack direction="row" sx={{ height: "100%" }} alignItems="center">
            <Grid container spacing={2}>
                <Grid
                    item
                    xs={0}
                    sm={2}
                    md={4}
                    lg={4}
                    sx={{ display: { xs: "none", sm: "block" } }}
                ></Grid>
                <Grid item xs={12} sm={8} md={4} lg={4} sx={{ minWidth: 300 }}>
                    <Stack spacing={spacing || 2}>
                        {title && (
                            <Typography variant="h3" component="h1">
                                {title}
                            </Typography>
                        )}
                        {children}
                    </Stack>
                </Grid>
                <Grid
                    item
                    xs={0}
                    sm={2}
                    md={4}
                    lg={4}
                    sx={{ display: { xs: "none", sm: "block" } }}
                ></Grid>
            </Grid>
        </Stack>
    );
}

export default CenteredContent;
