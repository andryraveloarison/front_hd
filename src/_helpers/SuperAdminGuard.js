import { Navigate } from "react-router-dom";
import { accountService} from '@/_services';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';

const SuperAdminGuard = ({children}) => {

    
    const user = useSelector(selectUser)


    if(!accountService.isLogged()){
        return <Navigate to="/login"/>
    }


    if(user.role===2){
        return  <Navigate to="/user"/>
    }
    if(user.role === 1){
        return  <Navigate to="/admin"/>
    }
    if(user.role == 3){
        return children
    }

    return children
};

export default SuperAdminGuard;