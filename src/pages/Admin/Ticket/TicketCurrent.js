import React, { useEffect, useState, useRef } from 'react';
//import { useNavigate } from 'react-router-dom';
import { ticketService,statuService } from '@/_services';

const TicketCurrent = () => {
    const [tickets,setTickets] = useState([])
    //let navigate = useNavigate()
    const flag = useRef(false)

    useEffect (()=>{

        if(flag.current === false){

            ticketService.getCurrent()
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


            if (ticket.statu_user_ticket === id) {
              // Modifier l'élément avec l'ID spécifique (dans cet exemple, l'ID est 2)
              if (ticket.statuId === 5 ) {

                
                statuService.enAttente(id)
                return {
                    ...ticket,
                    statuId: 7,
                    // Autres propriétés modifiées
                  };
              }else{

                statuService.enCours(id)

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
        statuService.supprimer(id)
        .then(res => {
            alert('un ticket supprimer')
        })
        .catch(err => console.log(err))
    }
    
    const cloturer = (id) => {
        statuService.cloturer(id)
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
                    <th>Utilisateur</th>
                    <th>titre</th>
                    <th>contenu</th>
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
                        <td>{statuService.getStatu(ticket.statuId)}</td>
                        <td>
                        <button onClick={() => action(ticket.statu_user_ticket)}>{statuService.getAction(ticket.statuId)}</button>
                        <button onClick={() => supprimer(ticket.statu_user_ticket)}>supprimer</button>
                        <button onClick={() => cloturer(ticket.statu_user_ticket)}>cloturer</button>
                        </td>
                    </tr>
                    ))
                )}
            </tbody>

        </table>
        </div>
    );
};

export default TicketCurrent;