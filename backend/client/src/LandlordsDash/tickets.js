import React, { Component } from 'react';
import axios from 'axios';
import SetApptCal from './setApptCal.js';

class Tickets extends Component {
  state = {
    hover: false,
    completed_landlord: false,
    settingAppt: false
  }

  mouseEnter = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  mouseLeave = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  landlordHandleStatus = (e) => {
    const { ticket, user, setCompletedLandlordState } = this.props
    e.preventDefault();

    let id = e.target.id;
    let completed_landlord = `${this.state.completed_landlord ? '0' : '1'}`;
    let in_progress = `${ticket.completed_tenant === '1' && ticket.completed_landlord === '1' ? '0' : '1'}`

      axios.put(`/tickets/${id}`, {
        ticketid: id,
        apartment_id: ticket.apartment_id,
        completed_tenant: ticket.completed_tenant,
        completed_landlord: completed_landlord,
        in_progress: in_progress,
        appt_date: ticket.appt_date,
        appt_time: ticket.appt_time
      })
      .then(res => {
        this.setState(prevState => ({ completed_landlord: !prevState.completed_landlord }))
      }).catch(err => console.log("put request: ", err))
  }

  handleSettingAppt = (e) => {
    this.setState(prevState => ({ settingAppt: !prevState.settingAppt }))
  }


  render() {
    const { ticket, match } = this.props
    const { completed_landlord } = this.state
    const path = match.path;
    console.log(this.state.settingAppt)

        let date = ticket.appt_date
        let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date))
        if(!this.state.hovered) {
        return(
          <>
            <div
              onMouseEnter={this.mouseEnter}
              className='landlord-tik-front'
              >
              <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
              <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
              <p>{completed_landlord ? 'RESOLVED' : 'UNRESOLVED'}</p>
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
                id={ticket.ticketid}
                onClick={this.landlordHandleStatus}
                className='status-btn'>{completed_landlord ? 'RESOLVED' : 'UNRESOLVED'}</button>
              <button onClick={this.handleSettingAppt} className='set-appt-btn'>Set Appointment</button>

              {path === `/landlord/:id` &&  this.state.settingAppt === true ?
                <SetApptCal
                  setAppt={this.handleSettingAppt}
                  settingAppt={this.handleSettingAppt}
                  setApptForm={this.props.setApptForm}
                  apptFormOpened={this.state.apptFormOpened}
                  ticket={this.props.ticket}
                  /> : null}

            </div>
          </>
      )
      }
      return(
        <>


        </>
      )
  }
}

export default Tickets;
