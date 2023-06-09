import React, { useState } from 'react';
import { ticketService, statuService } from '@/_services';
import { useQuery } from 'react-query';
import ReactPaginate from 'react-paginate';

const Ticket = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const pageSize = 10;

  const { isLoading, isError, data: tickets, error } = useQuery(
    'tickets',
    () => ticketService.getAll().then((res) => res.data.ticket)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  const pageCount = Math.ceil(tickets.length / pageSize);
  const offset = currentPage * pageSize;
  const currentPageTickets = tickets.slice(offset, offset + pageSize);

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  return (
    <div className={'User bg-gray-100 p-4 h-full'}>
      <h1 className={'text-2xl font-bold mb-4'}>Liste ticket</h1>
      <table className={'table-auto w-full'}>
        <thead>
          <tr>
            <th className={'px-4 py-2'}>#</th>
            <th className={'px-4 py-2'}>Utilisateur</th>
            <th className={'px-4 py-2'}>Titre</th>
            <th className={'px-4 py-2'}>Contenu</th>
            <th className={'px-4 py-2'}>Date</th>
            <th className={'px-4 py-2'}>Statut</th>
          </tr>
        </thead>
        <tbody>
          {currentPageTickets.length === 0 ? (
            <tr>
              <td colSpan="5">Aucun ticket en cours</td>
            </tr>
          ) : (
            currentPageTickets.map((ticket, index) => (
              <tr key={offset + index}>
                <td className={`px-4 py-2`}>{ticket.id}</td>
                <td className={`px-4 py-2`}>{ticket.userNom}</td>
                <td className={`px-4 py-2`}>{ticket.titre}</td>
                <td className={`px-4 py-2`}>{ticket.contenu}</td>
                <td className={`px-4 py-2`}>{ticket.createdAt}</td>
                <td className={`px-4 py-2`}>{statuService.getStatu(ticket.statuId)}</td>
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

export default Ticket;