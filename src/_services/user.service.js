import Axios from "./caller.service";

let getAllUsers = () => {
    return Axios.get('/user')
}

let getUser = (uid) => {
    return Axios.get('/user/'+uid)

}


export const userService = {
    getAllUsers,getUser
}

