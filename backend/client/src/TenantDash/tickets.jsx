import React, { Component } from 'react';
import axios from 'axios';
import CreateTicketForm from './createTicketForm.jsx';
import '../styles/colorScheme.css';
import '../styles/tenantTickets/tickets.css';

class Tickets extends Component {

  state = {
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


  render() {
    const { completed_tenant } = this.state
    const { ticket } = this.props
    console.log(this.state)

      let status = 'URESOLVED';
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
      return <CreateTicketForm
        createTicket={this.state.creatingTicket}
        user={this.props.user}
        />

}
}
export default Tickets;
