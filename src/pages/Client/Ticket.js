import React, { useState, useEffect } from 'react';
import { useQuery} from 'react-query';
import { ticketService, statuService } from '@/_services';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client'
import ReactPaginate from 'react-paginate';


const Ticket = () => {

  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  
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
  
const pageCount = Math.ceil(tickets.length / pageSize);
const offset = currentPage * pageSize;
const currentPageTickets = tickets.slice(offset, offset + pageSize);

const handlePageClick = (data) => {
  setCurrentPage(data.selected);
};

  return (
    <div className={'User bg-gray-100 p-4 h-full'}>
      <h1 className={'text-2xl font-bold mb-4'}>Mes tickets</h1>
      <table className={'table-auto w-full'}>
        <thead>
          <tr
          class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
          >
            <th className={'px-4 py-2'} >#</th>
            <th className={'px-4 py-2'}>titre</th>
            <th className={'px-4 py-2'}>contenu</th>
            <th className={'px-4 py-2'}>date</th>
            <th className={'px-4 py-2'}>status</th>
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
          ) : currentPageTickets.length === 0 ? (
            <tr>
              <td colSpan="5">Aucun ticket en cours</td>
            </tr>
          ) : (
            currentPageTickets.map((ticket) => (
              <tr key={ticket.id}
              class="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">

                <td className={`px-4 py-2  text-center`}>{ticket.id}</td>
                <td className={`px-4 py-2  text-center`}>{ticket.titre}</td>
                <td className={`px-4 py-2  text-center`}>{ticket.contenu}</td>
                <td className={`px-4 py-2  text-center`}>{ticket.createdAt}</td>
                <td className={`px-4 py-2  text-center`}>{statuService.getStatu(ticket.statuId)}</td>
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