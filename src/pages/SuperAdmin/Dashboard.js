import React from 'react';
import StatLast from '@/components/dashboard/StatLast';
import StatUser from '@/components/dashboard/StatUser';
import StatCurrent from '@/components/dashboard/StatCurrent';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';

  
 


const Dashboard = () => {

    const user = useSelector(selectUser)

    return (
        <div className="Dashboard">
            Ici la dashboard du super admin {user.nom}
            <StatLast />
            <StatUser />
            <StatCurrent />
        </div>
    );
};

export default Dashboard;