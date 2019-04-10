import React, { ChangeEvent, Component } from 'react';
import { getFormTicketsToUpdate } from 'src/services/utils.service';
import { EventTicket, TicketFormEventTicket } from 'src/store/reducers/events';
import TicketHint from '../ticket-hint/TicketHint';
import './TicketsForm.scss';

interface TicketsFormProps {
  tickets: EventTicket[]
  checkout: (tickets: EventTicket[]) => void
}

interface TicketsFormState {
  tickets: TicketFormEventTicket[]
  isFormValid: boolean
}

export default class TicketsForm extends Component<TicketsFormProps, TicketsFormState> {
  public static getDerivedStateFromProps(props: TicketsFormProps, state: TicketsFormState) {
    const { tickets } = props;
    const { tickets: sTickets } = state;
    if (!tickets || !sTickets) {
      return;
    }
    return { tickets: getFormTicketsToUpdate(tickets, sTickets) };
  }

  public state: TicketsFormState = {
    tickets: this.props.tickets,
    isFormValid: false,
  };

  public handleChange(id: number, event: ChangeEvent<HTMLSelectElement>) {
    const { tickets } = this.state;
    const ticket = tickets.find((t) => t.id === id);
    if (ticket) {
      ticket.amount = event.target.value ? parseInt(event.target.value, 10) : 0;
      const isFormValid = tickets.some((t) => !!t.amount);
      this.setState({ isFormValid, tickets });
    }
  }

  public checkout = () => {
    const { tickets } = this.state;
    this.props.checkout(tickets);
  }

  public onTicketFade = (ticketId: number) => {
    const { tickets } = this.state;
    const index = tickets.findIndex((t) => t.id === ticketId);
    if (index >= 0) {
      tickets[index].isReleased = false;
      tickets[index].isCheckedOut = false;
      this.setState({ tickets });
    }
  }

  public renderTicketHint(ticket: TicketFormEventTicket) {
    return (
      <TicketHint
        ticketId={ticket.id}
        fade={this.onTicketFade}
        released={ticket.isReleased}
        checkedOut={ticket.isCheckedOut}
      />
    );
  }

  public renderSelectOptions(ticket: TicketFormEventTicket) {
    return [0, 1, 2, 3, 4]
      .map((value) => {
        if (ticket.available == null || ticket.available >= value) {
          return <option key={value} value={value}>{value}</option>;
        }
      });
  }

  public renderTickets() {
    const { tickets } = this.state;
    return tickets
      .map((t) => (
        <li key={t.name}>
          <span>{t.name}</span>
          <select
            className='form-control'
            value={t.amount || 0}
            disabled={t.available === 0}
            onChange={this.handleChange.bind(this, t.id)}
          >
            {this.renderSelectOptions(t)}
          </select>
          {(t.isReleased || t.isCheckedOut) && this.renderTicketHint(t)}
        </li>
      ));
  }

  public render() {
    const { isFormValid } = this.state;
    return (
      <div className='TicketsForm'>
        <ul>
          {this.renderTickets()}
        </ul>
        <footer>
          <button
            className='btn btn-primary'
            disabled={!isFormValid}
            onClick={this.checkout}
          >
            Checkout
          </button>
        </footer>
      </div>
    );
  }
}
