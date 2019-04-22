import React, { Component } from 'react';
import axios from 'axios';
//import CreateTicketForm from './tenantTickets/createTicketForm.jsx';
import '../styles/colorScheme.css';
import '../styles/tickets/tickets.css';

class Tickets extends Component {

  state = {
    ticketModalOpen: false,
    ticketsUnresolved: [],
    ticketsResolved: [],
    tenantMarkedResolved: false,
    creatingTicket: false
  }

  componentDidMount = () => {
    this.handleSetState()
  }

  handleSetState = () => {
    const { user } = this.props;

    axios.get(`/tickets/${user.aptid}`)
    .then(res => {
      this.setState({ ticketsUnresolved: res.data.data})
    })
  }

  // hacky fix to get the modal to ONLY close when the outer div is clicked
  handleModalOpen = (e) => {
    const currentState = this.state.ticketModalOpen
    if(e.target.className === 'modal-container' || e.target.className === 'tickets-btn') {
      this.setState({ ticketModalOpen: !currentState })
    }
  }

  // needs to be adjused to identify whether it's a tenant or landlord logged in and update the state respectively
  tenantHandleStatus = (e) => {
    let currentState = this.state.tenantMarkedResolved;
    this.setState({ tenantMarkedResolved: !currentState })
  }

  handleCreateTicketBtn = (e) => {
    this.setState({ creatingTicket: true })
    this.setState({ ticketModalOpen: false })

  }

  displayUnresolvedTickets = () => {
    // need to change up ticket resolve -- append resolve to tenants and landlord tickets
    const { ticketsUnresolved, ticketsResolved, ticketModalOpen, tenantMarkedResolved } = this.state
    let status = 'URESOLVED';
    if(ticketsUnresolved || ticketsResolved && ticketModalOpen) {
      return ticketsUnresolved.map(ticket => {
        let date = ticket.appt_date
        let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))
          return(
            <>
            <div key={ticket.id} className='ticket-window'>
              <div className='ticket-front'>
                <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
                <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
                <p>{tenantMarkedResolved ? 'UNRESOLVED' : 'RESOLVED'}</p>
              </div>
              <div key={ticket.id} className='ticket-back'>
                <p className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</p>
                <p className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</p>
                <p className='ticket-item' id='ticket-desc'>Description: {ticket.body}</p>
                <button onClick={this.tenantHandleStatus} className='status-btn'>{status}</button>
              </div>
            </div>
            </>
        )
      })
    }
  }
  render() {
    console.log(this.props.user, 'USER PROPS')
    if(this.state.ticketModalOpen) {
      return(
        <>
          <div onClick={this.handleModalOpen} className='modal-container'>
            <div className='ticket-window-container'>
              {this.displayUnresolvedTickets()}
              <button onClick={this.handleCreateTicketBtn} className='create-ticket-btn'>Create New Ticket</button>
            </div>
          </div>
        </>
      )
    }
    return(
      <>
      <button className='tickets-btn' onClick={this.handleModalOpen}>You have {this.state.ticketsUnresolved.length} unresolved tickets.</button>
      </>
    )
  }
}
export default Tickets;

// <CreateTicketForm
// createTicket={this.state.creatingTicket} />
