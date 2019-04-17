import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/tickets/createTicketForm.css';

class CreateTicketForm extends Component {
  state = {
    formSubmitted: false,
    formModalOpen: false
  }

  render() {
    if(this.props.createTicket) {
    return(
      <div className='form-modal-container'></div>
    )
  } else return null
  }
}

export default CreateTicketForm;
