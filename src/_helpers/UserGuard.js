import { Navigate } from "react-router-dom";
import { accountService,userService } from '@/_services';
import { useState } from "react";


const AuthGuard = ({children}) => {

    const [role, setRole] = useState()

    if(!accountService.isLogged()){
        return <Navigate to="/login"/>
    }

    userService.getUserRole().then(
        res => {
        setRole(res.data.roleId)
            })
    .catch(err => console.log(err))


    if(role===1){
        return  <Navigate to="/admin"/>
    }
    if(role === 2)
    {
        return children
    }

};

export default AuthGuard;