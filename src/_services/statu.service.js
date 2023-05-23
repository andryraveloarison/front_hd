import Axios from "./caller.service"

const statu = [
    "indefini", //0
    "cree",     //1
    "modifie",  //2
    "supprime", //3
    "nouveau",  //4
    "en cours", //5
    "resolu",   //6
    "en attente",//7

]

const action = [
    "resoudre", //4
    "mettre en attente",  //5
    "resoudre", //6
    "resoudre", //7
    "resolu",   //8
]




let getStatu = (id) => {
    return statu[id]
}

let getAction = (id) => {
    return action[(id-4)]
}


let supprimer = (id) => {
    return Axios.get('/statu/supprimer/'+id)
}

let cloturer = (id) => {
    return Axios.get('/statu/cloturer/'+id)
}

let enAttente = (id) => {
    return Axios.get('/statu/enAttente/'+id)
}

let enCours = (id) => {
    return Axios.get('/statu/enCours/'+id)
}

export const statuService = {
    getStatu,
    getAction,
    supprimer,
    cloturer,
    enAttente,
    enCours
}