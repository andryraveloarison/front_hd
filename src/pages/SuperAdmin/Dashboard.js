import React from 'react';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';


const Dashboard = () => {

    const user = useSelector(selectUser)

    return (
        <div className="Dashboard">
            Ici la dashboard du super admin {user.nom}
        </div>
    );
};

export default Dashboard;