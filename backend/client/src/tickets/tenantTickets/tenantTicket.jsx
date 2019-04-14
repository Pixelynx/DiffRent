import React, { Component } from 'react';

class TenantTicket extends Component {
  constructor() {
    super()
  }


  render() {
    const { displayUnresolvedTickets } = this.props
    return(
      <>
      <div className='tickets-container'>
        <div className='tickets-window'>
          {displayUnresolvedTickets}
        </div>
      </div>
      </>
    )
  }
}

export default TenantTicket;
