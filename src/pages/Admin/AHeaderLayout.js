import React from 'react';
import { Outlet } from 'react-router-dom';

import './admin.css'

import Header from '@/components/admin/Header'
import SideMenu from '@/components/admin/SideMenu'



const AHeaderLayout = () => {
    return (
        <div className="Alayout"> 
            <Header/> 
            <div id="admin">
            
                <div id ="admin_body"><Outlet/></div>
            </div>
            
        </div>
    );
};

export default AHeaderLayout; 