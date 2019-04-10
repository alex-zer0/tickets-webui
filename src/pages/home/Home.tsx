import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dispatch } from 'redux';
import { fetchEvents } from 'src/store/actions/events';
import { EventShortInfo, EventsState } from 'src/store/reducers/events';
import './Home.scss';

export interface HomeProps {
  events: EventShortInfo[] | null
  loading: boolean
  error?: string
  fetchEvents: () => void
}

export class Home extends Component<HomeProps> {
  public componentDidMount() {
    this.props.fetchEvents();
  }

  public renderError(error: string) {
    return (
      <div className='error'>
        <h2>{error}</h2>
        <p>Please, try again a little bit later</p>
      </div>
    );
  }

  public renderLoader() {
    return (
      <div className='loader'>
        <h2>Loading...</h2>
        <p>Wait a second...</p>
      </div>
    );
  }

  public render() {
    const { events, loading, error } = this.props;
    if (loading) {
      return this.renderLoader();
    }
    if (error) {
      return this.renderError(error);
    }
    if (!events) {
      return null;
    }
    return (
      <div className='Home'>
        <ul>
          {events.map((event, i) => <li key={i}><Link to={event.url}>{event.name}</Link></li>)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps(state: { eventsState: EventsState }) {
  return {
    events: state.eventsState.events,
    loading: state.eventsState.loading,
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    fetchEvents: () => dispatch(fetchEvents()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
