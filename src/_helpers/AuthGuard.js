import { Navigate } from "react-router-dom";

const AuthGuard = (children) => {
    let logged = false

    if(!logged){
        return <Navigate to="/auth/login"/>
    }

    return children
};

export default AuthGuard;