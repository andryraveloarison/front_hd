import React, {useRef,useEffect,useState} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { userService } from '@/_services';


const UserEdit = () => {
    const [user, setUser]=useState({})
    const flag = useRef(false)
    
    const navigate = useNavigate()
    let param = useParams()

    

    const onChange=(e) =>{
        setUser({
            ...user,
            [e.target.name]:e.target.value
        })
    }

    const onSubmit=(e) =>{
        e.preventDefault()
        console.log(user)

        userService.updateUser(user)
            .then(res => {
                navigate('../index')
            })
            .catch(err => console.log(err))
        
    }

    
    useEffect (()=>{

        if(flag.current === false){

            userService.getUser(param.uid)
            .then(res => {
                setUser(res.data)
            })
            .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    return (
        <div className="UserEdit">
            Editer un utilisateur
            <form onSubmit={onSubmit}>
            <div className="group">
                <label htmlFor="email">Email</label>
                <input type="text" name="email" value={user.email} onChange={onChange}/>
            </div>
            <div className="group">
                <label htmlFor="nom">Nom</label>
                <input type="text" name="nom" value={user.nom} onChange={onChange}/>
            </div>
            <div className="group">
                <button>Modifier</button>
            </div>

        </form>
        </div>
    );
};

export default UserEdit;