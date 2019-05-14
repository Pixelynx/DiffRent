import React, { Component } from 'react';
import axios from 'axios';
import '../styles/tenantDash/tenantTickets/createTicketForm.css';


class CreateTicketForm extends Component {
  state = {
    formSubmitted: false,
    formModalOpen: `${this.props.createTicket ? 'false' : 'true'}`,
    subjectInput: '',
    bodyInput: ''
  }

  handleModalOpen = (e) => {
    if(e.target.className === 'form-inner-ctn' || e.target.className === 'form-outter-ctn' || e.target.className === 'create-new-tik-btn') {
      this.setState(prevState => ({ formModalOpen: !prevState.formModalOpen }))
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
    window.location.reload();
  }

  handleSubmit = (e) => {
    this.handlePostTicket()
  }

  render() {
console.log(this.state, 'create ticket form')

    if(this.props.createTicket && this.state.formModalOpen) {
    return(
      <>
          <form className='form-outter-ctn' onClick={this.handleModalOpen} onSubmit={this.handlePostTicket}>
            <div className='form-inner-ctn'>
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
            <textarea
              name='textarea'
              onChange={this.handleBodyInput}
              name='bodyInput'
              value={this.state.bodyInput}
              placeholder='Details...'
              id='form-descr'
              />
            <br/>
            <button className='submit-ticket-btn' type='submit'>Submit Ticket</button>
            </div>
            </div>
          </form>

      </>
    )
  } else return null
  }
}

export default CreateTicketForm;
