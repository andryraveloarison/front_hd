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
  const [adminActive, setAdminActive] = useState({
    
  })

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


  
  
  const action = (statu_user_ticket, ticketId, userId) => {   

    let adminId = adminActive[ticketId];
    if(!adminId){
      adminId = userConnected.id
    }
    console.log('statu_user_ticket:', statu_user_ticket);
    console.log('userId:', userId);
    console.log('id:', ticketId);

    const updatedTicket = ListTickets.map((ticket) => {

      console.log(userAdmins)



        if (ticket.statu_user_ticket === statu_user_ticket) {
          // Modifier l'élément avec l'ID spécifique 
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
              "admin":adminId,
              "ticketId":ticketId
            } 


            conversationService.addConversation(newconversation).then(res => {

              if(adminId === userConnected.id)
              {
                alert('Une conversation a ete cree')
                navigate('/superAdmin/chat/index')
              }
 
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

const selectAdmin = (newUserAdmin, newTicketId) => {

  setAdminActive(prevState => {
    if (prevState.hasOwnProperty(newTicketId)) {
      // The ticketId already exists, update userAdmin
      return { ...prevState, [newTicketId]: newUserAdmin };
    } else {
      // The ticketId doesn't exist yet, add a new entry
      return { ...prevState, [newTicketId]: newUserAdmin };
    }
  });

};



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
                <th>Assignation admin</th>
                
            </tr>
        </thead>
        <tbody>
            {
            
            ListTickets.length === 0 ? (
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
                    { ticket.adminNom === "none" ? (
                      <select name="userAdmin" id="userAdmin">
                            {
                            userAdmins.map(userAdmin => (


                              <option value={userAdmin.id} onClick={() => selectAdmin(userAdmin.adminId,ticket.id)}>
                                {userAdmin.adminNom}
                              </option>
                              
                            ))
                          }
                        
                        </select>
                      ):(
                        <span>{ticket.adminNom}</span>
                      )}
                        
                    </td>
                    <td>
                      {ticket.adminNom === "none" &&(
                        <button onClick={() => action(ticket.statu_user_ticket, ticket.id, ticket.userId)}>
                          {statuService.getAction(ticket.statuId)}
                        </button>
                      
                      )}
                      <button onClick={() => supprimer(ticket.statu_user_ticket)}>supprimer</button>
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