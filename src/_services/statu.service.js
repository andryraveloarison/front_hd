import Axios from "./caller.service"

const statu = [
    "indefini", //0
    "cree",     //1
    "modifie",  //2
    "supprime", //3
    "nouveau",  //4
    "en cours", //5
    "en attente",   //6
    "resolu",   //7
]

const action = [
    "resoudre", //4
    "mettre en attente",  //5
    "resoudre", //6
    "resolu",   //7
]




let getStatu = (id) => {
    return statu[id]
}

let getAction = (id) => {
    return action[(id-4)]
}


let supprimerTicket = (id) => {
    return Axios.get('/statu/supprimer/'+id)
}

let cloturerTicket = (id) => {
    return Axios.get('/statu/cloturer/'+id)
}

export const statuService = {
    getStatu,getAction,supprimerTicket,cloturerTicket
}