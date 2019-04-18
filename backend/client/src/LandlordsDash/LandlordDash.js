import React, { Component } from 'react'
import axios from 'axios'

import TenantContactInfo from './LandlordTenantContactDashInfo.js';
import TicketDashInfo from './LandlordTicketDashInfo.js';

class LandlordDash extends Component {
  constructor(){
    super();
    this.state = {
      id: null,
      name: '',
      age:'',
      tenantInfo: {
        name: '',
        apartment: null
      },
      address: null,
      appointments: [],
      tickets: []
    }
  }

  componentDidMount(){
    this.getLandlordInfo();
    this.getAptsByLandlord();
    this.getAllTickets();
  }

  getLandlordInfo = () => {
    axios.get(`/landlords/${this.props.match.params.id}`)
    .then(res => {
      console.log('landlord: ', res.data.data)
      this.setState({
        id: res.data.data.id,
        name: res.data.data.name
      })
    })
  }

  getAptsByLandlord = () => {
    axios.get(`/landlords/${this.props.match.params.id}/apartments`)
    .then(res => {
      res.data.data.map(info => {
        this.setState({
          tenantInfo: {
            name: info.name,
            apartment_id: info.apartment_id,
            address: info.address,
            email: info.email,
            phone: info.phone,
          }
        })
      })
    })
  }

  getAllTickets = (landlordId) => {
    axios.get(`/tickets/landlord/${this.props.match.params.id}`)
      .then(res => {
        console.log("landlordTicket", res.data)
      this.setState({
        tickets: res.data.data
      })
    })
  }

  render(){
    console.log(this.props)
     const {tenantInfo, tickets} = this.state;
    return(
      <>
        <h1>Welcome, {this.state.name}</h1>
        <TenantContactInfo tenantInfo={tenantInfo}/>
        <TicketDashInfo tickets={tickets} />
      </>
    )
  }
}

export default LandlordDash
