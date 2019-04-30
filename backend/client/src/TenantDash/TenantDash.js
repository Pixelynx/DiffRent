import React, { Component } from 'react'
import axios from 'axios'

import TenantLandlordContactDashInfo from './TenantLandlordContactDashInfo.js';
import Tickets from './tickets.jsx';
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
    }


  componentDidMount = () => {
    this.getTenantInfo()
  }

  getTenantInfo = () => {
    axios.get(`/tenants/${this.props.match.params.id}`)
    .then(res => {
      console.log("tenantIfo", res.data)
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
        console.log("tickets for: ", res.data)
      this.setState({
        tickets: res.data.data
      })
    })
  }

  // hacky fix to get the modal to ONLY close when the outer div is clicked
  handleModalOpen = (e) => {
    if(e.target.className === 'modal-container' || e.target.className === 'tickets-btn') {
      this.setState(prevState => ({ ticketModalOpen: !prevState.ticketModalOpen }))
    }
  }

  displayUnresolvedTickets = () => {
    // need to change up ticket resolve -- append resolve to tenants and landlord tickets
    const { defaultValue, ticketsUnresolved, ticketsResolved, ticketModalOpen, completed_tenant } = this.state
    const { user } = this.props

    if(defaultValue && ticketModalOpen) {
      return defaultValue.map(ticket => {
        return (
          <Tickets
          handleModalOpen={this.handleModalOpen}
          ticketModalOpen={ticketModalOpen}
          user={user}
          ticket={ticket}
          />
      )
      })
    }
  }

  render() {
    console.log(this.state, "TENANT DASH PROPS")
     const { landlordInfo, tickets, ticketModalOpen } = this.state;
     const { user } = this.props;

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
                onClick={this.handleModalOpen}>You have  unresolved tickets.</button>
          </div>
      </>
    )
  }
}

export default TenantDash;
