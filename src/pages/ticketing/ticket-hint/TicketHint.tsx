import React, { Component } from 'react';
import './TicketHint.scss';

interface TicketHintProps {
  ticketId: number
  released?: boolean
  checkedOut?: boolean
  fade: (id: number) => void
}

const DELAY = 5000;

export default class TicketHint extends Component<TicketHintProps> {
  public timeout: NodeJS.Timeout | null = null;

  public componentDidMount() {
    const { ticketId, fade, released, checkedOut } = this.props;
    // ToDo: RxJs timer
    this.timeout = setTimeout(() => fade(ticketId), DELAY);
  }

  public componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  }

  public render() {
    const { released, checkedOut } = this.props;
    if (released) {
      return <span className='ticket-hint text-success'>More tickets released just now!</span>;
    }
    if (checkedOut) {
      return <span className='ticket-hint text-warning'>HOT - tickets just reserved by other guests!</span>;
    }
    return null;
  }
}
