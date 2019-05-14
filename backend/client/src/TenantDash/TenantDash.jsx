import React, { Component } from 'react'
import axios from 'axios'

import LandlordContactInfo from './landlordContactInfo.jsx';
import Tickets from './tickets.jsx';
import CreateTicketForm from './createTicketForm.jsx';
import '../styles/tenantDash/dashboard.css';
import '../styles/dashboards/tickets.css';

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
      creatingTicket: false,
      defaultValue: []
    }


  componentDidMount = async() => {
    await this.getTenantInfo();
    await this.handleSetState();
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
      this.getLandlordInfo(res.data.data.apartmentid)
      this.getAllTickets(res.data.data.apartmentid)
    })
  }

  getLandlordInfo = (apartmentid) => {
    axios.get(`/apartments/landlord/${apartmentid}`)
    .then(res => {
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
    const { defaultValue, ticketModalOpen } = this.state
    const { user } = this.props

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

  handleCreateTicketBtn = (e) => {
    this.setState(prevState => ({ creatingTicket: !prevState.creatingTicket }))
    console.log(this.state.creatingTicket)
    // this.setState({ ticketModalOpen: false })
  }

  render() {
     const { landlordInfo, tickets, defaultValue } = this.state;
     const { user } = this.props;
     console.log(this.state.creatingTicket, 'CREATING TICKET')

  return(
    <>
      <div className='tenant-dash-container'>
        <div className='tenant-info-container'>
          <h1>Welcome, {this.state.name}</h1>
          <LandlordContactInfo landlordInfo={landlordInfo}/>
        </div>
          <div className="ticket-dash-info">
            <h2>Tickets Information</h2>
            <div className='td-tik-ctn'>
              {this.displayUnresolvedTickets()}
            </div>
            <div
              onClick={this.handleCreateTicketBtn}
              className='create-new-tik-btn'>Create Ticket</div>
          </div>
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
