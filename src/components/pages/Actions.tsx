import { useEffect, useState, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { verifyPasswordResetCode, Auth } from "firebase/auth";

import { AuthContext, authContext } from "../../App";
import PageLoader from "../UI/PageLoader";
import useTimer from "../../hooks/useTimer";
import ResetPassword from "../forms/ResetPasswordForm";
import Unauthorized from "./Unauthorized";

function Actions() {
    const navigate = useNavigate();

    const [searchParams] = useSearchParams();
    const actionCode: string = searchParams.get("oobCode") || "";
    const mode: string = searchParams.get("mode") || "";

    const { auth } = useContext(authContext) as AuthContext;

    const [email, setEmail] = useState("");
    const [pageLoading, setPageLoading] = useState(true);

    const [timerCount, startTimer, stopTimer] = useTimer(10);

    useEffect(() => {
        verifyPasswordResetCode(auth as Auth, actionCode)
            .then((response) => {
                setEmail(response);
                setPageLoading(false);
            })
            .catch(() => {
                setEmail("");
                setPageLoading(false);
                startTimer();
            });
    }, []);

    useEffect(() => {
        if (timerCount === 0) {
            stopTimer();
            navigate("/");
        }
    }, [timerCount]);

    if (pageLoading) {
        return <PageLoader />;
    }

    if (mode === "resetPassword" && !email) {
        return <Unauthorized timerCount={timerCount}></Unauthorized>;
    }

    return <ResetPassword />;
}

export default Actions;
