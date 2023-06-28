import React from 'react';
import { Outlet } from 'react-router-dom';
import './admin.css'

import Header from '@/components/admin/Header'
import SideMenu from '@/components/admin/SideMenu'



const ALayout = () => {
    return (
        <div className="Alayout flex "> 
            <div className=" items-start">
            <SideMenu/>
            </div>
            <div className=" flex flex-col flex-1">
                <Header/> 
                <div className="h-full">
                    <Outlet/>
                </div>
            </div>
            
        </div>
    );
};

export default ALayout; 