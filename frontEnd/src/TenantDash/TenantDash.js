import React, { Component } from 'react'
import axios from 'axios'

import TenantLandlordContactDashInfo from './TenantLandlordContactDashInfo.js';
import TenantTicketDashInfo from './TenantTicketDashInfo.js';

class TenantDash extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      age:'',
      landlordInfo: {
        name: '',
        apartment: null,
        email: '',
        phone: null
      },
      address: null,
      appointments: [],
      tickets: []
    }
  }

  componentDidMount(){
    this.getTenantInfo();
    this.getLandlordInfo();
    this.getAllTickets();
  }

  getTenantInfo = () => {
    axios.get('/tenants/1')
    .then(res => {
      console.log('tenants: ', res.data.data)
      this.setState({
        name: res.data.data.name
      })
    })
  }

  getLandlordInfo = () => {
    axios.get('/apartments/1/landlord/1')
    .then(res => {
        debugger;
      res.data.apartment.map(info => {
        this.setState({
          landlordInfo: {
            name: info.name,
            apartment_id: info.apartment_id,
            email: info.email,
            phone: info.phone
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
     const {landlordInfo, tickets} = this.state;
    return(
      <>
        <h1>Welcome, {this.state.name}</h1>
        <TenantLandlordContactDashInfo landlordInfo={landlordInfo}/>
        <TenantTicketDashInfo tickets={tickets} />
      </>
    )
  }
}

export default TenantDash
