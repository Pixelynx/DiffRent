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
    user: 2,
    ticketModalOpen: false,
    ticketsUnresolved: [],
    ticketsResolved: [],
    landlordMarkedInProgress: false,
    landlordMarkedResolved: false,
    tenantMarkedResolved: false,
  }

  handleModalOpen = (e) => {
    const currentState = this.state.ticketModalOpen
    this.setState({ ticketModalOpen: !currentState })
  }


  render() {
    console.log(this.state)
    return(
      <>
      <button onClick={this.handleModalOpen}>Tickets</button>
      {this.state.ticketModalOpen ?
        <TenantTicket /> : null }
      </>
    )
  }
}

export default Tickets;
