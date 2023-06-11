import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { accountService } from '@/_services/account.service';
import { notificationService} from '@/_services/notification.service'
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import {Link} from 'react-router-dom'


const Header = () => {

    
    let navigate = useNavigate()
    const user = useSelector(selectUser)
    const [nbNotif,setnbNotif] = useState(0)
    const [notification, setNotification] = useState([])

    useEffect(()=>{
        notificationService.get_nbNotif_NonLu(user.id).then((res) =>
        res.data !==0 && setnbNotif(res.data))
        notificationService.get_notif_NonLu(user.id).then((res) => setNotification(res.data))
    },[])
    
    const [showNotifications, setShowNotifications] = useState(false);
      
    const toggleNotificationList = () => {
          setShowNotifications(!showNotifications);
          setnbNotif(0)
          notificationService.set_notification_Lu(user.id)
        };


    //Socket
    const [socket, setSocket] = useState(null)


    useEffect(() => {
		setSocket(io('http://localhost:8080'))
	}, [])


    useEffect(() => {
        if(socket && user)
        {
            const data = {
                userId: user.id,
                userRole: user.role,
            }
            socket.emit('addUser', {data});
            
            socket.on('getNotification', newNotification => {        
                    alert(newNotification.contenu)
                    var today = new Date(),
                    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
                    setNotification((prevNotification) => 
                        [
                          ...prevNotification,
                          {notification:newNotification.contenu,
                          date: date,}

                        ]);
                        setnbNotif(prevNbNotif => prevNbNotif + 1);

            })
        }
		
	}, [socket])

    const logout = (e) => {
        if(socket){
            socket.emit('disconnecte', user.id);
        }
        accountService.logout()
        navigate('/')
    }
    

    return (

        <div className='CHeader flex items-end'>
            <div className=" flex text-white py-4">
                <ul className='list-none flex'>
                    <li className='px-10'><Link to="home">Accueil</Link></li>
                    <li className='px-10'><Link to="ticket">Ticket</Link></li>
                    <li className='px-10'><Link to="chat">Discussion</Link></li>
                </ul>
            
            </div>

            <div className=" flex items-end justify-start text-white py-4 px-16">
                <button
                    onClick={toggleNotificationList}
                    > 
                    Notification {nbNotif !==0 && (nbNotif)}
                </button>
                    {showNotifications && (
                    <div className="notificationList fixed top-10 bg-blue-500 py-4 my-4 w-40 ">
                        <ul>
                            {
                                notification.length === 0 ? (
                                    <li> Aucune notification</li>
                                ):(
                                    notification.slice(-5)
                                    .sort((a, b) => b.id - a.id)
                                    .map((notif) => (
                                    <li className="notificationItem mb-2">{notif.notification}</li>
                                    ))
                                )
                            }
                        
                        </ul>
                    </div>
                    )}
            
                <button onClick={(e) => logout(e)}className="bg-red-500 text-white font-bold  px-4 rounded">
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;