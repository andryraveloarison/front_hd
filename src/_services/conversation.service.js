import Axios from "./caller.service";

// Ticket

let addConversation = (conversation) => {
    return Axios.put('/conversation/new',conversation)
}


let getConversation = (id) => {
    return Axios.get('/conversation/'+id)
    
}


export const conversationService = {
    addConversation,getConversation
}