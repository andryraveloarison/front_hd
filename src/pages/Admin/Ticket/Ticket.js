import React, { useEffect, useState, useRef } from 'react';
//import { useNavigate } from 'react-router-dom';
import { ticketService,statuService } from '@/_services';

const Ticket = () => {
    const [tickets,setTickets] = useState([])
    //let navigate = useNavigate()
    const flag = useRef(false)

    useEffect (()=>{

        if(flag.current === false){

            ticketService.getAll()
            .then(res => {
            setTickets(res.data.ticket)
            })
            .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[])



    return (
        <div className="User"> 
            Liste ticket
            {/* <button onClick={()=>marcel(4)}> User 4</button> */}
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Utilisateur</th>
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
                        <td>{ticket.userNom}</td>
                        <td>{ticket.titre}</td>
                        <td>{ticket.contenu}</td>
                        <td>{ticket.createdAt}</td>
                        <td>{statuService.getStatu(ticket.statuId)}</td>
                        
                    </tr>
                    ))
                )}
            </tbody>

        </table>
        </div>
    );
};

export default Ticket;