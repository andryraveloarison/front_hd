import React,{useState} from 'react';
import { userService } from '@/_services/user.service';
import { useNavigate } from 'react-router-dom';


const UserAdd = () => {

    const [user, setUser] = useState({
        nom: '',
        email: '',
        password: '',
      });
    const navigate = useNavigate()

    const onChange=(e) =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=(e) =>{
        e.preventDefault()
        userService.addUser(user)
            .then(res => {
                navigate('/login')
            })
            .catch(err => console.log(err))
        
    }


    return (
        
        <form onSubmit={onSubmit} className="flex flex-col space-y-4">
        <h2 className="text-xl font-bold">Nouveau utilisateur</h2>
        <div className="group">
          <label htmlFor="nom">Nom</label>
          <input
            type="text"
            name="nom"
            value={user.nom}
            onChange={onChange}
            className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      
        <div className="group">
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            value={user.email}
            onChange={onChange}
            className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      
        <div className="group">
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={onChange}
            className="border border-gray-300 rounded px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      
        <div className="group">
          <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
            Ajouter
          </button>
        </div>
      </form>
      
    
    );
};

export default UserAdd;