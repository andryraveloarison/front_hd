import React from 'react';
import Header from '@/components/public/Header';
import Menu from '@/components/public/Menu';
import { Outlet,Navigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';


const Layout = () => {

    if(accountService.isLogged()){
        return <Navigate to="/admin/"/>
    }


    return (
        // <div className='Layout'>
        //     <Header/>
            
        //     <Outlet/>
        // </div>

            <div className="Alayout"> 
            <Header/> 
            <div id="admin">
                <Menu/>
                <div id ="admin_body"><Outlet/></div>
            </div>

            </div>
    );
};

export default Layout;