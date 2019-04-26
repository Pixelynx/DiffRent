import React, { Component } from 'react';
import axios from 'axios';
import '../styles/tenantTickets/tickets.css';

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

  handleSubmitTicket = (e) => {
    this.setState({ formSubmitted: true })
  }

  handlePostTicket = (e) => {
    // because the first change didn't seem to get pushed properly...
    e.preventDefault()
    debugger
    const { subjectInput, bodyInput } = this.state
    let apartment_id = this.props.user.aptid
    let subject = subjectInput
    let body = bodyInput

    if(subjectInput && bodyInput) {
      debugger
    axios.post('/tickets', {
      apartment_id,
      subject,
      body
    })
    .then(res => {
      debugger
      this.setState({ subjectInput: '' })
      this.setState({ bodyInput: '' })
    })
      .catch(err => console.log(err))
    }
  }

  handleSubmit = (e) => {
    this.handlePostTicket()
  }

  render() {
    console.log(this.state)
    if(this.props.createTicket && this.state.formModalOpen) {
    return(
      <>
          <form  className='form-container' onSubmit={this.handlePostTicket}>
            <p className='create-tik-notice'>
              Please provide a detailed description of the issue within the household.
            </p>
            <input
              type='text'
              onChange={this.handleSubjectInput}
              name='subjectInput'
              value={this.state.subjectInput}
              placeholder='subject'
              id='form-subject'
              />
            <br/>
            <input
              type='text'
              onChange={this.handleBodyInput}
              name='bodyInput'
              value={this.state.bodyInput}
              placeholder='Details...'
              id='form-descr'
              />
            <br/>
            <button className='submit-ticket-btn' type='submit'>Submit Ticket</button>
          </form>

      </>
    )
  } else return null
  }
}

export default CreateTicketForm;
