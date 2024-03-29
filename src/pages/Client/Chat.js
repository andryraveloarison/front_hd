import Input from '../../components/Input';
import { messageService, conversationService, statuService } from '../../_services';
import { useQuery } from 'react-query';
import { selectUser } from '../../features/userSlice';
import { useSelector } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client'

const Chat = () => {

    
    const user = useSelector(selectUser)
    const[messages,setMessages] = useState({
        messages:[],
        contenu:{}
        })

    const messagesRef = useRef(messages);

    useEffect(() => {
              messagesRef.current = messages;
            }, [messages]);

    const [message,setMessage] = useState()

    const [load, setLoad] = useState(false)
    const [conversations,setConversations] = useState([])

    // Socket
    const [socket, setSocket] = useState(null)

    useEffect(() => {
		setSocket(io('http://localhost:8080'))
        // eslint-disable-next-line
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

                if(messagesRef.current.conversationId === data.conversationId){

                    if(user.id === data.receiverId || user.id === data.senderId )
                    {
                        
                        // Mettre à jour l'état avec le nouveau tableau
                        setMessages(prevState => ({
                            ...prevState, // Copie du state existant
                            messages: [...prevState.messages, data] // Mise à jour du tableau messages.messages
                            }));
                    }

                }
               
           
            })

            socket.on('getNotification', notification => {
                alert(notification.contenu)
                const updateConversation=conversationService.getConversation(user.id).then((res) => 
                setConversations(res.data.conversation))

                if(notification.conversationId ){
                    if(notification.conversationId === messagesRef.current.conversationId)
                    {
                        const updatedState = {
                            messages: messagesRef.current.messages,
                            contenu: {
                              ...messagesRef.current.contenu,
                              statuId : messagesRef.current.contenu.statuId === 5 ? 7 : 5,       
                            },
                            conversationId: messagesRef.current.conversationId,
                            receiverId: messagesRef.current.receiverId
                        
                          };

                          setMessages(updatedState);

                    }
                   
                }

            })
        }
        // eslint-disable-next-line
		
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

    const fetchMessage = (conversationId,ticketTitre,ticketContenu,receiverNom,statuId,receiverId, imageProfile) => {
        
        messageService.getMessage(conversationId)
        .then(res => {
            setMessages({messages:res.data,
                        contenu:{ticketTitre:ticketTitre,
                                 ticketContenu:ticketContenu,
                                 receiverNom:receiverNom,
                                 statuId:statuId,
                                 },
                        conversationId:conversationId,
                        receiverId: receiverId,
                        imageProfile: imageProfile
                    })
        })
        .catch(err => console.log(err))
    }
    
    if(conversations.length !== 0 && Object.keys(messages.contenu).length === 0){
        const lastConversation = conversations.slice(0, 1)[0]; // Obtenir le dernier élément de conversations
        const { conversationId, ticketTitre, ticketContenu, receiverNom, statuId, receiverId,  imageProfile } = lastConversation;
        fetchMessage(conversationId, ticketTitre, ticketContenu, receiverNom, statuId, receiverId,  imageProfile);
    }


    const sendMessage =(e) =>{
        e.preventDefault()
        const newMessage ={
            senderId:user.id,
            message: message,
            conversationId:messages.conversationId,
            receiverId: messages.receiverId,
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
  

    
    return (
        <div className='w-screen flex'>
            <div className='w-[25%]  h-screen bg-secondary'>
                <div className='flex items-center my-8 mx-14'>
                <div>
                <img src={require(`../../assets/${user.image}`)} alt="" width={75} height={75}/>
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
                            conversations.map (({statuId,receiverNom,conversationId,ticketTitre,ticketContenu,receiverId, imageProfile})=>{
                                return( 
                                    <div className='flex items-center py-8 border-b border-b-gray-300'>
                                        <div className='cursor-pointer flex items-center' onClick={()=> fetchMessage(conversationId,ticketTitre,ticketContenu,receiverNom,statuId,receiverId, imageProfile)}>
                                            <div>
                                            <img src={require(`../../assets/${imageProfile}`)} width={60} height={60}/>
                                            </div>
                                            <div className='ml-6'>
                                                    <h3 className='text-lg font-semibold'> {receiverNom}  </h3>
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
                                            
                <div className="w-[75%] bg-secondary h-[80px] mt-14 rounded-full flex items-center px-14 ">
                    <div>
                        {
                            messages.imageProfile && (
                            
                             <img src={require(`../../assets/${messages.imageProfile}`)} width={60} height={60}/>
                            )
                        }
                    </div>
                    <div className="ml-6">
                        <h3 className='text-lg '> {messages.contenu.receiverNom} </h3>
                        <p className="text-lg font-light text-gray-600"> {statuService.getStatu(messages.contenu.statuId)}</p>
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