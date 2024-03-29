import Axios from "./caller.service"

let login = (credentials) => {
    return Axios.post('/auth/login', credentials)
}

let saveToken = (token) => {
    localStorage.setItem('token',token)
}

let logout = () => {
    localStorage.removeItem('token')
    return true
}

let isLogged = () => {
    let token = localStorage.getItem('token')
    return !!token 
}

let getTocken = () => {
    return localStorage.getItem('token')
}


export const accountService = {
    login, saveToken, logout, isLogged,getTocken
}

