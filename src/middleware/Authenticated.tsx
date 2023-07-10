import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext, authContext } from "../App";

type Props = {
    children: any;
};

function Authenticated({ children }: Props) {
    const { user } = useContext(authContext) as AuthContext;

    if (!user) {
        return <Navigate to="/login" />;
    }

    return <>{children}</>;
}

export default Authenticated;
