import React from 'react';
import {Link} from 'react-router-dom'


import './header.css'

const Header = () => {
    return (
        <div className='CHeader flex justify-center'>
            <div className=" flex text-black py-4 items-end justify-end">
                <ul className='list-none flex'>
                    <li className='px-10'><Link to="home">Accueil</Link></li>
                    <li className='px-10'><Link to ="/login">&nbsp;Se connecter</Link></li>
                    <li className='px-10'><Link to ="/signUp">&nbsp;S'inscrire</Link></li>
                </ul>
            </div>
        </div>    );
};

export default Header;