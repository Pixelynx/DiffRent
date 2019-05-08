import React from 'react';
import '../styles/dashboards/searchApartments.css'

export const ApartmentForm = (props) => {
    const { apt, user, updateApt, modal, handleModal } = props;

    return(
        <>
        <div className='modalFieldOut' onClick={handleModal}></div>
            <div className='modalContainer'>
                <div className='modalInnerField'>
                    <div className='modalButton' onClick={handleModal}>X</div>
                    <div className='modalAptInfo'>
                        <p>{apt.name}</p>
                        <p>{apt.apt} {apt.address}</p>
                        <p>{apt.email}</p>
                        <p>{apt.phone}</p>
                    
                        <div className='selectAptForm'>
                            <form onSubmit={updateApt}>
                                <input
                                name='aptid'
                                type='hidden'
                                readOnly={true}
                                value={apt.aptid} />
                                <input
                                name='apt'
                                type='hidden'
                                readOnly={true}
                                value={apt.apt} />
                                <input
                                name='address'
                                type='hidden'
                                readOnly={true}
                                value={apt.address} />
                                <input
                                name='landlord_id'
                                type='hidden'
                                readOnly={true}
                                value={apt.landlord_id} />
                                <input
                                name='tenant_id'
                                type='hidden'
                                readOnly={true}
                                value={user.userid} />
                                <input type='submit' value='Select Apartment' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}