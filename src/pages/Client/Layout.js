import React from 'react';
import Header from '../../components/client/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className='Layout'>
            <Header/>
            <Outlet/>
        </div>
    );
};

export default Layout;