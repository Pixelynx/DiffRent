import React from 'react';


const TenantContactInfo = (props) => {


  return(
    <>

    <div className={props.isShowing ? 'show-modal' : 'hide-modal'}>
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
