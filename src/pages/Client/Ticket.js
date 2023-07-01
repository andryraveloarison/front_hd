import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { ticketService, statuService, notificationService } from '@/_services';
import { selectUser } from '@/features/userSlice';
import { useSelector } from 'react-redux';
import { io } from 'socket.io-client';
import ReactPaginate from 'react-paginate';

const Ticket = () => {
  const [showForm, setShowForm] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;
  const [image, setImage] = useState('');

  const user = useSelector(selectUser);

  const { isLoading, isError, data: tickets, error } = useQuery(
    ['tickets', user.id],
    () => ticketService.getMyTickets(user.id).then((res) => res.data.ticket)
  );

  const [newTickets, setNewTickets] = useState({
    titre: '',
    contenu: '',
    userId: user.id,
    image:null,
    nomImage:""
  });

  const [details, setDetails] = useState({
    titre: '',
    contenu: '',
    date: '',
    solution: '',
    ticketId:''
  });

  // Socket
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(io('http://localhost:8080'));
  }, []);

  const onChange = (e) => {
    if(e.target.name==="image"){
      setImage(e.target.files[0])

    }
    else{

      setNewTickets({
        ...newTickets,
        [e.target.name]: e.target.value,
      });
    }
    
  
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const notification = user.nom + ' a créé un nouveau ticket';
    if (socket) {
      socket.emit('sendNotification', {
        receiverId: 1,
        contenu: notification,
      });
    }

    // Ajouter la notification dans la base
    notificationService.addNotification({
      userId: 1,
      contenu: notification,
    });

    //console.log(image.name)


    ticketService
      .addTicket({
        ...newTickets,
        nomImage: image.name,
        image:image
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.log(err));
  };

  const pageCount = Math.ceil(tickets?.length / pageSize); // Add conditional check for tickets
  const offset = currentPage * pageSize;
  const currentPageTickets = tickets?.slice(offset, offset + pageSize); // Add conditional check for tickets

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const handleNewButtonClick = () => {
    setShowForm(true);
  };

  const handleCloseButtonClick = () => {
    setShowForm(false);
  };

  const detailsButtonClick = (titre, contenu, date, solution,statuId) => {
    setDetails({
      titre: titre,
      contenu: contenu,
      date: date,
      solution: solution,
      statuId: statuId
    });

    setShowDetails(true);
  };

  const detailsCloseButtonClick = () => {
    setShowDetails(false);
  };

  const handleSearchTitleChange = (event) => {
    setSearchTitle(event.target.value);
    setCurrentPage(0);
  };

  return (
    <div className="User bg-white p-4 h-full">
      <h1 className="text-2xl font-bold mb-4">Mes tickets</h1>
      <div className="flex items-end justify-between mb-5">
        {showForm ? (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" bg-white w-[600px] rounded">
            <div className="flex justify-end">
              <button
                className="text-black w-[30px] h-[30px]  rounded mt-0"
                onClick={handleCloseButtonClick}
              >
                X
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-2 w-[500px]" Content-Type= "multipart/form-data">
              <h2 className="text-black text-2xl pb-3">Créer un ticket</h2>
              <div className="group">
                <label htmlFor="titre" className="text-black">
                  Titre
                </label>
                <input
                  type="text"
                  name="titre"
                  value={newTickets.titre}
                  onChange={onChange}
                  className="w-full border-2 rounded py-1 px-2 texte-white"
                />
              </div>
              <div className="group">
                <label htmlFor="contenu" className="text-black">
                  Contenu
                </label>
                <textarea
                  name="contenu"
                  value={newTickets.contenu}
                  onChange={onChange}
                  className="w-full h-40 border-2 rounded py-1 px-2 text-black"
                />
              </div>
              <input type="file" name="image"  onChange={onChange} />
              <div className="group">
                <button className="bg-gray-800 text-white w-full h-[40px] rounded my-2 mt-4">
                  Créer
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <button
          className="bg-gray-800 text-white w-[100px] h-[30px] rounded mt-4"
          onClick={handleNewButtonClick}
        >
          Nouveau
        </button>
      )}

             
      <div className="flex justify-end ">
        <input
          id="searchTitle"
          placeholder='Recherche'
          type="text"
          onChange={handleSearchTitleChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>

</div>

      <table className="table-auto w-full">
        <thead>
          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">titre</th>
            <th className="px-4 py-2">date</th>
            <th className="px-4 py-2">status</th>
            <th className="px-4 py-2">action</th>
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
          ) : currentPageTickets?.length === 0 ? (
            <tr>
              <td colSpan="5">Aucun ticket en cours</td>
            </tr>
          ) : (
            currentPageTickets
              .filter((ticket) =>
                ticket.titre.toLowerCase().includes(searchTitle.toLowerCase())
              )
              .map((ticket) => (
                <tr
                  key={ticket.id}
                  className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
                >
                  <td className="px-4 py-2 text-center">{ticket.id}</td>
                  <td className="px-4 py-2 text-center">{ticket.titre}</td>
                  <td className="px-4 py-2 text-center">{ticket.createdAt}</td>
                  <td className="px-4 py-2 text-center">
                    {statuService.getStatu(ticket.statuId)}
                  </td>
                  <td className="px-4 py-2 text-center">
                    <button
                      className="bg-gray-800 text-white w-[100px] h-[30px] rounded"
                      onClick={() =>
                        detailsButtonClick(
                          ticket.titre,
                          ticket.contenu,
                          ticket.createdAt,
                          ticket.solution,
                          ticket.statuId
                        )
                      }
                    >
                      {ticket.solution === "aucune" ? (
                        <p>Details</p>
                      ) : (
                        <p>Solution</p>
                      )}
                    </button>
                  </td>
                </tr>
              ))
          )}
        </tbody>
      </table>

      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className=" bg-white w-[900px] rounded">
            <div className="flex justify-end">
              <button
                className="text-black w-[30px] h-[30px]  rounded mt-0"
                onClick={detailsCloseButtonClick}
              >
                X
              </button>
            </div>

            <form onSubmit={onSubmit} className="mt-2 w-[800px] ">
              <div className=" flex">
                <h2 className="text-black text-2xl pb-5">{details.titre}</h2>
              </div>

              <div className="group flex">
                <div className=" w-[40%]">Date :</div>
                <div>{details.date}</div>
              </div>

              <div className="group flex">
                <div className=" w-[40%]">Description:</div>
                <div>{details.contenu}</div>
              </div>

              <div className="group flex">
                <div className="w-[40%]">Status</div>
                <div>{statuService.getStatu(details.statuId)}</div>
              </div>

              {details.solution !== "aucune" && (
                <div className="group flex">
                  <div className=" w-[40%]">Solution:</div>
                  <div> {details.solution}</div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      <ReactPaginate
        previousLabel={"Previous"}
        nextLabel={"Next"}
        breakLabel={"..."}
        pageCount={pageCount}
        marginPagesDisplayed={5}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={"pagination flex justify-center"}
        activeClassName={"active"}
        previousClassName={"pagination-item"}
        nextClassName={"pagination-item"}
        pageClassName={"pagination-item"}
        breakClassName={"pagination-item"}
        pageLinkClassName={"pagination-link"}
        previousLinkClassName={
          "rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
        }
        nextLinkClassName={
          "rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
        }
        breakLinkClassName={
          "rounded-full bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400"
        }
        activeLinkClassName={"bg-primary-100 text-primary-700 font-medium"}
        disabledClassName={"disabled"}
      />
    </div>
  );
};

export default Ticket;
