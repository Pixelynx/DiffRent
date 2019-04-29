import React, { Component } from 'react';
import axios from 'axios';
import CreateTicketForm from './createTicketForm.jsx';
import '../styles/colorScheme.css';
import '../styles/tenantTickets/tickets.css';

class Tickets extends Component {

  state = {
    defaultValue: [],
    ticketModalOpen: false,
    ticketsUnresolved: [],
    ticketsResolved: [],
    tenantMarkedResolved: false,
    creatingTicket: false,
  }

  componentDidMount = () => {
    this.handleSetState()
  }

  handleSetState = () => {
    const { user } = this.props;

    axios.get(`/tickets/${user.aptid}`)
    .then(res => {
      res.data.data.map(ticket => {
        this.setState({ defaultValue: {
          ticketid: ticket.id,
          apartment_id: ticket.apartment_id,
          completed_tenant: ticket.completed_tenant,
          completed_landlord: ticket.completed_landlord,
          subject: ticket.subject,
          body: ticket.body,
          in_progress: ticket.in_progress,
          appt_date: ticket.appt_date,
          appt_time: ticket.appt_time
          }
        })
      })
    })

  }

  // hacky fix to get the modal to ONLY close when the outer div is clicked
  handleModalOpen = (e) => {
    const currentState = this.state.ticketModalOpen
    if(e.target.className === 'modal-container' || e.target.className === 'tickets-btn') {
      this.setState({ ticketModalOpen: !currentState })
    }
  }

  tenantHandleStatus = (e) => {
    e.preventDefault();

    let completed_tenant = `${this.state.tenantMarkedResolved ? '0' : '1'}`;

    let id = 4;
    let apartment_id = this.props.user.aptid;

    axios.patch(`/tickets/${id}`, {
      apartment_id,
      completed_tenant
    })
    .then(res => {
      this.setState(prevState => ({ tenantMarkedResolved: !prevState.tenantMarkedResolved }))
    }).catch(err => console.log(err))
  }

  handleCreateTicketBtn = (e) => {
    this.setState({ creatingTicket: true })
    this.setState({ ticketModalOpen: false })

  }

  mouseEnter = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  mouseLeave = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  displayUnresolvedTickets = () => {
    // need to change up ticket resolve -- append resolve to tenants and landlord tickets
    const { ticketsUnresolved, ticketsResolved, ticketModalOpen, tenantMarkedResolved } = this.state
    let status = 'URESOLVED';
    if(ticketsUnresolved || ticketsResolved && ticketModalOpen) {
      return ticketsUnresolved.map(ticket => {
        let date = ticket.appt_date
        let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))

        if(!this.state.hovered) {
          return(
            <>
              <div
                key={ticket.id}
                className='ticket-front'
                onMouseEnter={this.mouseEnter}>
                <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
                <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
                <p>{tenantMarkedResolved ? 'UNRESOLVED' : 'RESOLVED'}</p>
              </div>
              </>
          )
            } else {
              return (
                <>
                <div
                  key={ticket.id}
                  className='ticket-back'
                  onMouseLeave={this.mouseLeave}>
                  <p className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</p>
                  <p className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</p>
                  <p className='ticket-item' id='ticket-desc'>Description: {ticket.body}</p>
                <button
                  id={ticket.id}
                  onClick={this.tenantHandleStatus}
                  className='status-btn'>{status}</button>
              </div>
            </>
          )
        }
      })
    }
  }
  render() {
    console.log(this.state)
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
      <CreateTicketForm
        createTicket={this.state.creatingTicket}
        user={this.props.user}
        />
      </>
    )
  }
}
export default Tickets;
