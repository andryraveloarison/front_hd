import Avatar from '@/assets/avatar.svg'
import Input from '@/components/Input';
import { messageService, conversationService } from '@/_services';
import { useQuery } from 'react-query';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';

const Chat = () => {

    const user = useSelector(selectUser)

    const { isLoading, isError, data: conversations, error } = useQuery(
        'conversations',
        () => conversationService.getConversation(user.id).then((res) => res.data.conversation)
      );
    
      if (isLoading) return <div>Loading...</div>;
      if (isError) return <div>{error.message}</div>;


        const contacts = [
            {
                name: 'test',
                status: 'Available',
                img: Avatar
            },
            {
                name: 'test1',
                status: 'Available',
                img: Avatar
            },
            {
                name: 'test2',
                status: 'Available',
                img: Avatar
            }
        ]

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
                            conversations.map (({statuId,userNom})=>{
                                return(
                                    <div className='flex items-center py-8 border-b border-b-gray-300'>
                                        <div className='cursor-pointer flex items-center'>
                                            <div>
                                                <img src={Avatar} width={60} height={60}/>
                                            </div>
                                            <div className='ml-6'>
                                                    <h3 className='text-lg font-semibold'> {userNom} </h3>
                                                    <p className="text-lg font-light text-gray-600"> {statuId}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            } )
                        }
                    </div>
                </div>
            </div>
            <div className='w-[50%]  h-screen border flex flex-col items-center'>
                <div className="w-[75%] bg-secondary h-[80px] mt-14 rounded-full flex items-center px-14 ">
                    <div>
                        <img src={Avatar} width={60} height={60}/>
                    </div>
                    <div className="ml-6">
                        <h3 className='text-lg '> Test </h3>
                        <p className="text-lg font-light text-gray-600"> Online</p>
                    </div>
                </div>
                <div className='h-[75%] w-full overflow-scroll shadow-sm'>
                    <div className="p-14">
                        <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6">
                            lorem teslk fdsjkl fdnskjo ajkl efjne fejk
                        </div>
                        <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
                            lorem test dans le message du site helpdesk de l'armp 
                        </div>
                        <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6">
                            lorem teslk fdsjkl fdnskjo ajkl efjne fejk
                        </div>
                        <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
                            lorem test dans le message du site helpdesk de l'armp 
                        </div>
                        <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6">
                            lorem teslk fdsjkl fdnskjo ajkl efjne fejk
                        </div>
                        <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
                            lorem test dans le message du site helpdesk de l'armp 
                        </div>
                        <div className="max-w-[40%] bg-secondary rounded-b-xl rounded-tr-xl p-4 mb-6">
                            lorem teslk fdsjkl fdnskjo ajkl efjne fejk
                        </div>
                        <div className="max-w-[40%] bg-primary rounded-b-xl rounded-tl-xl ml-auto p-4 text-white mb-6">
                            lorem test dans le message du site helpdesk de l'armp 
                        </div>
                        
                    </div>
                </div>
            
                <div className="p-14 w-full flex items-center">
                    <Input placeholder='new message' className='w-[75%]' inputClassName='p-4 border-0 shadow-md 
                    rounded-full bg-light focus: ring-0 focus:border-0 outline-none'/>
                    <div className='ml-4 p-2 cursor-pointer bg-light rounded-full'>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-send" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#2c3e50" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                    <line x1="10" y1="14" x2="21" y2="3" />
                        <path d="M21 3l-6.5 18a0.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a0.55 .55 0 0 1 0 -1l18 -6.5" />
                        </svg>
                    </div>
                </div>

            </div>
            <div className='w-[25%]  h-screen'></div>
            
        </div>
    );
};

export default Chat;