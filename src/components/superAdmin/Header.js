import React, { useState, useEffect } from 'react';
import { accountService } from '../../_services/account.service';
import { notificationService} from '../../_services/notification.service'
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import Notification from "../../assets/notification.png";


const Header = () => {

    

    const user = useSelector(selectUser)
    const [nbNotif,setnbNotif] = useState(0)
    const [notification, setNotification] = useState([])

    useEffect(()=>{
        notificationService.get_nbNotif_NonLu(user.id).then((res) =>
        res.data !==0 && setnbNotif(res.data))
        notificationService.get_notif_NonLu(user.id).then((res) => setNotification(res.data))
    },[user.id])
    
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
		
	}, [socket,user])

    const logout = (e) => {
        if(socket){
            socket.emit('disconnecte', user.id);
        }
        accountService.logout()
        
        window.location.href = '/';
    }
    

    return (
        <div className="AHeader flex items-end  text-black py-4 px-6 " style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 999 }}>
                <button onClick={toggleNotificationList} > 

                <div className="relative m-6 inline-flex w-fit ">
                            {
                                nbNotif !==0 && (
                                <div
                                className="absolute w-4 bottom-auto left-8 right-0 top-0 z-10 inline-block -translate-y-1/2 translate-x-1 rotate-0 skew-x-0 skew-y-0 scale-x-88 scale-y-100 whitespace-nowrap rounded-full bg-red-700 py-1 text-center align-baseline text-xs font-bold leading-none text-white">
                                {nbNotif !==0 && (nbNotif)}
                                </div>
                                )
                            }
                            <div
                                className="flex items-center justify-center rounded-lg  px-8 text-center text-white">
                                <img src={Notification}
                                alt="icon notification" 
                                className={`absolute cursor-pointer w-8`}
                                />
                            </div>
                        </div>
                    
                </button>
                {showNotifications && (
                <div className="notificationList fixed top-12  bg-secondary py-1 my-4 w-41 border-b">
                   
                   <ul className="m-0 p-0 border-b dark:border-neutral-600">
                    {notification.length === 0 ? (
                        <li> Aucune notification</li>
                    ) : (
                        notification
                            .slice(-5)
                            .sort((a, b) => b.id - a.id)
                            .map((notif, index) => (
                                <React.Fragment key={index}>
                                    <li className="notificationItem m-0 p-0">{notif.notification}</li>
                                    {index !== notification.length - 1 && <hr />}
                                </React.Fragment>
                            ))
                    )}
                </ul>

                </div>
                )}
           

            <button onClick={(e) => logout(e)}className="bg-red-500 text-white font-bold px-4 rounded">
                Logout
            </button>
        </div>
    );
};

export default Header;



