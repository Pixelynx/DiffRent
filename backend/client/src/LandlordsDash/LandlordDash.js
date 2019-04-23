import React, { Component } from 'react';
import axios from 'axios';
import '../styles/dashboards/dashboards.css';
import '../styles/landlordTickets/tickets.css';
import '../styles/colorScheme.css';

import TenantContactInfo from './TenantContactInfo.js';
import {Tickets} from './tickets.jsx';
import TicketDashInfo from './LandlordTicketDashInfo.js';

class LandlordDash extends Component {
  constructor(){
    super();
    this.state = {
      id: null,
      name: '',
      age:'',
      tenantInfo: [{
        name: '',
        apartment: null
      }],
      address: null,
      appointments: [],
      tenantInfoIsShowing: false,
      tenantTiksIsShowing: false,
      selectedApt: null,
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
          tenantInfo: [{
            name: info.name,
            apartment_id: info.apartment_id,
            address: info.address,
            email: info.email,
            phone: info.phone,
          }]
        })
      })
    })
  }

  getAllTickets = (landlordId) => {
    axios.get(`/tickets/landlord/${this.props.match.params.id}`)
      .then(res => {
      this.setState({
        tickets: res.data.data
      })
    })
  }

  handleTenantInfoShowing = (e) => {
    if(e.target.className === 'apts-btn' || e.target.className === 'close-modal-btn') {
      this.setState({ selectedApt: e.target.id })
      this.setState({ tenantInfoIsShowing: !this.state.tenantInfoIsShowing })
    }
    console.log(e.target.className)
  }

  // can consider this as preparation for future iteration of one to many relationship
  mapTenantApts = () => {

    if(this.state.tenantInfo) {
      return this.state.tenantInfo.map(tenant => {
        return (
          <>
            <div className='apts-btn-container'>
              <button
                className='apts-btn'
                id={tenant.apartment_id}
                onClick={this.handleTenantInfoShowing}>
                {tenant.address}
              </button>
              <button
                className='open-tiks-btn'>
                {this.state.tickets.length}
              </button>
            </div>
          </>
        )
      })
    }
  }

  handleTenantTiksShowing = (e) => {
    if(e.target.className === 'open-tiks-btn' || e.target.className === 'landlord-tiks-container') {
      this.setState({ tenantTiksIsShowing: !this.state.tenantTiksIsShowing })
    }
  }


  render(){
    console.log(this.state, 'STATE')
     const {tenantInfo, tickets} = this.state;


    return(
      <>
        <div className='dash-container' id={ !this.state.tenantInfoIsShowing ? 'show' : 'hide'} style={ this.state.tenantInfoIsShowing ? {visibility: 'hidden'} : null }>
          <h1 className='welcome-msg'>Welcome, {this.state.name}</h1>
            <div className='tenant-contacts'>
              <h2>Apartments</h2>
              {this.mapTenantApts()}
            </div>
            <TenantContactInfo
              selectedApt={this.state.selectedApt}
              tenantInfo={tenantInfo}
              tenantModalShowing={this.state.tenantInfoIsShowing}
              closeModal={this.handleTenantInfoShowing}
          />
        <Tickets
          toggleModal={this.handleTenantTiksShowing}
          />
        </div>
      </>
    )
  }
}

export default LandlordDash
