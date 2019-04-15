import React from 'react';


const TenantLandlordContactDashInfo = (props) => {
  console.log("propsAddress: ", props.landlordInfo.address)
  return(
    <div className='tenant-contacts'>
      <h2>Your Landlord's Information</h2>
      <p>Apt #: {props.landlordInfo.apartment_id}</p>
      <p>Name: {props.landlordInfo.name}</p>
      <p>Phone: {props.landlordInfo.phone}</p>
      <p>Email: {props.landlordInfo.email}</p>
    </div>
  )
}

export default TenantLandlordContactDashInfo;
