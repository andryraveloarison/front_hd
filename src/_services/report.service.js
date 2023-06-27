import Axios from "./caller.service";

// Dashboard


let getStatAll = () => {
    return Axios.get('/dashboard/statAll')
}

let getStatLast = () => {
    return Axios.get('/dashboard/statLast')
}

let getStatUser = () => {
    return Axios.get('/dashboard/statUser')
}

let getStatCurrent = () => {
    return Axios.get('/dashboard/statCurrent')
}


export const reportService = {
    getStatAll,getStatCurrent,getStatLast,getStatUser
}