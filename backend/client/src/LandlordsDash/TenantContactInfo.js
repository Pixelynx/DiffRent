import React from 'react';


const TenantContactInfo = (props) => {
  console.log("propsAddress: ", props.tenantInfo.address)
  return(
    <div className='tenant-contacts'>
      <h2>Apartment Information</h2>
      <p>Address: {props.tenantInfo.address}</p>
      <p>Apt #:{props.tenantInfo.apartment_id}</p>
      <p>Name: {props.tenantInfo.name}</p>
      <p>Phone: {props.tenantInfo.phone}</p>
      <p>Email: {props.tenantInfo.email}</p>
    </div>
  )
}

export default TenantContactInfo;
