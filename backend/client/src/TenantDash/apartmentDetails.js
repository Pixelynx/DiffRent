import React, { Component } from 'react';
import { ApartmentForm } from './apartmentForm';
import '../styles/dashboards/addApartments.css'

class ApartmentDetails extends Component {
    state = {
        modal: false
    }

    handleModal = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {
    const { apt, user, updateApt } = this.props;
    const { modal } = this.state;

        return(
            <>
            {modal ? null : 
            <div className='modalClosed' onClick={this.handleModal}>
                <p>{apt.name}</p>
                <p>{apt.apt} {apt.address}</p>
            </div>}
            {modal ? <ApartmentForm apt={apt} user={user} updateApt={updateApt} modal={modal} handleModal={this.handleModal} /> 
            : null }
            </>
        )
    }
} 

export default ApartmentDetails;

