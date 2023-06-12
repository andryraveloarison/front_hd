import { Navigate } from "react-router-dom";
import { accountService } from '@/_services';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';


const UserGuard = ({children}) => {

    const user = useSelector(selectUser)

    if(!accountService.isLogged()){
        return <Navigate to="/login"/>
    }


    if(user.role===1){
        return  <Navigate to="/admin"/>
    }
    if(user.role ===3){
        return <Navigate to="/superAdmin"/>
    }
    if(user.role === 2)
    {
        return children
    }

};

export default UserGuard;