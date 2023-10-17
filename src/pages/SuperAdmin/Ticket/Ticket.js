import React, { useState } from 'react';
import { ticketService, statuService } from '../../../_services';
import { useQuery } from 'react-query';
import ReactPaginate from 'react-paginate';

const Ticket = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(10);

  const [showDetails, setShowDetails] = useState(false);
  const [details, setDetails] = useState({});

  const [searchTitle, setSearchTitle] = useState('');

  const { isLoading, isError, data: tickets, error } = useQuery(
    'tickets',
    () => ticketService.getAll().then((res) => res.data.ticket)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  const filteredTickets = searchTitle
    ? tickets.filter((ticket) =>
        ticket.titre.toLowerCase().includes(searchTitle.toLowerCase())
      )
    : tickets;

  const pageCount = Math.ceil(filteredTickets.length / pageSize);
  const offset = currentPage * pageSize;
  const currentPageTickets = filteredTickets.slice(offset, offset + pageSize);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const detailsButtonClick = (ticket) => {
    setDetails(ticket);
    setShowDetails(true);
  };

  const detailsCloseButtonClick = () => {
    setShowDetails(false);
  };

  const handleSearchTitleChange = (e) => {
    setSearchTitle(e.target.value);
    setCurrentPage(0);
  };

  return (
    <div className="User p-4 h-full ml-[250px] mt-[70px] mr-[30px]" style={{ position: 'relative' }}>
      <h1 className="text-2xl font-bold mb-4">Liste des tickets</h1>

      <div className="flex justify-end mb-5">
        <input
          id="searchTitle"
          placeholder='Recherche'
          type="text"
          onChange={handleSearchTitleChange}
          className="border border-gray-300 rounded px-2 py-1"
        />
      </div>

      <table className="table-auto w-full">
        {/* Table Header */}
        <thead>
          <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
            <th className="px-4 py-2">#</th>
            <th className="px-4 py-2">Utilisateur</th>
            <th className="px-4 py-2">Titre</th>
            <th className="px-4 py-2">Date</th>
            <th className="px-4 py-2">Admin</th>
            <th className="px-4 py-2">Statut</th>
            <th className="px-4 py-2">Action</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {currentPageTickets.length === 0 ? (
            <tr className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td colSpan="5">Aucun ticket</td>
            </tr>
          ) : (
            currentPageTickets.map((ticket, index) => (
              <tr
                key={offset + index}
                className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600"
              >
                <td className="px-4 py-2 text-center">{ticket.id}</td>
                <td className="px-4 py-2 text-center">{ticket.userNom}</td>
                <td className="px-4 py-2 text-center">{ticket.titre}</td>
                <td className="px-4 py-2 text-center">{ticket.createdAt}</td>
                <td className="px-4 py-2 text-center">{ticket.adminNom}</td>
                <td className="px-4 py-2 text-center">{statuService.getStatu(ticket.statuId)}</td>
                <td className="px-4 py-2 text-center">
                  <button
                    className="bg-gray-800 text-white w-[100px] h-[30px] rounded"
                    onClick={() => detailsButtonClick(ticket)}
                  >
                    Details
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showDetails && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-[900px] rounded">
            <div className="flex justify-end">
              <button
                className="text-black w-[30px] h-[30px] rounded mt-0"
                onClick={detailsCloseButtonClick}
              >
                X
              </button>
            </div>

            {/* Details Form */}
            <form className="mt-2 w-[800px]">
              <div className="flex">
                <h2 className="text-black text-2xl pb-5">{details.titre}</h2>
              </div>

              <div className="group flex">
                <div className="w-[40%]">Date :</div>
                <div>{details.createdAt}</div>
              </div>

              <div className="group flex">
                <div className="w-[40%]">Description:</div>
                <div>{details.contenu}</div>
              </div>

              <div className="group flex">
                <div className="w-[40%]">Technicien:</div>
                <div>{details.adminNom !== 'none' ? <div>{details.adminNom}</div> : <div>Aucune</div>}</div>
              </div>

              <div className="group flex">
                <div className="w-[40%]">Status :</div>
                <div>{statuService.getStatu(details.statuId)}</div>
              </div>

              {details.observationType !== 'aucune' && (
                <div className="group flex">
                  <div className="w-[40%]">{details.observationType}</div>
                  <div>{details.observation}</div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* Pagination */}
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

export default Ticket;
