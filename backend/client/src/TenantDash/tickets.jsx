import React, { Component } from 'react';
import axios from 'axios';
import CreateTicketForm from './createTicketForm.jsx';
import '../styles/colorScheme.css';
import '../styles/tenantTickets/tickets.css';

class Tickets extends Component {

  state = {
    ticketModalOpen: false,
    ticketsUnresolved: [],
    ticketsResolved: [],
    creatingTicket: false,
  }

  componentDidMount = () => {
    this.handleSetState()
  }

  handleSetState = () => {
    const { user } = this.props;

    axios.get(`/tickets/${user.aptid}`)
    .then(res => {
      this.setState({
        defaultValue: res.data.data.map(ticket => (
          {
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
        ))
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
    const { defaultValue } = this.state
    e.preventDefault();

    let completed_tenant = `${defaultValue.completed_tenant ? '0' : '1'}`;
    let id = 4;

    axios.put(`/tickets/${id}`, {
      ticketid: id,
      apartment_id: defaultValue.apartment_id,
      completed_tenant: completed_tenant,
      completed_landlord: defaultValue.completed_landlord,
      subject: defaultValue.subject,
      body: defaultValue.body,
      in_progress: defaultValue.in_progress,
      appt_date: defaultValue.appt_date,
      appt_time: defaultValue.appt_time
    })
    .then(res => {
      this.setState(prevState => ({ completed_tenant: !prevState.completed_tenant }))
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
    const { defaultValue, ticketsUnresolved, ticketsResolved, ticketModalOpen, completed_tenant } = this.state
    let status = 'URESOLVED';
    if(defaultValue && ticketModalOpen) {
      return defaultValue.map(ticket => {

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
                <p>{completed_tenant ? 'UNRESOLVED' : 'RESOLVED'}</p>
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
      <button className='tickets-btn' onClick={this.handleModalOpen}>You have  unresolved tickets.</button>
      <CreateTicketForm
        createTicket={this.state.creatingTicket}
        user={this.props.user}
        />
      </>
    )
  }
}
export default Tickets;
