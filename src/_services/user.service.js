import Axios from "./caller.service";
import { accountService } from "./account.service";

let getAllUsers = () => {
    return Axios.get('/user')
}

let getUser = (uid) => {
    return Axios.get('/user/'+uid)

}

let updateUser = (user) => {
    return Axios.patch('/user/edit/'+user.id, user)
}

let addUser = (user) => {

    return Axios.put('/user/register',user)
}

let getUserConnected = () => {


    const token = accountService.getTocken()

    const sendToken = {type:'token', token:token}

    
 
    return Axios.post('/user/userConnected/',sendToken)

}


export const userService = {
    addUser,getAllUsers,getUser,updateUser,getUserConnected
}

