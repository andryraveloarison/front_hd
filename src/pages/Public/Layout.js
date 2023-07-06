import React from 'react';
import Header from '@/components/public/Header';
import { Outlet,Navigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';


const Layout = () => {

    if(accountService.isLogged()){
        return <Navigate to="/admin/"/>
    }


    return (
        <div className='Layout'>
            <Header/>
            
            <Outlet/>
        </div>
    );
};

export default Layout;