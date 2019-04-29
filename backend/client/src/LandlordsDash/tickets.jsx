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
    this.setState(prevState => ({ landlordMarkedResolved: !prevState.landlordMarkedResolved }))
  }

  landlordHandleStatus = (e) => {
    // console.log(e.target.id)

    let completed_landlord = `${this.state.landlordHandleStatus ? '0' : '1'}`;

    let id = 4;
    let apartment_id = 2;

    axios.put(`/tickets/${id}`, {
      apartment_id,
      completed_landlord
    })
    .then(res => {
      this.setState(prevState => ({ landlordHandleStatus: !prevState.landlordHandleStatus }))
    }).catch(err => console.log(err))
  }

  // component for card and put event handler in component
  renderLandlordTiks = () => {
    let status;
    const { landlordMarkedResolved } = this.state
    const { tickets, landlordTiksIsShowing } = this.props
    console.log(status)

    if(tickets) {
      return tickets.map(ticket => {
        let date = ticket.appt_date
        let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))
        if(!this.state.hover) {
        return(
          <>
            <div
              onMouseEnter={this.mouseEnter}
              className='landlord-tik-front'
              >
              <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
              <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
              <p>{landlordMarkedResolved ? 'RESOLVED' : 'UNRESOLVED'}</p>
            </div>
            </>
        )
          } else {
            return(
              <>
            <div
              onMouseLeave={this.mouseLeave}
              className='landlord-tik-back'
              >
              <p className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</p>
              <p className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</p>
              <p className='ticket-item' id='ticket-desc'>Description: {ticket.body}</p>
              <button
                id={ticket.id}
                onClick={this.landlordHandleStatus}
                className='status-btn'>{landlordMarkedResolved ? 'RESOLVED' : 'UNRESOLVED'}</button>
            </div>
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
