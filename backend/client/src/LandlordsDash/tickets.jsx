import React, { Component } from 'react';
import axios from 'axios';
import SetApptCal from './setApptCal.js';
import '../styles/landlordDashContent/setAppt.css';
import '../styles/tenantDash/tenantTickets/tickets.css';

class Tickets extends Component {
  state = {
    hover: false,
    completed_landlord: `${this.props.ticket.completed_landlord === '1' ? '1' : '0'}`,
    settingAppt: false,
    apptSubmitted: false,
    aptApptInfo: [],
    ticketModalOpen: false
  }

  handleTicketModal = (e) => {
    this.setState(prevState => ({ ticketModalOpen: !prevState.ticketModalOpen }))
  }

  mouseEnter = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  mouseLeave = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  landlordHandleStatus = (e) => {
    const { ticket } = this.props

    let id = e.target.id;
    let completeConfirm = `${this.state.completed_landlord === '1' ? '0' : '1'}`;
    let in_progress = `${ticket.completed_tenant === '1' && this.state.completed_landlord === '1' ? '0' : '1'}`

      axios.put(`/tickets/${id}`, {
        ticketid: id,
        apartment_id: ticket.apartment_id,
        completed_tenant: ticket.completed_tenant,
        completed_landlord: completeConfirm,
        in_progress: in_progress,
        appt_date: ticket.appt_date,
        appt_time: ticket.appt_time
      })
      .then(res => {
        this.setState({ completed_landlord: `${this.state.completed_landlord === '1' ? '0' : '1'}` })
      }).catch(err => console.log("put request: ", err))
  }

  handleSettingAppt = (e) => {
    const { ticket } = this.props

    axios.get(`/apartments/${ticket.apartment_id}`)
    .then(res => {
      this.setState({ aptApptInfo: res.data.apartment })
    }).then(() => {
      axios.get(`/tenants/${this.state.aptApptInfo.tenant_id}`)
        .then(res => {
          this.setState({ tenantName: res.data.data.name })
        }).then(() => {
          this.setState(prevState => ({ settingAppt: !prevState.settingAppt }))
        })
    })
  }

  handleSetAppt = async(e) => {
    e.preventDefault();
    const { ticket } = this.props

    let dateInput = e.target[0].value;
    let timeInput = e.target[2].value;
    let date = dateInput.replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
      await axios.put(`/tickets/${ticket.ticketid}`, {
        ticketid: ticket.ticketid,
        apartment_id: ticket.apartment_id,
        completed_tenant: '0',
        completed_landlord: '0',
        in_progress: '1',
        appt_date: date,
        appt_time: timeInput
      })
      .then(res => {
        this.setState(prevState => ({ apptSubmitted: !prevState.apptSubmitted }))
      })
      .catch(err => console.log("put request: ", err))
      await window.location.reload();
  }

  render() {
    const { ticket, match } = this.props
    const { apptSubmitted, settingAppt, ticketModalOpen } = this.state
    const path = match.path;

    if(path === `/landlord/:id` &&  this.state.settingAppt === true){
      return (
        <>
        <div className='set-appt-container'>
          <SetApptCal
          setAppt={this.handleSettingAppt}
          settingAppt={settingAppt}
          setApptForm={this.props.setApptForm}
          ticket={this.props.ticket}
          apptSet={this.handleSetAppt}
          apptSubmitted={apptSubmitted}
          handleSetAppt={this.handleSetAppt}
          aptInfo={this.state.aptApptInfo}
          tenantName={this.state.tenantName}
          />
        </div>
      </>
      )
    }

        let date = ticket.appt_date;
        let apptDate = new Intl.DateTimeFormat('en-US').format(new Date(date));
        let resolution;

        if(this.state.completed_landlord === '1' && ticket.completed_tenant === '1') {
          resolution = 'Resolved'
        } else if(this.state.completed_landlord === '1' && ticket.completed_tenant === '0') {
          resolution = 'Waiting for tenant to resolve'
        } else if(this.state.completed_landlord === '0') {
          resolution = 'Mark Resolved'
        }

    return(
      <>
      <button onClick={this.handleTicketModal} className='ld-tik' id={ticket.ticketid}>
        <div id={ticket.ticketid} className='ld-tik-subject'>{ticket.subject}</div>
        <div id={ticket.ticketid} className='ld-tik-td-appt-dt-tm'>{ticket.appt_date !== null ? apptDate : null} {ticket.appt_time !== null ? ticket.appt_time : null}</div>
      </button>

      { ticketModalOpen ?
        <>
          <div
             onMouseLeave={this.mouseLeave}
             className='mdl-indv-tik'
             >
             <div className='indv-tik'>
               <p className='mdl-tik-item' id='tik-subj'>Issue: {ticket.subject}</p>
               <p className='mdl-tik-item' id='tik-appt-date-time'>Appointment: {apptDate} {ticket.appt_time}</p>
               <p className='mdl-tik-item' id='tik-desc'>Description: {ticket.body}</p>
                 <button
                   id={ticket.ticketid}
                   onClick={this.landlordHandleStatus}
                   className='status-btn'
                   disabled={resolution === 'Resolved' ? true : false}>{resolution}</button>
                 <button
                   onClick={this.handleSettingAppt}
                   className='set-appt-btn'
                   disabled={resolution === 'Resolved' ? true : false}>Set Appointment</button>
            </div>
           </div>
       </>
        : null }
       </>
    )

  }
}

export default Tickets;


// if(!this.state.hovered) {
// return(
//   <>
//     <div
//       onMouseEnter={this.mouseEnter}
//       className='landlord-tik-front'
//       >
//       <p className='ticket-item' id='ticket-subject-front'>Issue: {ticket.subject}</p>
//       <p className='ticket-item' id='appt-date-time-front'>Appointment: {apptDate} {ticket.appt_time}</p>
//     </div>
//     </>
// )
//   } else {
//     return(
//       <>
//           <div
//             onMouseLeave={this.mouseLeave}
//             className='landlord-tik-back'
//             >
//             <p className='ticket-item' id='ticket-subject-back'>Issue: {ticket.subject}</p>
//             <p className='ticket-item' id='appt-date-time-back'>Appointment: {apptDate} {ticket.appt_time}</p>
//             <p className='ticket-item' id='ticket-desc'>Description: {ticket.body}</p>
//             <button
//               id={ticket.ticketid}
//               onClick={this.landlordHandleStatus}
//               className='landlord-status-btn'
//               disabled={resolution === 'Resolved' ? true : false}>{resolution}</button>
//             <button
//             onClick={this.handleSettingAppt}
//             className='set-appt-btn'
//             disabled={resolution === 'Resolved' ? true : false}>Set Appointment</button>
//           </div>
//       </>
//     )
//   }
