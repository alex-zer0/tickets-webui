import config from '../config';
import { UserInfo, TicketFormEventTicket } from 'src/store/reducers/events';

export const FetchOptions = (method?: string, body?: {}) => ({
  method: method || 'GET',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
  body: body && JSON.stringify(body),
});

const mapTicketsToPost = (tickets: TicketFormEventTicket[]) => {
  return tickets.map(t => ({id: t.id, name: t.name, amount: t.amount}));
}

export default class ApiService {
  public static getEvents() {
    return fetch(`${config.apiUrl}/events/`, FetchOptions())
      .then((response) => response.json());
  }
  public static getEventByUrl(url: string) {
    return fetch(`${config.apiUrl}/events/${url}`, FetchOptions())
      .then((response) => response.json());
  }
    public static checkoutTickets(url: string, tickets: TicketFormEventTicket[]){
      return fetch(
        `${config.apiUrl}/events${url}/checkout`,
        FetchOptions('POST', { tickets: mapTicketsToPost(tickets) })
      )
        .then((response) => response.json());
    }
    public static releaseTickets(url: string, tickets: TicketFormEventTicket[]) {
      return fetch(
        `${config.apiUrl}/events${url}/release`,
        FetchOptions('POST', { tickets: mapTicketsToPost(tickets) })
      )
        .then((response) => response.json());
    }
    public static confirmTickets(url: string, tickets: TicketFormEventTicket[], user: UserInfo) {
      return fetch(
        `${config.apiUrl}/events${url}/confirm`,
        FetchOptions('POST', { user, tickets: mapTicketsToPost(tickets) })
      )
        .then((response) => response.json());
    }
}
