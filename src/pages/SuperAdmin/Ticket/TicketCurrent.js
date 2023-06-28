import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ticketService, statuService, conversationService, userService, notificationService } from '@/_services';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ReactPaginate from 'react-paginate';



const TicketCurrent = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const userConnected = useSelector(selectUser)

  const [load, setLoad] = useState("true")
  const [ListTickets,setListeTickets] = useState([])
  const [adminActive, setAdminActive] = useState({})

  const { Loading, Error, data: userAdmins = [],error } = useQuery('userAdmins', () =>
  userService.getUserAdmin().then((res) => res.data.userAdmin)
);

  
  const { isLoading, isError, data: tickets = [],TicketError } = useQuery('currentTickets', () =>
    ticketService.getCurrent().then((res) => res.data.ticket)
  );

    // Socket
    const [socket, setSocket] = useState(null);

    useEffect(() => {
      setSocket(io('http://localhost:8080'));
    }, []);


  if (isLoading || Loading) {
    return <div>Loading...</div>;
  } else {
    if(load === "true")
    {
      setListeTickets(tickets)
      setLoad("false")
    }
  }
  if (Error) return <div>{error.message}</div>;
  if (isError) return <div>{TicketError.message}</div>;



  
  
  
  const action = (statu_user_ticket, ticketId, userId, userNom , ticketTitre, propAdminId) => {

    let adminId = adminActive[ticketId];
    if(!adminId){
      adminId = propAdminId
    }

    //prendre le nom de l'administrateur
    let adminNom=""
    userAdmins.map((userAdmin) => {
        if(adminId === userAdmin.adminId )
        {
          adminNom=userAdmin.adminNom
        }
        return -1
    })
  


    const updatedTicket = currentPageTickets.map((ticket) => {

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
            
            if(ticket.statuId === 4 || ticket.statuId === 10){
            const newconversation ={
              "user":userId,
              "admin":adminId,
              "ticketId":ticketId
            } 

            

            conversationService.addConversation(newconversation).then(res => {

              if(adminId === userConnected.id)
              {
                //alert('Une conversation a ete cree entre vous et '+ userNom)
                
              }else{
                alert('Une conversation a ete cree entre '+ adminNom +' et '+ userNom)
              }
              
              sendNotification(userId,adminNom, ticketTitre, adminId, userNom)

 
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

const sendNotification= (userId,adminNom, ticketTitre,  adminId, userNom) =>{

    const sendNotif = (userId, notification) => {
      if (socket) {
        socket.emit('sendNotification', {
          receiverId: userId,
          contenu:notification
        });
      }
      //Ajouter le notification dans la base
      notificationService.addNotification({
        userId: userId,
        contenu:notification
      }).then(() => {
        userId === userConnected.id && (window.location.href = '/superAdmin/chat/index')
      })
    }
    //NOTIFICATION
    const notificationUser =" Votre ticket sur " + ticketTitre + " est en cours, vous avez une discussion avec "+ adminNom
    const notificationAdmin = "Vous avez une nouvelle discussion avec " + userNom

    sendNotif(userId, notificationUser)
    sendNotif(adminId, notificationAdmin)
}


const supprimer = (id, userId, ticketTitre) => {
    statuService.supprimer(id)
    .then(res => {
        alert('un ticket supprimer')

        let notification = "Votre ticket sur "+ ticketTitre + " est supprimer"
        //notification du supprimer
        if (socket) {
          socket.emit('sendNotification', {
            receiverId: userId,
            contenu: notification
          });
        }

        //Ajouter le notification dans la base
        notificationService.addNotification({
          userId: userId,
          contenu:notification
        }).then()

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
  <div className="User p-4 h-full ml-[190px] mt-[90px] mr-[30px]"style={{ position:'relative' }}>
  <h1 className="text-2xl font-bold mb-4">Liste des tickets en cours</h1>
  <table className="w-full">
    <thead >
    <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-1'00 dark:border-neutral-500 dark:hover:bg-neutral-600"
    >
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
        <tr class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
        >
          <td colSpan="7">Aucun ticket en cours</td>
        </tr>
      ) : (
        currentPageTickets.map(ticket => (
          <tr key={ticket.id}
          class="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600 "
          >
          
            <td className="px-4 py-2  text-center">{ticket.id}</td>
            <td className="px-4 py-2  text-center">{ticket.userNom}</td>
            <td className="px-4 py-2  text-center">{ticket.titre}</td>
            <td className="px-4 py-2  text-center">{ticket.contenu}</td>
            <td className="px-4 py-2  text-center">{ticket.createdAt}</td>
            <td className="px-4 py-2  text-center">{statuService.getStatu(ticket.statuId)}</td>
            <td className="px-4 py-2  text-center">
              {
                ticket.adminNom === "none" ? (
                  <select name="userAdmin" id="userAdmin">
                    {
                      // trier et mettre la proposition Admin en premier
                      [...userAdmins].sort((a, b) => {
                        if (a.adminId === ticket.propAdminId) return -1;
                        if (b.adminId === ticket.propAdminId) return 1;
                        return 0;

                      }).map(userAdmin => (
                        <option
                          key={userAdmin.id}
                          value={userAdmin.id}
                          onClick={() => selectAdmin(userAdmin.adminId, ticket.id)}
                        >
                          {userAdmin.adminNom}
                        </option>
                      ))
                    }
                  </select>
                ) : (
                  <span>{ticket.adminNom}</span>
                )
              }
            </td>

            <td className="text-center">
              {ticket.adminNom === "none" && (
                <button
                  onClick={() => action(ticket.statu_user_ticket, ticket.id, ticket.userId, ticket.userNom, ticket.titre , ticket.propAdminId)}
                  className="bg-blue-500 text-white font-bold rounded mr-2 text-base w-[100px] h-[30px]" // Ajoutez les classes de dimensionnement ici
                >
                  {statuService.getAction(ticket.statuId)}
                </button>
              )}
              <button
                onClick={() => supprimer(ticket.statu_user_ticket, ticket.userId, ticket.titre)}
                className="bg-red-500 text-white font-bold rounded w-[100px] h-[30px]" // Ajoutez les classes de dimensionnement ici
                data-te-ripple-init
              >
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