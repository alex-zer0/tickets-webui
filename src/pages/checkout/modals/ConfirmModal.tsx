import React from 'react';
import { Link } from 'react-router-dom';
import { EventInfo } from 'src/store/reducers/events';
import './ConfirmModal.scss';

interface ConfirmModalProps {
  event: EventInfo
  referenceId: number | null
}

const ConfirmModal = ({ event, referenceId }: ConfirmModalProps) => {
  if (!event) {
    return null;
  }
  return (
    <div className='modal'>
      <div className='modal-dialog' role='document'>
        <div className='modal-content'>
          <div className='modal-header'>
            <h5 className='modal-title' id='exampleModalLabel'>Checkout successful!</h5>
            <Link to={event.url} className='close'>&times;</Link>
          </div>
          <div className='modal-body'>
            <p>Congratulations! You have successfully purchased your ticket(s).</p>
            <p>Your reference ID: {referenceId}</p>
          </div>
          <div className='modal-footer'>
            <Link className='btn btn-primary' to={event.url}>Back to event</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
