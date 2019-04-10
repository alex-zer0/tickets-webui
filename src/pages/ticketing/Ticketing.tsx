import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { Dispatch } from 'redux';
import Header from 'src/components/header/Header';
import { checkoutEventTickets, fetchEventByUrl } from 'src/store/actions/events';
import { EventInfo, EventsState, EventTicket, TicketFormEventTicket } from 'src/store/reducers/events';
import Loading from 'src/components/Loading';
import { formatDate } from 'src/services/date.service';
import './Ticketing.scss';
import TicketsForm from './tickets-form/TicketsForm';

export interface TicketingProps {
  event: EventInfo | null
  loading: boolean
  checkoutTickets: TicketFormEventTicket[] | null
  match: {
    params: {[key: string]: string},
  }
  checkoutEventTickets: (url: string, tickets: TicketFormEventTicket[]) => void
  fetchEvent: (url: string) => void
}

export class Ticketing extends Component<TicketingProps> {
  public componentDidMount() {
    const { match, fetchEvent } = this.props;
    if (match) {
      const { params: { eventUrl } } = match;
      fetchEvent(eventUrl);
    }
  }

  public handleCheckout = (tickets: EventTicket[]) => {
    const { checkoutEventTickets, event } = this.props;
    if (!event) {
      return;
    }
    checkoutEventTickets(event.url, tickets);
  }

  public renderTicketsForm(tickets?: EventTicket[]) {
    if (!tickets || tickets.length === 0) {
      return null;
    }
    return (
      <TicketsForm
        tickets={tickets}
        checkout={this.handleCheckout}
      />
    );
  }

  public render() {
    const { loading, event, checkoutTickets } = this.props;
    if (checkoutTickets) {
      return <Redirect to='/checkout' />;
    }
    if (loading) {
      return <Loading />;
    }
    if (!event) {
      return <div>There is no Event with such URL</div>;
    }
    const { name, date, location, description, bannerUrl, tickets } = event;
    return (
      <div className='Ticketing'>
        <Header title={name} imageUrl={bannerUrl} />
        <section>
            <p>{formatDate(date)}</p>
            <p>{location}</p>
            {this.renderTicketsForm(tickets)}
            <footer>
              <h5>Description</h5>
              <p>{description}</p>
            </footer>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state: { eventsState: EventsState }) {
  return {
    loading: state.eventsState.eventLoading,
    event: state.eventsState.activeEvent,
    checkoutTickets: state.eventsState.checkoutTickets
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchEvent: (url: string) => dispatch(fetchEventByUrl(url)),
    checkoutEventTickets: (url: string, tickets: TicketFormEventTicket[]) => dispatch(checkoutEventTickets(url, tickets)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Ticketing);
