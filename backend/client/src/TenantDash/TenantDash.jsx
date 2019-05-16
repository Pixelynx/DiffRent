import React, { Component } from 'react'
import axios from 'axios'

import LandlordContactInfo from './landlordContactInfo.jsx';
import Tickets from './tickets.jsx';
import CreateTicketForm from './createTicketForm.jsx';
import ArchivedTickets from '../archivedTickets.jsx';

import '../styles/tenantDash/dashboard.css';
import '../styles/dashboards/tickets.css';

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
      creatingTicket: false,
      defaultValue: [],
      resolvedTickets: [],
      archivedTicketsShowing: false,
      unresolvedTicketsShowing: true
    }


  componentDidMount = async() => {
    await this.getTenantInfo();
    await this.handleSetState();
  }

  handleSetState = () => {
    const { user } = this.props;

    axios.get(`/tickets/${user.aptid}`)
    .then(res => {
      this.setState({
        defaultValue: res.data.data.map(ticket => (
          {
            ticketid: ticket.ticketid,
            apartment_id: user.aptid,
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
    .catch(err => console.log(err))
  }

  getTenantInfo = () => {
    axios.get(`/tenants/${this.props.match.params.id}`)
    .then(res => {
      this.setState({
        name: res.data.data.name,
        landlordInfo: {
          id: res.data.data.landlord_id
        }
      })
      this.getLandlordInfo(res.data.data.apartmentid)
      this.getAllTickets(res.data.data.apartmentid)
    })
  }

  getLandlordInfo = (apartmentid) => {
    axios.get(`/apartments/landlord/${apartmentid}`)
    .then(res => {
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
      this.setState({
        tickets: res.data.data
      })
    })
  }

  displayTickets = () => {
    // need to change up ticket resolve -- append resolve to tenants and landlord tickets
    const { defaultValue, ticketModalOpen, archivedTicketsShowing, unresolvedTicketsShowing, resolvedTickets } = this.state
    const { user } = this.props

    if(unresolvedTicketsShowing) {
      return defaultValue.map(ticket => {
        if(ticket.completed_landlord === '0' || ticket.completed_tenant === '0') {
          return (
            <Tickets
            defaultValue={defaultValue}
            handleModalOpen={this.handleModalOpen}
            ticketModalOpen={ticketModalOpen}
            user={user}
            ticket={ticket}
            />
          )
        }

      })
    } else if(archivedTicketsShowing) {
      return defaultValue.map(ticket => {
        if(ticket.completed_landlord === '1' && ticket.completed_tenant === '1') {
          return (
            <ArchivedTickets
            defaultValue={defaultValue}
            archiveShowing={archivedTicketsShowing}
            resolvedTiks={this.state.resolvedTickets}
            handleResolved={this.handleResolvedTicket}
            user={user}
            ticket={ticket}
            />
          )
        }
      })
    }
  }

  handleCreateTicketBtn = (e) => {
    if(e.target.className === 'create-new-tik-btn' || e.target.className === 'form-outter-ctn' || e.target.className === 'form-inner-ctn') {
      this.setState(prevState => ({ creatingTicket: !prevState.creatingTicket }))
    }
  }

  handleResolvedTicket = () => {
    const { defaultValue } = this.state;
    let resolvedTickets = []

    return defaultValue.filter(ticket => {
      if(ticket.in_progress === '0') {
        resolvedTickets.push(ticket)
      }
      this.setState({ resolvedTickets: resolvedTickets })
    })
  }


  handleArchivedDisplay = (e) => {
    this.setState(prevState => ({ archivedTicketsShowing: !prevState.archivedTicketsShowing }))
    this.setState(prevState => ({ unresolvedTicketsShowing: !prevState.unresolvedTicketsShowing }))
  }

  render() {
     const { landlordInfo, tickets, defaultValue } = this.state;
     const { user } = this.props;

  return(
    <>

    {this.handleResolvedTicket}

      <div className='tenant-dash-container'>
        <div className='tenant-info-container'>
          <h1>Welcome, {this.state.name}</h1>
          <LandlordContactInfo landlordInfo={landlordInfo}/>
        </div>
          <div className='tik-dash-ctn'>
            <div className='ticket-dash-info'>
              <h2>Tickets Information</h2>
              <div className='td-tik-ctn'>
                {this.displayTickets()}
              </div>
              <div className='btns-ctn'>
                <div
                  onClick={this.handleCreateTicketBtn}
                  className='create-new-tik-btn'>Create Ticket
                </div>
                <div
                  onClick={this.handleArchivedDisplay}
                  className={this.state.archivedTicketsShowing ? 'open-tik-btn' : 'arch-tik-btn'}>
                </div>
              </div>
            </div>
          </div>
        </div>

        { this.state.creatingTicket ?
          <div className='form-outter-ctn' onClick={this.handleCreateTicketBtn}>
            <CreateTicketForm
              createTicket={this.state.creatingTicket}
              user={this.props.user}
          /></div> : null }

      </>
     )

  }
}

export default TenantDash;
