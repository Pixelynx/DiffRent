import React, { Component } from 'react';
import axios from 'axios';
import '../../styles/tickets/createTicketForm.css';
import '../../logo/DiffRent_logo_official.png';

class CreateTicketForm extends Component {
  state = {
    formSubmitted: false,
    formModalOpen: true,
    subjectInput: '',
    bodyInput: ''
  }

  handleModalOpen = (e) => {
    e.preventDefault();
    const currentState = this.state.formModalOpen
    if(e.target.className === 'form-modal-container' || e.target.className === 'submit-ticket-btn') {
      this.setState({ formModalOpen: !currentState })
    }
  }

  handleSubjectInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handleBodyInput = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  handlePostTicket = (e) => {
    e.preventDefault()
    const { subjectInput, bodyInput } = this.state

    if(subjectInput && bodyInput) {
    axios.post('/tickets', {
      subject: subjectInput,
      body: bodyInput
    })
      .catch(err => console.log(err))
    }
  }

  render() {
    console.log(this.state)
    if(this.props.createTicket && this.state.formModalOpen) {
    return(
      <>
        <div onClick={this.handleModalOpen} className='form-modal-container'>
          <form className='form-container'>
            <img src='../../logo/DiffRent_logo_official.png'/>
            <p className='create-tik-notice'>Please provide a detailed description of the issue within the household.</p>
            <input type='text' onChange={this.handleSubjectInput} placeholder='subject' id='form-subject'/>
            <br/>
            <input type='text' onChange={this.handleBodyInput} placeholder='Details...' id='form-descr'/>
            <br/>
            <input className='submit-ticket-btn' name='subjectInput' type='submit' value='Submit Ticket'/>
          </form>
        </div>

      </>
    )
  } else return null
  }
}

export default CreateTicketForm;
