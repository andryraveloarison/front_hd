import React, { useState, useEffect } from 'react';
import { useQuery} from 'react-query';
import { ticketService, statuService } from '@/_services';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'


const Ticket = () => {
  const user = useSelector(selectUser);
  const [newTickets, setNewTickets] = useState({
    titre: '',
    contenu: '',
    userId: user.id,
  });

  //Socket
    const [socket, setSocket] = useState(null)

    useEffect(() => {
		setSocket(io('http://localhost:8080'))
	}, [])


    useEffect(() => {
        if(socket)
        {
            const data = {
                userId: user.id,
                userRole: user.role,
            }
            socket.emit('addUser', {data});
            
        }
		
	}, [socket])



  const { isLoading, isError, data: tickets, error } = useQuery(
    ['tickets', user.id],
    () => ticketService.getMyTickets(user.id).then((res) => res.data.ticket)
  );



  const onChange = (e) => {
    setNewTickets({
      ...newTickets,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit=(e) =>{
    e.preventDefault()

    setNewTickets({
      titre: '',
      contenu: '',
      userId: user.id,
        
    })

    if(socket){
      socket.emit('sendNotification', " Nouveau ticket ");
  }

    
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
          {isLoading ? (
            <tr>
              <td colSpan="5">Loading...</td>
            </tr>
          ) : isError ? (
            <tr>
              <td colSpan="5">{error.message}</td>
            </tr>
          ) : tickets.length === 0 ? (
            <tr>
              <td colSpan="5">Aucun ticket en cours</td>
            </tr>
          ) : (
            tickets.map((ticket) => (
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
            <input
              type="text"
              name="titre"
              value={newTickets.titre}
              onChange={onChange}
            />
          </div>
          <div className="group">
            <label htmlFor="contenu">Contenu</label>
            <input
              type="text"
              name="contenu"
              value={newTickets.contenu}
              onChange={onChange}
            />
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