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
            <p className='tenants-contact-name'>Name: {selectedTenant.name}</p>
            <p className='tenants-contact-address'>Address: {selectedTenant.address}</p>
            <p className='tenants-contact-aptNum'>Apt #: {selectedTenant.apartment_id}</p>
            <p className='tenants-contact-phone'>Phone: {selectedTenant.phone}</p>
            <p className='tenants-contact-email'>Email: {selectedTenant.email}</p>
          </div>
        </div>
      </>
  )
} return null



}

export default TenantContactInfo;
