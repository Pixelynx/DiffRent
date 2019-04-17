import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/tickets/createTicketForm.css';

class CreateTicketForm extends Component {
  state = {
    formSubmitted: false,
    formModalOpen: true
  }

  handleModalOpen = (e) => {
    e.preventDefault();
    const currentState = this.state.formModalOpen
    if(e.target.className === 'form-modal-container' || e.target.className === 'submit-ticket-btn') {
      this.setState({ formModalOpen: !currentState })
    }

  }

  render() {
    console.log(this.state)
    if(this.props.createTicket && this.state.formModalOpen) {
    return(
      <>
        <div onClick={this.handleModalOpen} className='form-modal-container'>
          <input className='submit-ticket-btn' type='submit' value='Submit Ticket'/>
        </div>

      </>
    )
  } else return null
  }
}

export default CreateTicketForm;
