import React from "react";
import { Stack, Grid } from "@mui/material";
import PageHeader from "../components/UI/PageHeader";

type ParentComponent = {
    children?: React.ReactNode;
    spacing?: number;
    title?: string;
    description?: string;
};
function CenteredContent({
    children,
    spacing,
    title,
    description,
}: ParentComponent) {
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
                    <Stack spacing={spacing || 4}>
                        <PageHeader
                            title={title || ""}
                            description={description}
                        ></PageHeader>
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
