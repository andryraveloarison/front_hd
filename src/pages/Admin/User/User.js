import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '@/_services/user.service';

const User = () => {
    let navigate = useNavigate()

    const [users,setUsers] = useState([])
    const flag = useRef(false)

    useEffect (()=>{

        if(flag.current === false){

            userService.getAllUsers()
            .then(res => {
                console.log(res.data.user)
                setUsers(res.data.user)
            })
            .catch(err => console.log(err))
        }

        return () => flag.current = true
        
    },[])

    // const marcel =(userId) => {
    //     console.log('click')
    //     navigate("../edit/"+userId, {replace: true})
    // }


    return (
        <div className="User"> 
            Liste utilisateur
            {/* <button onClick={()=>marcel(4)}> User 4</button> */}
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>nom</th>
                    <th>email</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map(user => (
                        <tr>
                            <td>{user.id}</td>
                            <td>{user.nom}</td>
                            <td>{user.email}</td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    );
};

export default User;