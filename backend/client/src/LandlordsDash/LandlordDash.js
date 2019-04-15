import React, { Component } from 'react'
import axios from 'axios'

import TenantContactInfo from './LandlordTenantContactDashInfo.js';
import TicketDashInfo from './LandlordTicketDashInfo.js';

class LandlordDash extends Component {
  constructor(){
    super();
    this.state = {
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
    axios.get('/landlords/1')
    .then(res => {
      console.log('landlord: ', res.data.data)
      this.setState({
        name: res.data.data.name
      })
    })
  }

  getAptsByLandlord = () => {
    axios.get('/landlords/1/apartments')
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

  getAllTickets = () => {
    axios.get('/tickets/landlord/1')
      .then(res => {
      this.setState({
        tickets: res.data.data
      })
    })
  }

  render(){
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
