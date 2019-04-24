import React from 'react';

export const Tickets = (props) => {

  let renderLandlordTiks = () => {
    if(props.tickets) {
      return props.tickets.map(ticket => {
        return(
          <>
            <div className='landlord-tik-front'>
              <p>{ ticket.subject }</p>
              <p>{ ticket.body }</p>
            </div>
          </>
        )
      })
    }
  }

  if(props.tenantTiksShow) {

    return(
      <>
       <div
         className={props.tenantTiksShow ? 'show-landlord-tiks-container' : 'hide-landlord-tiks-container'}
         onClick={props.toggleModal}>
        <div className='landlord-tiks-window'>
          {renderLandlordTiks()}
        </div>
       </div>
      </>
    )
  }
  return null
}
