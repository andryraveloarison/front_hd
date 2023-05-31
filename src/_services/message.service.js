import Axios from "./caller.service";

// Ticket

let addMessage = (message) => {
    return Axios.put('/message/new',message)
}


let getMessage = (id) => {
    return Axios.get('/message/'+id)
}


export const messageService = {
    addMessage,getMessage
}