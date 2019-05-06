import React from 'react';


export const ApartmentInfo = (props) => {

if(props.tenant) return null;

    return(
      <>

      <div
      className={props.tenantModalShowing ? 'show-modal' : 'hide-modal'}
      onClick={props.modalShowing}>
      <button onClick={props.closeModal} className='close-modal-btn'>x</button>
        <div className='tenant-info'>
          <p className='tenants-contact-aptNum'>Apt #: {props.tenant.apt}</p>
          <p className='tenants-contact-address'>Address: {props.tenant.address}</p>
          <p className='tenants-contact-email'>Unnocupied</p>
        </div>
      </div>
      </>
  )
}