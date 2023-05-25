import React, { useEffect, useState, useRef } from 'react';
//import { useNavigate } from 'react-router-dom';
import { ticketService,statuService } from '@/_services';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';

const Ticket = () => {
    const user = useSelector(selectUser)

    const [tickets,setTickets] = useState([])
    const [newTickets,setNewTickets] = useState({
        "titre":"",
        "contenu":"",
        "userId":user.id,
    })

    const flag = useRef(false)


    useEffect (()=>{

        if(flag.current === false){

            ticketService.getMyTickets(user.id)
            .then(res => {

            setTickets(res.data.ticket)

            })
            .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[])


    const onChange=(e) =>{
        setNewTickets({
            ...newTickets,
            [e.target.name]:e.target.value,
           
        })
    }



    const onSubmit=(e) =>{
        e.preventDefault()

        setNewTickets({
            ...newTickets,
            
        })

        
        console.log(newTickets)

        ticketService.addTicket(newTickets)
            .then(res => {
                window.location.reload();
            })
            .catch(err => console.log(err))
        
    }



    return (
        <div className="User"> 
            Liste de mes ticket
            {/* <button onClick={()=>marcel(4)}> User 4</button> */}
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>titre</th>
                    <th>contenu</th>
                    <th>date</th>
                    <th>status</th>
                </tr>
            </thead>
            <tbody>
                {tickets.length === 0 ? (
                    <tr>
                    <td colSpan="5">Aucun ticket en cours</td>
                    </tr>
                ) : (
                    tickets.map(ticket => (
                    <tr key={ticket.id}>
                        <td>{ticket.id}</td>
                        <td>{ticket.titre}</td>
                        <td>{ticket.contenu}</td>
                        <td>{ticket.createdAt}</td>
                        <td>{statuService.getStatu(ticket.statuId)}</td>
                        
                    </tr>
                    ))
                )}
            </tbody>

        </table>

            <div className="UserEdit">
                <form onSubmit={onSubmit}>
                Creer un ticket

                <div className="group">
                    <label htmlFor="titre">Titre</label>
                    <input type="text" name="titre" value={newTickets.titre} onChange={onChange}/>
                </div>
                <div className="group">
                    <label htmlFor="contenu">Contenu</label>
                    <input type="text" name="contenu" value={newTickets.contenu} onChange={onChange}/>
                </div>
                <div className="group">
                    <button>Creer</button>
                </div>

            </form>
            </div>
        
        </div>
    );
};

export default Ticket;