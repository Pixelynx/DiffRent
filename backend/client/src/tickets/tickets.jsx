import React, { Component } from 'react';
import axios from 'axios';
import TenantTicket from './tenantTickets/tenantTicket.jsx';
import '../styles/colorScheme.css';
import '../styles/tickets/tickets.css';

// modal display of tickets
// automatically set on open tickets
// tickets will be displayed as cards
  // front will display subject, and date of appointment (if applicable)
// cards flip to show more info on hover
  // back will display subject, date/time of appointment, and descr of problem

class Tickets extends Component {
  constructor() {
    super()
  }
  state = {
    apt: 2,
    ticketModalOpen: false,
    ticketsUnresolved: [],
    ticketsResolved: [],
    landlordMarkedInProgress: false,
    landlordMarkedResolved: false,
    tenantMarkedResolved: false,
  }

  componentDidMount = () => {
    this.handleSetState()
  }

  handleSetState = () => {
    axios.get(`/tickets/${this.state.apt}`)
    .then(res => {
      this.setState({ ticketsUnresolved: res.data.data})
    })
  }

  handleModalOpen = (e) => {
    const currentState = this.state.ticketModalOpen
    this.setState({ ticketModalOpen: !currentState })
  }

  displayUnresolvedTickets = () => {
    // need a better way to
    const { ticketsUnresolved, ticketModalOpen } = this.state
    if(ticketsUnresolved && ticketModalOpen) {
      let showTickets = ticketsUnresolved.map(ticket => {
        let date = ticket.appt_date
        let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))
        // let appointment = new Date(`apptDate ${ticket.appt_time}`)
          return(
            <>
            <div className='ticket-window'>
              <ul className='ticket-front'>
                <li className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</li>
                <li className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</li>
              </ul>
              <ul className='ticket-back'>
                <li className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</li>
                <li className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</li>
                <li className='ticket-item' id='ticket-desc'>Description: {ticket.body}</li>
              </ul>
            </div>
            </>
        )
      })
      return showTickets
    }
  }

  render() {
    console.log(this.state)

    if(this.state.ticketModalOpen) {
      return(
        <>
          <div onClick={this.handleModalOpen} className='tickets-container'>
            <div className='ticket-window-container'>
              {this.displayUnresolvedTickets()}
            </div>
          </div>
        </>
      )
    }

    return(
      <>
      <button onClick={this.handleModalOpen}>Tickets</button>


      </>
    )
  }
}

export default Tickets;
