import ReactDOM from "react-dom";

import CenteredContent from "../../layouts/CenteredContent";
import PageHeader from "./PageHeader";

function PageLoader() {
    return ReactDOM.createPortal(
        <div
            style={{
                position: "fixed",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
            }}
        >
            <CenteredContent>
                <PageHeader
                    title="Loading..."
                    description="App's components are being rendered. Please wait for a
                    while."
                ></PageHeader>
            </CenteredContent>
        </div>,
        document.getElementById("portal") as Element
    );
}

export default PageLoader;
