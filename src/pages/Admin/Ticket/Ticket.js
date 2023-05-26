import React from 'react';
import { ticketService, statuService } from '@/_services';
import { useQuery } from 'react-query';

const Ticket = () => {
    
  const { isLoading, isError, data: tickets, error } = useQuery(
    'tickets',
    () => ticketService.getAll().then((res) => res.data.ticket)
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>{error.message}</div>;

  return (
    <div className="User">
      Liste ticket
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
          {tickets.length === 0 ? (
            <tr>
              <td colSpan="5">Aucun ticket en cours</td>
            </tr>
          ) : (
            tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.userNom}</td>
                <td>{ticket.titre}</td>
                <td>{ticket.contenu}</td>
                <td>{ticket.createdAt}</td>
                <td>{statuService.getStatu(ticket.statuId)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Ticket;