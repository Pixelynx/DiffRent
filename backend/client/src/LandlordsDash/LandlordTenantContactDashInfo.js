import React from 'react';


const TenantContactInfo = (props) => {
  // let visibility = {props.tenantInfoIsShowing ? 'show' : 'hide'}

  return(
    <>
    <div className='tenant-contacts'>
      <h2>Apartments</h2>
      <button onClick={props.onClick}>{props.tenantInfo.address}</button>
    </div>
    <div  id='tenant-info-modal-container'>
      <div className='tenant-info'>
        <p>Name: {props.tenantInfo.name}</p>
        <p>Address: {props.tenantInfo.address}</p>
        <p>Apt #: {props.tenantInfo.apartment_id}</p>
        <p>Phone: {props.tenantInfo.phone}</p>
        <p>Email: {props.tenantInfo.email}</p>
      </div>
    </div>
    </>
  )
}

export default TenantContactInfo;
