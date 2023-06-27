import React from 'react';
import {Link} from 'react-router-dom'


import './header.css'

const Header = () => {
    return (
        <div className='CHeader flex items-end'>
            <div className=" flex text-white py-4">
                <ul className='list-none flex'>
                    <li className='px-10'><Link to="home">Accueil</Link></li>
                    <li className='px-10'><Link to ="/login">&nbsp;Se connecter</Link></li>
                    <li className='px-10'><Link to ="/signUp">&nbsp;S'inscrire</Link></li>
                </ul>
            </div>
        </div>    );
};

export default Header;