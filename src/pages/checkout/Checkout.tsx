import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dispatch } from 'redux';
import Header from 'src/components/header/Header';
import { releaseEventTickets, confirmEventTickets, resetConfirmReferenceId } from 'src/store/actions/events';
import { EventInfo, EventsState, UserInfo, TicketFormEventTicket } from 'src/store/reducers/events';
import ConfirmModal from './modals/ConfirmModal';
import PersonalInfoForm from './personal-info-form/PersonalInfoForm';
import './Checkout.scss';

export interface CheckoutProps {
  event: EventInfo | null
  tickets: TicketFormEventTicket[] | null
  confirmReferenceId: number | null
  confirmEventTickets: (url: string, tickets: TicketFormEventTicket[], user: UserInfo) => void 
  releaseEventTickets: (url: string, tickets: TicketFormEventTicket[]) => void
  resetConfirmReferenceId: () => void
}
interface CheckoutState {
  showConfirmModal: boolean
  goToEvent: boolean
  isReleased: boolean
  referenceId: number | null
}

export class Checkout extends Component<CheckoutProps, CheckoutState> {
  public state: CheckoutState = {
    showConfirmModal: false,
    referenceId: null,
    goToEvent: false,
    isReleased: false,
  };

  public handleConfirm = async (user: UserInfo) => {
    const { event, tickets, confirmEventTickets } = this.props;
    if (!event || !tickets) {
      return;
    }
    confirmEventTickets(event.url, tickets, user);
  }

  public goBack = async () => {
    const { event, tickets, confirmReferenceId, releaseEventTickets, resetConfirmReferenceId } = this.props;
    if (!event) {
      return;
    }
    if (confirmReferenceId) {
      resetConfirmReferenceId();
    } else if (tickets) {
      releaseEventTickets(event.url, tickets);
    }
  }

  public componentWillUnmount() {
    this.goBack();
  }

  public render() {
    const { event, tickets, confirmReferenceId } = this.props;
    if (!event) {
      return null;
    }
    if (!tickets && !confirmReferenceId) {
      return <Redirect to={event.url} />;
    }

    const { name, bannerUrl } = event;
    return (
      <div className='Checkout'>
        <Header title={name} imageUrl={bannerUrl} pageTitle='Checkout' />
        {tickets && <PersonalInfoForm event={event} tickets={tickets} confirm={this.handleConfirm} goBack={this.goBack} />}
        {confirmReferenceId && <ConfirmModal event={event} referenceId={confirmReferenceId} />}
      </div>
    );
  }
}

function mapStateToProps(state: { eventsState: EventsState }) {
  return {
    event: state.eventsState.activeEvent,
    tickets: state.eventsState.checkoutTickets,
    confirmReferenceId: state.eventsState.confirmReferenceId
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    confirmEventTickets: (url: string, tickets: TicketFormEventTicket[], user: UserInfo) =>
      dispatch(confirmEventTickets(url, tickets, user)),
    releaseEventTickets: (url: string, tickets: TicketFormEventTicket[]) =>
      dispatch(releaseEventTickets(url, tickets)),
    resetConfirmReferenceId: () => dispatch(resetConfirmReferenceId()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
