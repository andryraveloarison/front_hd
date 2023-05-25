import React from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';

const Header = () => {
    let navigate = useNavigate()

    const logout = (e) => {
        
        accountService.logout()
        navigate('/')
    }
    return (
        <div className="AHeader">
            Header de l'admin
            <button onClick={(e) => logout(e)}>Logout</button>
        </div>
    );
};

export default Header;