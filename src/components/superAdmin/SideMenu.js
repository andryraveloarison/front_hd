import React from 'react';
import { Link } from 'react-router-dom';

const SideMenu = () => {
    return (
        <div className="SideMenu">
            <ul>
                <li><Link to="">Acceuil</Link></li>
                <li>&nbsp;</li>
                <li><Link to="/superAdmin/dashboard">Dashboard</Link></li>
                <li>
                    User
                    <ul>
                        <li><Link to="/superAdmin/user/index">Liste</Link></li>
                        <li><Link to="/superAdmin/user/add">Ajouter</Link></li>
                    </ul>
                </li>
                <li>
                    Ticket
                    <ul>
                        <li><Link to="/superAdmin/ticket/index">Liste</Link></li>
                        <li><Link to="/superAdmin/ticket/current">En cours</Link></li>
                    </ul>
                </li>
                <li>
                    <li><Link to="/superAdmin/chat/index">Discussion</Link></li>
                </li>
            </ul>
        </div>
    );
};

export default SideMenu;