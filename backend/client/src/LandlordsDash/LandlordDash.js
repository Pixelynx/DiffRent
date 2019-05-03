import React, { Component } from 'react';
import axios from 'axios';
import '../styles/dashboards/dashboards.css';
import '../styles/landlordDashContent/tenantContact.css';
import '../styles/landlordDashContent/tickets.css';
import '../styles/colorScheme.css';

import TenantContactInfo from './TenantContactInfo.js';
import Tickets from './tickets.js';

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
      selectedApt: null,
      tickets: [],
      defaultValue: [],
      ticketModalOpen:false,
    }
  }

  componentDidMount = async() => {
    await this.getLandlordInfo();
    await this.getAptsByLandlord();
    await this.getTicketsByLandlord();
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

  // Needs to be updated to account for one to many relationship
  getTicketsByLandlord = () => {
    const { user } = this.props
    axios.get(`/tickets/landlord/${this.props.match.params.id}`)
    .then(res => {
      this.setState({
        defaultValue: res.data.data.map(ticket => (
          {
            ticketid: ticket.ticketid,
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
                onClick={this.handleModalOpen}
                >
                You have {this.state.defaultValue.length} open ticket(s).
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

  // hacky fix to get the modal to ONLY close when the outer div is clicked
  handleModalOpen = (e) => {
    if(e.target.className === 'open-tiks-btn' || e.target.className === 'modal-container') {
      this.setState(prevState => ({ ticketModalOpen: !prevState.ticketModalOpen }))
    }
  }

  displayUnresolvedTickets = () => {
    // need to change up ticket resolve -- append resolve to tenants and landlord tickets
    const { defaultValue, ticketModalOpen } = this.state
    const { user } = this.props

    if(defaultValue.length && ticketModalOpen) {
      let srtPg = 0;
      let endPg = 3;
      let currPg;

      return defaultValue.map(ticket => {
        return (
          <>
          <div className='tickets-container'>
          <Tickets
          match={this.props.match}
          defaultValue={defaultValue}
          handleModalOpen={this.handleModalOpen}
          ticketModalOpen={ticketModalOpen}
          user={user}
          ticket={ticket}
          settingAppt={this.props.settingAppt}
          completed_landlord={this.state.completed_landlord}
          />
        </div>
        </>
      )
      })
    }
  }

  mouseEnter = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }

  mouseLeave = () => {
    this.setState(prevState => ({ hovered: !prevState.hovered }))
  }




  render(){
     const { tenantInfo, tickets, defaultValue } = this.state;
     const { user } = this.props;
     console.log(this.state.defaultValue, 'LANDLORD DEFAULT')

     if(this.state.ticketModalOpen) {
       return(
         <>
           <div
             onClick={this.handleModalOpen}
             className={'modal-container'}>
             <div className='landlord-tiks-window-container '>
               {this.displayUnresolvedTickets()}
             </div>
           </div>
         </>
       )
     }



    return(
      <>
        <div className='dash-container' style={ this.state.tenantInfoIsShowing ? {visibility: 'hidden'} : {visibility: 'visible'}}>
          <h1 className='welcome-msg'>Welcome, {this.state.name}</h1>
            <div style={this.state}className='tenant-contacts'>
              <h2>Apartments</h2>
              {this.mapTenantApts()}
            </div>
            <TenantContactInfo
              user={user}
              selectedApt={this.state.selectedApt}
              tenantInfo={tenantInfo}
              tenantModalShowing={this.state.tenantInfoIsShowing}
              closeModal={this.handleTenantInfoShowing}
          />

        </div>
      </>
    )
  }
}

export default LandlordDash
