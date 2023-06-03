import React from 'react';
import { Outlet } from 'react-router-dom';

import './admin.css'

import Header from '@/components/superAdmin/Header'
import SideMenu from '@/components/superAdmin/SideMenu'



const ALayout = () => {
    return (
        <div className="Alayout"> 
            <Header/> 
            <div id="admin">
                <SideMenu/>
                <div id ="admin_body"><Outlet/></div>
            </div>
            
        </div>
    );
};

export default ALayout; 