import React from 'react';


const TenantContactInfo = (props) => {

if(props.selectedApt) {
  let selectedTenant = props.tenantInfo.find(tenant => {
    return String(tenant.apartment_id) === props.selectedApt
  });

    return(
      <>

      <div
      className={props.tenantModalShowing ? 'show-modal' : 'hide-modal'}
      onClick={props.modalShowing}>
      <button onClick={props.closeModal} className='close-modal-btn'>x</button>
        <div className='tenant-info'>
          <p>Name: {selectedTenant.name}</p>
          <p>Address: {selectedTenant.address}</p>
          <p>Apt #: {selectedTenant.apartment_id}</p>
          <p>Phone: {selectedTenant.phone}</p>
          <p>Email: {selectedTenant.email}</p>
        </div>
      </div>
      </>
  )
} return null



}

export default TenantContactInfo;
