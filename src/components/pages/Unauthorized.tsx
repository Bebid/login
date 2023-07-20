import ReactDOM from "react-dom";
import { Typography } from "@mui/material";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";

import Announcement from "../UI/Announcement";
import MyLink from "../UI/MyLink";

type Unauthorized = {
    timerCount: number;
};

function Unauthorized({ timerCount }: Unauthorized) {
    return (
        <Announcement
            icon={
                <BlockOutlinedIcon
                    color="warning"
                    style={{ fontSize: "40px" }}
                />
            }
            title="Unauthorized access"
        >
            <Typography>
                Will automatically redirect to <MyLink to="/">Home</MyLink> page
                in {timerCount}
            </Typography>
        </Announcement>
    );
}

export default Unauthorized;
