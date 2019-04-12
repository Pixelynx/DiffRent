import React, { Component } from 'react';

class TenantTicket extends Component {
  constructor(props) {
    super(props)
  }

  modal = () => {
    if(this.props.ticketModalOpen) {
      return <div>oof</div>
    } else {
      return <div>big oof</div>
    }
  }

  render() {
    return(
      <div>ticket modal</div>
    )
  }
}

export default TenantTicket;
