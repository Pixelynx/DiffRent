import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../styles/dashboards/searchApartments.css';
import ApartmentDetails from './apartmentDetails'

class searchApartment extends Component {
    state = {
        availableApts: []
    }

    componentDidMount(){
        this.getApartments();
    }

    getApartments = () => {
        axios.get('/apartments/available')
        .then((res) => {
            this.setState({
                availableApts: res.data.data
            })
        })
    }

    updateApt = (e) => {
        e.preventDefault();
        let aptid = e.target.aptid.value;
        let apt = e.target.apt.value;
        let address = e.target.address.value;
        let landlord_id = e.target.landlord_id.value;
        let tenant_id = e.target.tenant_id.value;
        axios.put(`/apartments/${aptid}`, {
            apt, address, landlord_id, tenant_id
        })
        .then(() => {
            return window.location.reload()           
        })
    }

    generateForm = () => {
        const { user } = this.props;
        if(!this.state.availableApts){return 'Loading...'}
        let apartmentList = this.state.availableApts.map((apt) => {
            return (
                <>
                    <ApartmentDetails user={user} apt={apt} updateApt={this.updateApt} /> 
                </>
            )
        })
        return (
            <div className='searchApt-container'>
                <div className='apartment-list'>
                <h3>Search for apartment!</h3>
                    {apartmentList}
                </div>
            </div>
        )
    }

    render() {
        return (
            <>
            {this.generateForm()}
            </>
        )
    }
}

export default withRouter(searchApartment);