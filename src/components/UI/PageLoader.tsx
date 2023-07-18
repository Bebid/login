import CenteredContent from "../../layouts/CenteredContent";
import { Typography } from "@mui/material";

function PageLoader() {
    return (
        <CenteredContent title="Loading..." spacing={2}>
            <Typography>
                Apps component are being rendered. Please wait for a while.
            </Typography>
        </CenteredContent>
    );
}

export default PageLoader;
