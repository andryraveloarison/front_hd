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
                    User
                    <ul>
                        <li><Link to="/admin/user/index">Liste</Link></li>
                        <li><Link to="/admin/user/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Ticket
                    <ul>
                        <li><Link to="/admin/ticket/index">Liste</Link></li>
                        <li><Link to="/admin/ticket/current">En cours</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;