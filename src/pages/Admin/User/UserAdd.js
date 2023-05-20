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
                navigate('../index')
            })
            .catch(err => console.log(err))
        
    }


    return (
        <div className="UserEdit">
        Nouveau utilisateur
        <form onSubmit={onSubmit}>

        <div className="group">
            <label htmlFor="nom">Nom</label>
            <input type="text" name="nom" value={user.nom} onChange={onChange}/>
        </div>

        <div className="group">
            <label htmlFor="email">Email</label>
            <input type="text" name="email" value={user.email} onChange={onChange}/>
        </div>
        
        <div className="group">
                <label htmlFor="password">Mot de passe</label>
                <input type="text" name="password" value={user.password} onChange={onChange}></input>
            </div>
        <div className="group">
            <button>Ajouter</button>
        </div>

    </form>
    </div>
    );
};

export default UserAdd;