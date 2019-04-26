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
      tickets: []
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

  render() {
    console.log(this.props, "TENANT DASH PROPS")
     const {landlordInfo, tickets} = this.state;
     const { user } = this.props;
    return(
      <>
        <h1>Welcome, {this.state.name}</h1>
        <TenantLandlordContactDashInfo landlordInfo={landlordInfo}/>
          <div className="ticket-dash-info">
            <h2>Tickets Information</h2>
              <Tickets user={user}/>
          </div>
      </>
    )
  }
}

export default TenantDash;
