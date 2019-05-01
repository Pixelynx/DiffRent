import React, { Component } from 'react'
import axios from 'axios'

import TenantLandlordContactDashInfo from './TenantLandlordContactDashInfo.js';
import Tickets from './tickets.jsx';
import CreateTicketForm from './createTicketForm.jsx';
import '../styles/dashboards/dashboards.css';
// import TenantTicketDashInfo from './TenantTicketDashInfo.js';

import '../styles/tenantTickets/tickets.css';

class TenantDash extends Component {

    state = {
      name: '',
      age:'',
      landlordInfo: {
        id: null,
        name: '',
        apartment: null,
        email: '',
        phone: null
      },
      address: null,
      appointments: [],
      tickets: [],
      ticketModalOpen: false,
      creatingTicket: false,
      defaultValue: []
    }


  componentDidMount = async() => {
    await this.getTenantInfo()
    await this.handleSetState()
  }

  handleSetState = () => {
    const { user } = this.props;

    axios.get(`/tickets/${user.aptid}`)
    .then(res => {
      this.setState({
        defaultValue: res.data.data.map(ticket => (
          {
            ticketid: ticket.ticketid,
            apartment_id: user.aptid,
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
    .catch(err => console.log(err))
  }

  getTenantInfo = () => {
    axios.get(`/tenants/${this.props.match.params.id}`)
    .then(res => {
      this.setState({
        name: res.data.data.name,
        landlordInfo: {
          id: res.data.data.landlord_id
        }
      })
      this.getLandlordInfo(res.data.data.landlord_id)
      this.getAllTickets(res.data.data.apartmentid)
    })
  }

  getLandlordInfo = (landlordId) => {
    axios.get(`/apartments/landlord/${landlordId}`)
    .then(res => {
        console.log('yoooo', res.data)
        this.setState({
          landlordInfo: {
            name: res.data.apartment.name,
            email: res.data.apartment.email,
            phone: res.data.apartment.phone,
          }
        })
      })
  }

  getAllTickets = (apartmentId) => {
    axios.get(`/tickets/${apartmentId}`)
      .then(res => {
      this.setState({
        tickets: res.data.data
      })
    })
  }

  displayUnresolvedTickets = () => {
    // need to change up ticket resolve -- append resolve to tenants and landlord tickets
    const { defaultValue, ticketsUnresolved, ticketsResolved, ticketModalOpen, completed_tenant } = this.state
    const { user } = this.props

    if(defaultValue.length && ticketModalOpen) {
      return defaultValue.map(ticket => {
        return (
          <Tickets
          defaultValue={defaultValue}
          handleModalOpen={this.handleModalOpen}
          ticketModalOpen={ticketModalOpen}
          user={user}
          ticket={ticket}
          />
      )
      })
    }
  }

  handleModalOpen = () => {
    this.setState((prevState) => ({ticketModalOpen: !prevState.ticketModalOpen}))
  }

  handleCreateTicketBtn = (e) => {
    this.setState(prevState => ({ creatingTicket: !prevState.creatingTicket }))
    this.setState(prevState => ({ ticketModalOpen: !prevState.ticketModalOpen }))

  }

  render() {
     const { landlordInfo, tickets, ticketModalOpen, defaultValue } = this.state;
     const { user } = this.props;

     console.log('TENANT DASH', this.state)

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
        <h1>Welcome, {this.state.name}</h1>
        <TenantLandlordContactDashInfo landlordInfo={landlordInfo}/>
          <div className="ticket-dash-info">
            <h2>Tickets Information</h2>
              <button
                className='tickets-btn'
                onClick={this.handleModalOpen}>You have {defaultValue.length} open ticket(s)</button>
          </div>
          <CreateTicketForm
            createTicket={this.state.creatingTicket}
            user={this.props.user}
            />
      </>
    )
  }
}

export default TenantDash;
