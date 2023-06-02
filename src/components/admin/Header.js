import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'


const Header = () => {

    
    let navigate = useNavigate()
    const user = useSelector(selectUser)

    console.log(user)



    //Socket
    const [socket, setSocket] = useState(null)

    useEffect(() => {
		setSocket(io('http://localhost:8080'))
	}, [])


    useEffect(() => {
        if(socket)
        {
            const data = {
                userId: user.id,
                userRole: user.role,
            }
            socket.emit('addUser', {data});
            socket.on('getNotification', notification => {        
                    alert(notification)
            })
        }
		
	}, [socket])

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