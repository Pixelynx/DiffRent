import React, { Component } from 'react';
import axios from 'axios';
import '../styles/dashboards/dashboards.css';
import '../styles/landlordTickets/tickets.css';

import TenantContactInfo from './LandlordTenantContactDashInfo.js';
import Tickets from './tickets.jsx';
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
        apartment: null,
      },
      address: null,
      appointments: [],
      tenantInfoIsShowing: false
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
      console.log('GET LANDLORD INFO FUNCTION ', res.data.data)
      this.setState({
        id: res.data.data.landlord_id,
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

  handleTenantInfoShowing = (e) => {
    this.setState({ tenantInfoIsShowing: !this.state.tenantInfoIsShowing })
  }

  render(){
    console.log(this.state, 'LANDLORD DASH INFO')
     const {tenantInfo, tickets} = this.state;
    return(
      <>
        <h1 className='welcome-msg'>Welcome, {this.state.name}</h1>
        <TenantContactInfo tenantInfo={tenantInfo} onClick={this.handleTenantInfoShowing}
          />
      </>
    )
  }
}

export default LandlordDash
