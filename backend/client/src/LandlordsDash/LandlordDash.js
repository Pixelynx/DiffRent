import React, { Component } from 'react'
import axios from 'axios'

import TenantContactInfo from './TenantContactInfo.js';
import TicketDashInfo from './TicketDashInfo.js';

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
    this.getAptsByLandlord();
    this.getAllTickets();
  }

  getAptsByLandlord = () => {
    axios.get('/landlords/1/apartments')
    .then(res => {
      this.setState({
        tenantInfo: {
          name: res.data.data[0].name,
          apartment_id: res.data.data[0].apartment_id,
          address: res.data.data[0].address,
          email: res.data.data[0].email,
          phone: res.data.data[0].phone,
        }
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
        <TenantContactInfo tenantInfo={tenantInfo}/>
        <TicketDashInfo tickets={tickets} />
      </>
    )
  }
}

export default LandlordDash
