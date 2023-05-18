import React from 'react';
import { useNavigate } from 'react-router-dom';

const User = () => {
    let navigate = useNavigate()

    const marcel =(userId) => {
        console.log('click')
        navigate("../edit/"+userId, {replace: true})
    }


    return (
        <div className="User"> 
            Liste utilisateur
            <button onClick={()=>marcel(4)}> User 4</button>
        </div>
    );
};

export default User;