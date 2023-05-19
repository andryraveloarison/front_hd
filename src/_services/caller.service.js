import axios from 'axios'
import { accountService } from './account.service'

const Axios = axios.create({
    baseURL: 'http://localhost:5000'
})

/**
 * Intercepteur pour le token
 */

Axios.interceptors.request.use(request => {

    if(accountService.isLogged()){
        
        request.headers.Authorization = 'Bearer '+accountService.getTocken()
    }

    return request
})

export default Axios
