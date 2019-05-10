import React from 'react';


const LandlordContactInfo = (props) => {
  console.log("propsAddress: ", props.landlordInfo.address)
  return(
    <div className='landlord-contact-info'>
      <h2>Your Landlord's Information</h2>
      <p>Name: {props.landlordInfo.name}</p>
      <p>Phone: {props.landlordInfo.phone}</p>
      <p>Email: {props.landlordInfo.email}</p>
    </div>
  )
}

export default LandlordContactInfo;
