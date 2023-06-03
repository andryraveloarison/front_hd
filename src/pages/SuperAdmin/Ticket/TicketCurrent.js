import React, { useState } from 'react';
import { useQuery } from 'react-query';
// import { useNavigate } from 'react-router-dom';
import { ticketService, statuService, conversationService, userService } from '@/_services';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const TicketCurrent = () => {
  let navigate = useNavigate()
  const userConnected = useSelector(selectUser)

  const [load, setLoad] = useState("true")
  const [ListTickets,setListeTickets] = useState([])

  const { Loading, Error, data: userAdmins = [],error } = useQuery('userAdmins', () =>
  userService.getUserAdmin().then((res) => res.data.userAdmin)
);

  
  const { isLoading, isError, data: tickets = [],TicketError } = useQuery('currentTickets', () =>
    ticketService.getCurrent().then((res) => res.data.ticket)
  );



  if (isLoading || Loading) {
    return <div>Loading...</div>;
  } else {
    if(load === "true")
    {
      setListeTickets(tickets)
      setLoad("false")
    }
  }
  if (error) return <div>{error.message}</div>;
  
  const action = (statu_user_ticket, userId, ticketId) => {   

    console.log('statu_user_ticket:', statu_user_ticket);
    console.log('userId:', userId);
    console.log('id:', ticketId);

    const updatedTicket = ListTickets.map((ticket) => {

      console.log(userAdmins)



        if (ticket.statu_user_ticket === statu_user_ticket) {
          // Modifier l'élément avec l'ID spécifique (dans cet exemple, l'ID est 2)
          if (ticket.statuId === 5 ) {

            
            statuService.enAttente(statu_user_ticket)
            return {
                ...ticket,
                statuId: 7,
                // Autres propriétés modifiées
              };
          }else{

            statuService.enCours(statu_user_ticket)
            
            if(ticket.statuId === 4){
            const newconversation ={
              "user":userId,
              "admin":userConnected.id,
              "ticketId":ticketId
            } 

            conversationService.addConversation(newconversation).then(res => {
              alert('Une conversation a ete cree')
              navigate('/admin/chat/index') 
            })
          .catch(err => console.log(err))
          
            }
            

            return {                    
                ...ticket,
                statuId: 5,
                // Autres propriétés modifiées
              };

          }

         
        }
        return ticket;
      });

      
      setListeTickets(updatedTicket);
}

const supprimer = (id) => {
    statuService.supprimer(id)
    .then(res => {
        alert('un ticket supprimer')
        window.location.reload();
    })
    .catch(err => console.log(err))
}

const cloturer = (id) => {
    statuService.cloturer(id)
    .then(res => {
        alert('le ticket resolu')
        window.location.reload();

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
                <th>date</th>
                <th>status</th>
                
            </tr>
        </thead>
        <tbody>
            {ListTickets.length === 0 ? (
                <tr>
                <td colSpan="5">Aucun ticket en cours</td>
                </tr>
            ) : (
                ListTickets.map(ticket => (
                <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td>{ticket.userNom}</td>
                    <td>{ticket.titre}</td>
                    <td>{ticket.contenu}</td>
                    <td>{ticket.createdAt}</td>
                    <td>{statuService.getStatu(ticket.statuId)}</td>
                    <td>
                    <button onClick={() => action(ticket.statu_user_ticket,ticket.userId,ticket.id)}>{statuService.getAction(ticket.statuId)}</button>
                    <button onClick={() => supprimer(ticket.statu_user_ticket)}>supprimer</button>
                    <button onClick={() => cloturer(ticket.statu_user_ticket)}>cloturer</button>
                    <ul>
                      {
                        userAdmins.map(userAdmin => (
                          
                          <li> {userAdmin.adminNom}</li>
                        ))
                      }
                    </ul>
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