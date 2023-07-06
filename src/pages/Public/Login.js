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

    const [credentials, setCredentials]=useState({
        email: 'admin@gmail.com',
        password:'admin'
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
                image: res.data.image
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
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <div className="group">
          <h2 className="text-xl font-bold">Se connecter</h2>
          <label htmlFor="login" className="mt-2">
            Identifiant
          </label>
          <input
            type="text"
            name="email"
            value={credentials.email}
            onChange={onChange}
            className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="group">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Connexion
          </button>
        </div>
        {erreur && <span className="text-red-500">{erreur}</span>}
      </form>
      
    );
};

export default Login;