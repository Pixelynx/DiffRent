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
      this.setState({ ticketsResolved: res.data.data})
    })
  }

  handleModalOpen = (e) => {
    const currentState = this.state.ticketModalOpen
    this.setState({ ticketModalOpen: !currentState })
  }

  displayUnresolvedTickets = () => {
    const { ticketsUnresolved, ticketModalOpen } = this.state
    if(ticketsUnresolved && ticketModalOpen) {
      let showTickets = ticketsUnresolved.map(ticket => {
          return <li>{ticket.subject}</li>
      })
      return showTickets
    }
  }

  render() {
    console.log(this.state)
    return(
      <>
      <button onClick={this.handleModalOpen}>Tickets</button>
      {this.state.ticketModalOpen ?
        <TenantTicket
          displayUnresolvedTickets={this.displayUnresolvedTickets}/> : null }
      </>
    )
  }
}

export default Tickets;
