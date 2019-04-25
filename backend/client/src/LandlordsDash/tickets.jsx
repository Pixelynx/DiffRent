import React, { Component } from 'react';

class Tickets extends Component {
  state = {
    hover: false
  }

  renderLandlordTiks = () => {
    if(this.props.tickets) {
      return this.props.tickets.map(ticket => {
        if(!this.state.hover) {
        return(
          <>
            <div
              onMouseEnter={this.mouseEnter}
              className='landlord-tik-front'
              >
              <p>{ticket.subject}</p>
            </div>
            </>
        )
          } else {
            return(
              <>
            <div
              onMouseLeave={this.mouseLeave}
              className='landlord-tik-back'
              >
              <p>{ticket.subject}</p>
              <p>{ticket.body}</p>
            </div>
          </>
      )
      }
      })
    }
  }

  mouseEnter = () => {
    this.setState(prevState => ({ hover: !prevState.hover }))
  }

  mouseLeave = () => {
    this.setState(prevState => ({ hover: !prevState.hover }))
  }


  render() {
    console.log(this.state, 'LANDLORD TIKS STATE')
    if(this.props.tenantTiksShow) {

      return(
        <>
         <div
           className={this.props.tenantTiksShow ? 'show-landlord-tiks-container' : 'hide-landlord-tiks-container'}
           onClick={this.props.toggleModal}>
          <div className='landlord-tiks-window'>
            {this.renderLandlordTiks()}
          </div>
         </div>
        </>
      )
    }
    return null
  }
}

export default Tickets;
