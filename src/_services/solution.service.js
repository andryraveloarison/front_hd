import Axios from "./caller.service";

// Solution

let addSolution = (solution) => {

    return Axios.put('/solution/add',solution)
}


export const solutionService = {
    addSolution
}