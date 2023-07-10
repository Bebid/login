import React from "react";
import { Stack, Grid } from "@mui/material";

type ParentComponent = {
    children: React.ReactNode;
};
function CenteredContent({ children }: ParentComponent) {
    return (
        <Stack direction="row" sx={{ height: "100%", paddingTop: "120px" }}>
            <Grid container spacing={2}>
                <Grid item xs={0} sm={2} md={4} lg={4}></Grid>
                <Grid item xs={12} sm={8} md={4} lg={4} sx={{ minWidth: 300 }}>
                    <Stack spacing={2}>{children}</Stack>
                </Grid>
                <Grid item xs={0} sm={2} md={4} lg={4}></Grid>
            </Grid>
        </Stack>
    );
}

export default CenteredContent;
