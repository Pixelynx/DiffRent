import React, { Component } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import '../styles/dashboards/searchApartments.css';

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
        const { user, getUserInformation } = this.props;
        if(!this.state.availableApts){return 'Loading...'}
        let apartmentList = this.state.availableApts.map((apt) => {
            return (
                <>
                    <div>
                        <p>{apt.name}</p>
                        <p>{apt.apt} {apt.address}</p>
                        <p>{apt.email}</p>
                        <p>{apt.phone}</p>
                    </div>
                    <form onSubmit={this.updateApt}>
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
                        <input type='submit' />
                    </form>
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