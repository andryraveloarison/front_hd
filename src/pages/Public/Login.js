import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { login } from "../../features/userSlice"
import { accountService } from '@/_services';

import './auth.css'
import { useDispatch } from 'react-redux';

const Login = () => {

    let navigate = useNavigate()

    const dispatch = useDispatch();
    const [erreur,setErreur] = useState('')
    // const [login, setLogin] = useState('')
    // const [password, setPassword] = useState('')



    const [credentials, setCredentials]=useState({
        email: 'randria@gmail.com',
        password:'123456'
    })

    const onChange=(e) =>{
        setCredentials({
            ...credentials,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=(e) =>{
        e.preventDefault()
        accountService.login(credentials)
        .then(res=>{
            accountService.saveToken(res.data.access_token)
            dispatch(
                login({
                id: res.data.id,
                nom: res.data.nom,
                email: res.data.email,
                role: res.data.role,
                isLoged: true,
            })
            );
            if(res.data.role === 2){
                navigate('/user') 
            }
            navigate('/admin') 
        })
        .catch(
            error => setErreur(error.response.data.message),
            
            )

        
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="group">
                Se connecter
                <label htmlFor="login">Identifiant</label>
                <input type="text" name="email" value={credentials.email} onChange={onChange}></input>
            </div>
            <div className="group">
                <label htmlFor="password">Mot de passe</label>
                <input type="text" name="password" value={credentials.password} onChange={onChange}></input>
            </div>
            <div className="group">
                <button>Connexion</button>
            </div>
            <span color='red'>{erreur}</span>
        </form>
    );
};

export default Login;