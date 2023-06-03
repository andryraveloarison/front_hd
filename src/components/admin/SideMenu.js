import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <div className="SideMenu">
            <ul>
                <li><Link to="">Acceuil</Link></li>
                <li>&nbsp;</li>
                <li><Link to="/admin/dashboard">Dashboard</Link></li>
                
                <li>
                    <li><Link to="/admin/chat/index">Discussion</Link></li>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;