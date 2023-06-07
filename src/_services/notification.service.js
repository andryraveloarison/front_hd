import Axios from "./caller.service";

// Ticket

let addNotification = (notification) => {
    return Axios.put('/notification/new',notification)
}


let getAllNotification= (id) => {
    return Axios.get('/notification/'+id)
}

let get_notif_NonLu= (id) => {
    return Axios.get('/notification/nonLu/'+id)
}

let get_nbNotif_NonLu= (id) => {
    return Axios.get('/notification/nbNonLu/'+id)
}

let set_notification_Lu= (id) => {
    return Axios.patch('/notification/setLu/'+id)
}

export const notificationService = {
    addNotification,
    get_nbNotif_NonLu,
    get_notif_NonLu,
    set_notification_Lu,
    getAllNotification
}