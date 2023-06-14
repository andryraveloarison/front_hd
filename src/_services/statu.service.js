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
    "lu",        //8
    "non lu",    //9
    "non resolu" //10


]

const action = [
    "resoudre", //4
    "en attente",  //5
    "resoudre", //6
    "resoudre", //7
    "resolu",   //8
    "resoudre",   //8
    "resoudre",   //8

]




let getStatu = (id) => {
    return statu[id]
}

let getAction = (id) => {
    return action[(id-4)]
}


let supprimer = (id) => {
    return Axios.patch('/statu/supprimer/'+id)
}

let cloturer = (id) => {
    return Axios.patch('/statu/cloturer/'+id)
}

let nonCloturer = (id) => {
    return Axios.patch('/statu/nonCloturer/'+id)
}

let enAttente = (id) => {
    return Axios.patch('/statu/enAttente/'+id)
}

let enCours = (id) => {
    return Axios.patch('/statu/enCours/'+id)
}

export const statuService = {
    getStatu,
    getAction,
    supprimer,
    cloturer,
    nonCloturer,
    enAttente,
    enCours
}