import React, { Component } from 'react';
import axios from 'axios';
import '../styles/dashboards/dashboards.css';
import '../styles/landlordDashContent/tenantContact.css';
import '../styles/landlordDashContent/tickets.css';
import '../styles/colorScheme.css';

import TenantContactInfo from './TenantContactInfo.js';
import Tickets from './tickets.jsx';

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
      landlordTiksIsShowing: false,
      selectedApt: null,
      tickets: []
    }
  }

  componentDidMount = async() => {
    await this.getLandlordInfo();
    await this.getAptsByLandlord();
    await this.getAllTickets();
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
      debugger
      this.setState({
        defaultValue: res.data.data.map(ticket => (
          {
            ticketid: ticket.id,
            apartment_id: ticket.apartment_id,
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
  }

  getAllTickets = (landlordId) => {
    axios.get(`/tickets/landlord/${this.props.match.params.id}`)
      .then(res => {
      this.setState({
        tickets: res.data.data
      })
    })
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
                className='open-tiks-btn'
                onClick={this.handlelandlordTiksShowing}
                >
                <p className='total-open-tiks'>You have {this.state.tickets.length} open ticket(s).</p>
              </button>
            </div>
          </>
        )
      })
    }
  }

  handleTenantInfoShowing = (e) => {
    if(e.target.className === 'apts-btn' || e.target.className === 'close-modal-btn') {
      this.setState({ selectedApt: e.target.id })
      this.setState({ tenantInfoIsShowing: !this.state.tenantInfoIsShowing })
    }
  }

  handlelandlordTiksShowing = (e) => {
    if(e.target.className === 'open-tiks-btn' || e.target.className === 'show-landlord-tiks-container') {
      this.setState({ landlordTiksIsShowing: !this.state.landlordTiksIsShowing })
    }
  }


  render(){
    console.log(this.state, 'STATE')
     const {tenantInfo, tickets, defaultValue, completed_tenant} = this.state;


    return(
      <>
        <div className='dash-container' id={ !this.state.tenantInfoIsShowing || !this.state.landlordTiksIsShowing ? 'show' : 'hide'} style={ this.state.tenantInfoIsShowing || this.state.landlordTiksIsShowing ? {visibility: 'hidden'} : null }>
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
          defaultValue={defaultValue}
          completed_tenant={completed_tenant}
          toggleModal={this.handlelandlordTiksShowing}
          landlordTiksShow={this.state.landlordTiksIsShowing}
          tickets={this.state.tickets}
          user={this.props.user}
          />
        </div>
      </>
    )
  }
}

export default LandlordDash
