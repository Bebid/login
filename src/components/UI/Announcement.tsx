import ReactDOM from "react-dom";
import CenteredContent from "../../layouts/CenteredContent";
import PageHeader from "./PageHeader";
import { Stack } from "@mui/material";

type Announcement = {
    icon: any;
    title: string;
    description?: string;
    children?: JSX.Element;
};

function Announcement({ icon, title, description, children }: Announcement) {
    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                backgroundColor: "white",
                margin: 0,
            }}
        >
            <CenteredContent>
                <Stack spacing={4}>
                    {icon}
                    <PageHeader
                        title={title}
                        description={description}
                    ></PageHeader>
                    {children}
                </Stack>
            </CenteredContent>
        </div>,
        document.getElementById("portal") as Element
    );
}

export default Announcement;
