import { EventTicket, TicketFormEventTicket } from 'src/store/reducers/events';

export const getFormTicketsToUpdate = (tickets: EventTicket[], sTickets: TicketFormEventTicket[]) => {
  return tickets
    .map((ticket) => {
      const sTicket = sTickets.find((t) => t.id === ticket.id);
      if (!sTicket) {
        return ticket;
      }
      if (sTicket && sTicket.available != null && ticket.available != null) {
        sTicket.isReleased = sTicket.available < ticket.available;
        sTicket.isCheckedOut = sTicket.available > ticket.available;
        sTicket.available = ticket.available;

        if (sTicket.amount != null && sTicket.amount > ticket.available) {
          sTicket.amount = ticket.available;
        }
      }
      return sTicket || ticket;
    });
}
