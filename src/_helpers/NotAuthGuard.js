import { Navigate } from "react-router-dom";
import { accountService,userService } from '@/_services';
import { useState } from "react";


const NotAuthGuard = ({children}) => {
    const [role, setRole] = useState()


    if(accountService.isLogged()){

 
        userService.getUserRole().then(
            res => {
            setRole(res.data.roleId)
                })
        .catch(
            err => console.log(err)
            )
    
    
        
    
        if(role===2){
            return  <Navigate to="/user"/>
        }
        if(role === 1){
            return <Navigate to="/admin/"/>
        }
        if(role ===3){
            return <Navigate to="/superAdmin"/>
        }
        
    } else{
        return children
    }
    
        

};

export default NotAuthGuard;