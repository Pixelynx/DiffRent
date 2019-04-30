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
  }

  tenantHandleStatus = async(e) => {
    const { defaultValue, user } = this.props
    e.preventDefault();

    let id = e.target.id;
    await defaultValue.map(ticket => {
    axios.put(`/tickets/${id}`, {
      ticketid: id,
      apartment_id: user.aptid,
      completed_tenant: `${ticket.completed_tenant === '1' ? '0' : '1'}`,
      completed_landlord: ticket.completed_landlord,
      in_progress: ticket.in_progress,
      appt_date: ticket.appt_date,
      appt_time: ticket.appt_time
    })
    .then(res => {
      this.setState(prevState => ({ completed_tenant: !prevState.completed_tenant }))
    }).catch(err => console.log("put request: ", err))
    })
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
    const { defaultValue } = this.props
    const { ticket } = this.props
    // console.log(completed_tenant, 'defaultvalue PROPS')

      let date = ticket.appt_date
      let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))
      if(!this.state.hovered) {
        return(
          <>
            <div
              className='ticket-front'
              onMouseEnter={this.mouseEnter}>
              <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
              <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
              <p>{ticket.completed_tenant === '0' ? 'UNRESOLVED' : 'RESOLVED'}</p>
            </div>
            </>
        )
          } else {
            return (
              <>
              <div
                className='ticket-back'
                onMouseLeave={this.mouseLeave}>
                <p className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</p>
                <p className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</p>
                <p className='ticket-item' id='ticket-desc'>Description: {ticket.body}</p>
              <button
                id={ticket.ticketid}
                onClick={this.tenantHandleStatus}
                className='status-btn'>{ticket.completed_tenant === '0' ? 'UNRESOLVED' : 'RESOLVED'}</button>
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
