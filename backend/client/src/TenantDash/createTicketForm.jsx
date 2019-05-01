import React, { Component } from 'react';
import axios from 'axios';
import '../styles/tenantTickets/createTicketForm.css';


class CreateTicketForm extends Component {
  state = {
    formSubmitted: false,
    formModalOpen: true,
    subjectInput: '',
    bodyInput: ''
  }

  handleModalOpen = (e) => {
    e.preventDefault();
    if(e.target.className === 'form-container' || e.target.className === 'submit-ticket-btn') {
      this.setState(prevState => ({ formModalOpen: !prevState.formModalOpen }))
    }
    console.log(e.target.className)
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
    const { subjectInput, bodyInput } = this.state
    let apartment_id = this.props.user.aptid
    let subject = subjectInput
    let body = bodyInput

    if(subjectInput && bodyInput) {
    axios.post('/tickets', {
      apartment_id,
      subject,
      body
    })
    .then(res => {
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
          <form className='form-container' onClick={this.handleModalOpen} onSubmit={this.handlePostTicket}>
            <div className='form-content'>
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
            </div>
          </form>

      </>
    )
  } else return null
  }
}

export default CreateTicketForm;
