import React from 'react';
import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';

import './header.css'

const Header = () => {

    let navigate = useNavigate()

    const logout = () => {
        accountService.logout()
        navigate('/')
    }

    return (
            <header className="pheader">
                <nav>
                    <ul>
                        <li><Link to="home">Accueil</Link></li>
                        <li><Link to="service">Service</Link></li>
                        <li><Link to="contact">Contact</Link></li>
                        <button onClick={logout}>Logout</button>

                    </ul>
                </nav>
            </header>
    );
};

export default Header;