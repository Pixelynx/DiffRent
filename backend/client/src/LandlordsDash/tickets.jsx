import React, { Component } from 'react';
import axios from 'axios';
import { SetApptCal } from './setApptCal.jsx';

class Tickets extends Component {
  state = {
    hover: false,
    apptFormOpened: false,
    landlordMarkedResolved: false
  }

  landlordHandleStatus = (e) => {
    const { defaultValue, completed_tenant } = this.props
    e.preventDefault();

    let completed_landlord = `${defaultValue.completed_landlord ? '0' : '1'}`;

    let id = 4;
    let apartment_id = 2;

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
      this.setState(prevState => ({ completed_landlord: !prevState.completed_landlord }))
    }).catch(err => console.log(err))
  }

  // component for card and put event handler in component
  renderLandlordTiks = () => {
    let status;
    const { completed_landlord } = this.state
    const { tickets, landlordTiksIsShowing } = this.props
    console.log(status)

    if(tickets) {
      return tickets.map(ticket => {
        let date = ticket.appt_date
        let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))
        if(!this.state.hover) {
        return(
          <>
            <form
              onMouseEnter={this.mouseEnter}
              className='landlord-tik-front'
              >
              <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
              <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
              <p>{completed_landlord ? 'RESOLVED' : 'UNRESOLVED'}</p>
            </form>
            </>
        )
          } else {
            return(
              <>
            <form
              onMouseLeave={this.mouseLeave}
              className='landlord-tik-back'
              >
              <p className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</p>
              <p className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</p>
              <p className='ticket-item' id='ticket-desc'>Description: {ticket.body}</p>
              <input type='hidden' readOnly='true' value={ticket.completed_tenant} />
              <button
                id={ticket.id}
                onClick={this.completed_landlord}
                className='status-btn'>{completed_landlord ? 'RESOLVED' : 'UNRESOLVED'}</button>
            </form>
          </>
      )
      }
      })
    }
  }

  mouseEnter = () => {
    this.setState(prevState => ({ hover: !prevState.hover }))
  }

  mouseLeave = () => {
    this.setState(prevState => ({ hover: !prevState.hover }))
  }

  handleApptForm = (e) => {
    this.setState(prevState => ({ apptFormOpened: !prevState.apptFormOpened }))
  }


  render() {
    console.log(this.state, 'LANDLORD TIKS STATE')
    console.log(this.props, 'LANDLORD TIKS PROPS')
    if(this.props.landlordTiksShow) {

      return(
        <>
         <div
           className={this.props.landlordTiksShow ? 'show-landlord-tiks-container' : 'hide-landlord-tiks-container'}
           onClick={this.props.toggleModal}>
          <div className='landlord-tiks-window'>
            {this.renderLandlordTiks()}
          </div>
         </div>
         <SetApptCal
           hover={this.state.hover}
           apptFormOpened={this.state.apptFormOpened}
           />
        </>
      )
    }
    return null
  }
}

export default Tickets;
