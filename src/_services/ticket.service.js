import Axios from "./caller.service";

// Ticket

let addTicket = (ticket) => {

    return Axios.put('/ticket/add',ticket, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
}


let getAll = () => {
    return Axios.get('/ticket')
}

let getCurrent = () => {
    return Axios.get('/ticket/current')
}

let getMyTickets = (id) => {
    return Axios.get('/ticket/myTickets/'+id)
}

export const ticketService = {
    getAll,getCurrent,getMyTickets,addTicket
}