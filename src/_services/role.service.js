import Axios from "./caller.service"

const role = [
    "indefini", //0
    "admin",     //1
    "user",  //2
]

const action = [
    "aucune",
    "=> user",  //5
    "=> admin", //4

]


let getRole = (id) => {
    return role[id]
}

let getAction = (id) => {
    return action[(id)]
}


let setAdmin = (idUserRole) => {
    return Axios.patch('/user/setRoleAdmin/'+idUserRole)
}

let setUser = (idUserRole) => {
    return Axios.patch('/user/setRoleUser/'+idUserRole)
}

export const roleService = {
    getRole,
    getAction,
    setAdmin,
    setUser
}