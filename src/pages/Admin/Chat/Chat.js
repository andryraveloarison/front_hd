import Avatar from '@/assets/avatar.svg'
import Input from '@/components/Input';
import { messageService, conversationService, statuService, notificationService } from '@/_services';
import { useQuery } from 'react-query';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { io } from 'socket.io-client'
import { toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Chat = () => {

    const user = useSelector(selectUser)
    const[messages,setMessages] = useState({
        messages:[],
        contenu:{}
        })

    const [message,setMessage] = useState()

    const [load, setLoad] = useState(false)
    const [conversations,setConversations] = useState([])


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
            socket.on('getUsers', users => {
                console.log('activeUsers :>> ', users);
            })
            socket.on('getMessage', data => {
                console.log("mandray message = "+ data)
                // Mettre à jour l'état avec le nouveau tableau
                setMessages(prevState => ({
                ...prevState, // Copie du state existant
                messages: [...prevState.messages, data] // Mise à jour du tableau messages.messages
                }));
           
            })
            socket.on('getNotification', notification => {
                alert(notification.contenu)
                const updateConversation=conversationService.getConversation(user.id).then((res) => 
                setConversations(res.data.conversation))
                
            })
        }
		
	}, [socket])

	

    const { isLoading, isError, data: dataConversations, error } = useQuery(
        'conversations',
        () => conversationService.getConversation(user.id).then((res) => res.data.conversation)
      );
    
      if (isLoading){
        return <div>Loading...</div>;
      } else {
        if(load === false)
        {
          setConversations(dataConversations)
          setLoad(true)
        }
        
      } 
      if (isError) return <div>{error.message}</div>;




    const fetchMessage = (conversationId,ticketTitre,ticketContenu,receiverNom,statuId,receiverId,statu_user_ticket) => {

        
        messageService.getMessage(conversationId)
        .then(res => {
            setMessages({messages:res.data,
                        contenu:{ticketTitre:ticketTitre,
                                 ticketContenu:ticketContenu,
                                 receiverNom:receiverNom,
                                 statuId:statuId,
                                 statu_user_ticket:statu_user_ticket,
                                 },
                        conversationId:conversationId,
                        receiverId: receiverId
                    })
        })
        .catch(err => console.log(err))
    }




    if(conversations.length !== 0 && Object.keys(messages.contenu).length === 0){
        const lastConversation = conversations.slice(0, 1)[0]; // Obtenir le dernier élément de conversations
        const { conversationId, ticketTitre, ticketContenu, receiverNom, statuId, receiverId,statu_user_ticket } = lastConversation;
        fetchMessage(conversationId, ticketTitre, ticketContenu, receiverNom, statuId, receiverId, statu_user_ticket);
    }


    const sendMessage =(e) =>{
        e.preventDefault()
        const newMessage ={
            senderId:user.id,
            message: message,
            conversationId:messages.conversationId,
            receiverId: messages.receiverId
        }  

        if(socket){
            socket.emit('sendMessage', {
                newMessage
            });
        }
        
        messageService.addMessage(newMessage).then(res => {
            
            setMessage('')
        })
        .catch(err => console.log(err))

    }


    const cloturer = (id, ticketTitre, receiverId) => {

        const notification ="Votre ticket sur "+ ticketTitre+ " est resolu"
        const dataNotif = {
            receiverId: receiverId,
            contenu:notification
          }
          if (socket) {
            socket.emit('sendNotification', dataNotif);
            }

            //Ajouter le notification dans la base
            notificationService.addNotification({
                userId: receiverId,
                contenu: notification
            })
               

        statuService.cloturer(id)
        .then(res => {
            alert('Le ticket est resolu')
            window.location.reload();
    
        })
        .catch(err => console.log(err))
    }


    const action = (statu_user_ticket, ticketTitre, receiverId, conversationId) => {   

        const updatedState = {
            messages: messages.messages,
            contenu: {
              ...messages.contenu,
              statuId : messages.contenu.statu_user_ticket === statu_user_ticket &&
                                  messages.contenu.statuId === 5 ? 7 : 5,
            },
            conversationId: messages.conversationId,
            receiverId: messages.receiverId
        
          };
          
          let notification=""
          let statuChanged=0
          if(updatedState.contenu.statuId === 7){
            notification ="Votre ticket sur "+ ticketTitre+ " est en attente"
            statuChanged=7
            statuService.enAttente(statu_user_ticket)

          }else{
            notification ="Votre ticket sur "+ ticketTitre+ " est en cours"
            statuChanged=5
            statuService.enCours(statu_user_ticket)

          }
          setMessages(updatedState);

          // Modification du conversation

        const updatedConversations = conversations.map(conversation => {
            if (conversation.conversationId === conversationId) {
                return {
                ...conversation,
                statuId: statuChanged
                };
            }
            return conversation;
            });

        setConversations(updatedConversations);

          const dataNotif = {
            receiverId: receiverId,
            contenu:notification
          }
          if (socket) {
            socket.emit('sendNotification', dataNotif);
            }

           //Ajouter le notification dans la base
            notificationService.addNotification({
                userId: receiverId,
                contenu: notification
            })
               

    }

    
    
    return (
        <div className='w-screen flex'>
            <div className='w-[25%]  h-screen bg-secondary'>
                <div className='flex items-center my-8 mx-14'>
                <div className='border border-primary p-[2px] rounded-full'>
                    <img src={Avatar} width={75} height={75}/>
                </div>
                    <div className='ml-8'>
                        <h3 className='text-0.5xl'> {user.nom} </h3>
                        <p className="text-lg font-light"> Mon compte</p>
                    </div>
                </div>
                <hr/>
                <div className='mx-14 mt-10'>
                    <div className='text-primary text-lg '>Messages</div>
                    <div>
                        {
                            conversations.length === 0 ? (
                                <></>
                              ) : (
                                
                            conversations.map (({statuId,receiverNom,conversationId,ticketTitre,ticketContenu,receiverId,statu_user_ticket})=>{
                                return( 
                                    <div className='flex items-center py-8 border-b border-b-gray-300'>
                                        <div className='cursor-pointer flex items-center' onClick={()=> fetchMessage(conversationId,ticketTitre,ticketContenu,receiverNom,statuId,receiverId,statu_user_ticket)}>
                                            <div>
                                                <img src={Avatar} width={60} height={60}/>
                                            </div>
                                            <div className='ml-6'>
                                                    <h3 className='text-lg font-semibold'> {receiverNom}</h3>
                                                    <p className="text-lg font-light text-gray-600"> {statuService.getStatu(statuId)}</p>
                                            </div>
                                        </div>
                                       

                                    </div>
                                )
                            } )
                        )}
                    </div>
                </div>
            </div>
            <div className='w-[50%]  h-screen border flex flex-col items-center'>

            {
                Object.keys(messages.contenu).length === 0 && conversations.length === 0? (
                        <div className='text-center text-lg font-semibold mt-24'> Aucun ticket en cours</div>
                ) : (
                
                    <div className="w-[75%] bg-secondary h-[100px] mt-14 rounded-full flex justify-between items-center px-14">
                    <div>
                      <img src={Avatar} width={60} height={60}/>
                    </div>
                    <div className="ml-6">
                      <h3 className='text-lg'> {messages.contenu.receiverNom} </h3>
                      <p className="text-lg font-light text-gray-600"> {statuService.getStatu(messages.contenu.statuId)}</p>
                    </div>
                    <div className="flex items-center">
                      <div className="ml-auto">
                      <button
                        onClick={() => action(messages.contenu.statu_user_ticket, 
                                              messages.contenu.ticketTitre,
                                              messages.receiverId,
                                              messages.conversationId)}
                        className="bg-blue-500 text-white font-bold rounded mr-2 text-base w-[100px] h-10" // Ajoutez les classes de dimensionnement ici
                        >
                        {statuService.getAction(messages.contenu.statuId)}
                        </button>
                        <button className="bg-green-500 hover:bg-green-700 text-white font-bold h-10 w-16 rounded" onClick={() => cloturer(messages.contenu.statu_user_ticket, 
                                                                                                                                           messages.contenu.ticketTitre,
                                                                                                                                           messages.receiverId)}>Resolu</button>
                      </div>
                    </div>
                  </div>
                  
                

                              
               
            )}

                <div className='h-[75%] w-full overflow-scroll shadow-sm'>
                    <div className="p-14">
                    {
                            messages.messages.length === 0 && Object.keys(messages.contenu).length !== 0? (
                                
                                <div className='text-center text-lg font-semibold mt-24'> Aucun message</div>
                              ) : (
                                
                            messages.messages.map (({message,senderId})=>{
                               
                                if(senderId===user.id){  
                                    return(
                                        <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
                                            {message}
                                        </div>

                                    )
                                        
                                }else
                                {
                                    return(
                                        <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6">
                                        {message} 
                                    </div>
                                    )                 
                                
                                }
                               
                            } )
                        )}

                    </div>
                </div>
            
                {
                Object.keys(messages.contenu).length === 0? (
                        <div></div>
                ) : (
                    <div className="p-14 w-full flex items-center">
                    <Input placeholder='new message' value={message} onChange={(e)=> setMessage(e.target.value)} className='w-[75%]' inputClassName='p-4 border-0 shadow-md 
                    rounded-full bg-light focus: ring-0 focus:border-0 outline-none'/>
                            <div className='ml-4 p-2 cursor-pointer bg-light rounded-full' onClick={sendMessage} >
                            <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                        <line x1="10" y1="14" x2="21" y2="3" />
                            <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                            </svg>
                        </div>                                                                                                                                                                                                                                                                                                                                                                                                                                      

                  
                </div>                                                                                          
                )}

            </div>
            <div className='w-[25%]  h-screen'>
                    
            {
                Object.keys(messages.contenu).length === 0? (
                        <></>
                ) : (
                            
                <>
                    <div className='flex items-center justify-center py-8 border-b border-b-gray-300'>
                        <h3 className='text-lg text-center'>{messages.contenu.ticketTitre}</h3>
                    </div>
                    <div className='flex items-center justify-center py-8 border-b border-b-gray-300'>
                        <p className="text-lg font-light text-gray-600 text-center">{messages.contenu.ticketContenu}</p>
                    </div>  
                </>
               
            )}
            
            </div>                                                                                                                                                                                                                                                                                                       
            
        </div>                                                                                                                                                                             
    );
};

export default Chat;