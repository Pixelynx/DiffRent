import React, { Component } from 'react';
import { ApartmentForm } from './apartmentForm';
import '../styles/dashboards/addApartments.css'

class ApartmentDetails extends Component {

    render() {
    const { apt, user, updateApt, modal, handleModal } = this.props;

        return(
            <>
            {modal ? null : 
            <div className='modalClosed' onClick={handleModal}>
                <p>{apt.name}</p>
                <p>{apt.apt} {apt.address}</p>
            </div>}
            {modal ? <ApartmentForm apt={apt} user={user} updateApt={updateApt} modal={modal} handleModal={handleModal} /> 
            : null }
            </>
        )
    }
} 

export default ApartmentDetails;

