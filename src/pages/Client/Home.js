import React from 'react';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';

const Home = () => {

    const user = useSelector(selectUser)

    return (
        <div>
            Bienvenu utilisateur : {user.nom} 
        </div>
    );
};

export default Home;