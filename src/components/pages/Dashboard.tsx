import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext, authContext } from "../../App";

function Dashboard() {
    const { auth } = useContext(authContext) as AuthContext;
    console.log(auth);
    const nav = useNavigate();

    const logout = () => {
        auth?.signOut().then(() => {
            nav("/login");
        });
    };

    return (
        <div>
            Welcome Home!<button onClick={logout}>Logout</button>
        </div>
    );
}

export default Dashboard;
