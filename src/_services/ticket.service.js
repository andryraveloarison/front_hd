import Axios from "./caller.service";

// Ticket
let getAll = () => {
    return Axios.get('/ticket')
}

let getCurrent = () => {
    return Axios.get('/ticket/current')
}

export const ticketService = {
    getAll,getCurrent
}