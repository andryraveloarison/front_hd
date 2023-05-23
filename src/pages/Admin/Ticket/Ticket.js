import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService,statuService } from '@/_services';

const Ticket = () => {
    const [tickets,setTickets] = useState([])
    let navigate = useNavigate()
    const flag = useRef(false)

    useEffect (()=>{

        if(flag.current === false){

            userService.getAllTickets()
            .then(res => {
            setTickets(res.data.ticket)
            })
            .catch(err => console.log(err))
        }

        return () => flag.current = true
        // eslint-disable-next-line react-hooks/exhaustive-deps

    },[])



    const action = (id) => {   
        const updatedTicket = tickets.map((ticket) => {
            if (ticket.id === id) {
              // Modifier l'élément avec l'ID spécifique (dans cet exemple, l'ID est 2)
              if (ticket.statuId === 5 ) {
                return {
                    ...ticket,
                    statuId: 6,
                    // Autres propriétés modifiées
                  };
              }else{
                return {
                    ...ticket,
                    statuId: 5,
                    // Autres propriétés modifiées
                  };

              }

             
            }
            return ticket;
          });

          
          setTickets(updatedTicket);
    }

    const supprimer = (id) => {
        statuService.supprimerTicket(id)
        .then(res => {
            alert('un ticket supprimer')
        })
        .catch(err => console.log(err))
    }
    
    const cloturer = (id) => {
        statuService.cloturerTicket(id)
        .then(res => {
            alert('un ticket resolu')
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="User"> 
            Liste ticket
            {/* <button onClick={()=>marcel(4)}> User 4</button> */}
        <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>type</th>
                    <th>contenu</th>
                    <th>status</th>
                    <th>action</th>
                </tr>
            </thead>
            <tbody>
                {
                    tickets.map(ticket => (
                        
                        <tr key={ticket.id}>
                            <td>{ticket.id}</td>
                            <td>{ticket.type}</td>
                            <td>{ticket.contenu}</td>
                            <td>{statuService.getStatu(ticket.statuId)}</td>
                            <td>
                                <button onClick={() => action(ticket.userTicket)}>{statuService.getAction(ticket.statuId)}</button>
                                <button onClick={() => supprimer(ticket.userTicket)}>supprimer</button>
                                <button onClick={() => cloturer(ticket.userTicket)}>cloturer</button>
                               
                            </td>                        
                        </tr>
                    ))
                }
            </tbody>
        </table>
        </div>
    );
};

export default Ticket;