import React, { useState } from 'react';
import { useQuery } from 'react-query';
// import { useNavigate } from 'react-router-dom';
import { ticketService, statuService, conversationService, userService } from '@/_services';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import ReactPaginate from 'react-paginate';



const TicketCurrent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
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

const pageCount = Math.ceil(tickets.length / pageSize);
  const offset = currentPage * pageSize;
  const currentPageTickets = tickets.slice(offset, offset + pageSize);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

return (
  <div className="User bg-gray-100 p-4 h-full">
  <h1 className="text-2xl font-bold mb-4">Liste ticket</h1>
  <table className="w-full">
    <thead>
      <tr>
        <th className="px-4 py-2">#</th>
        <th className="px-4 py-2">Utilisateur</th>
        <th className="px-4 py-2">Titre</th>
        <th className="px-4 py-2">Contenu</th>
        <th className="px-4 py-2">Date</th>
        <th className="px-4 py-2">Statut</th>
        <th className="px-4 py-2">Assignation admin</th>
        <th className="px-4 py-2">Action</th>
      </tr>
    </thead>
    <tbody>
      {currentPageTickets.length === 0 ? (
        <tr>
          <td colSpan="7">Aucun ticket en cours</td>
        </tr>
      ) : (
        currentPageTickets.map(ticket => (
          <tr key={ticket.id}>
            <td className="px-4 py-2">{ticket.id}</td>
            <td className="px-4 py-2">{ticket.userNom}</td>
            <td className="px-4 py-2">{ticket.titre}</td>
            <td className="px-4 py-2">{ticket.contenu}</td>
            <td className="px-4 py-2">{ticket.createdAt}</td>
            <td className="px-4 py-2">{statuService.getStatu(ticket.statuId)}</td>
            <td className="px-4 py-2">
              {ticket.adminNom === "none" ? (
                <select name="userAdmin" id="userAdmin">
                  {userAdmins.map(userAdmin => (
                    <option
                      key={userAdmin.id}
                      value={userAdmin.id}
                      onClick={() => selectAdmin(userAdmin.adminId, ticket.id)}
                    >
                      {userAdmin.adminNom}
                    </option>
                  ))}
                </select>
              ) : (
                <span>{ticket.adminNom}</span>
              )}
            </td>
            <td className="flex items-center">
              {ticket.adminNom === "none" && (
                <button onClick={() => action(ticket.statu_user_ticket, ticket.id, ticket.userId)}
                  className="bg-blue-500 text-white font-bold rounded mr-2">
                  {statuService.getAction(ticket.statuId)}
                </button>
              )}
              <button onClick={() => supprimer(ticket.statu_user_ticket)}
                className="bg-red-500 text-white font-bold rounded"
                data-te-ripple-init>
                supprimer
              </button>
            </td>
          </tr>
        ))
      )}
    </tbody>
  </table>
  <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        pageCount={pageCount}
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination flex justify-center'}
        activeClassName={'active'}
        previousClassName={'pagination-item'}
        nextClassName={'pagination-item'}
        pageClassName={'pagination-item'}
        breakClassName={'pagination-item'}
        pageLinkClassName={'pagination-link'}
        previousLinkClassName={'rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400'}
        nextLinkClassName={'rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400'}
        breakLinkClassName={'rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400'}
        activeLinkClassName={'bg-primary-100 text-primary-700 font-medium'}
        disabledClassName={'disabled'}
      />
</div>
);
};

export default TicketCurrent;