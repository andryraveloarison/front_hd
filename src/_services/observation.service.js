import Axios from "./caller.service";

// Solution

let addObservation = (observation) => {

    return Axios.put('/observation/add',observation)
}


export const observationService = {
    addObservation
}