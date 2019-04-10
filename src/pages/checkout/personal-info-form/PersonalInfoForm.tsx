import React, { Component, MouseEvent } from 'react';
import { Form } from 'react-final-form';
import { EventInfo, UserInfo, TicketFormEventTicket } from 'src/store/reducers/events';
import { EmailField, FirstNameField, LastNameField, PhoneField } from './fields';
import './PersonalInfoForm.scss';
import { formatDate } from 'src/services/date.service';

interface PersonalInfoProps {
  event: EventInfo
  tickets: TicketFormEventTicket[]
  confirm: (user: UserInfo) => void
  goBack: (event?: boolean) => void
}

export default class PersonalInfoForm extends Component<PersonalInfoProps> {
  public goBack = (event: MouseEvent) => {
    const { goBack } = this.props;
    goBack(!!event);
  }

  public handleSubmit = (data: object) => {
    const { confirm } = this.props;
    confirm(data as UserInfo);
  }

  public renderTickets = (tickets?: TicketFormEventTicket[]) => {
    if (!tickets) {
      return null;
    }
    return tickets.map(t => <p key={t.id}>{t.name} - {t.amount || 0}</p>);
  }

  public renderForm() {
    const { event: { name, date }, tickets } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        {({ handleSubmit, submitting, pristine, invalid }) => (
          <form onSubmit={handleSubmit}>
            <section>
              <div className='row'>
                <FirstNameField/>
                <LastNameField />
              </div>
              <div className='row'>
                <EmailField/>
                <PhoneField/>
              </div>
              <div>
                <p>{name}</p>
                <p>{formatDate(date)}</p>
                <h5>Your tickets</h5>
                {this.renderTickets(tickets)}
              </div>
              <footer>
                <button
                    className='btn btn-default'
                    type='button'
                    onClick={this.goBack}
                >
                    Back
                </button>
                <button
                    className='btn btn-primary'
                    type='submit'
                    disabled={submitting || pristine || invalid}
                >
                    Confirm
                </button>
              </footer>
            </section>
          </form>
        )}
      </Form>
    );
  }

  public render() {
    return (
      <div className='PersonalInfoForm'>
        <h3>Confirm personal information</h3>
        {this.renderForm()}
      </div>
    );
  }
}
