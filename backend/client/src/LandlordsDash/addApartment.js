import React, { Component } from 'react'
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom'
import Auth from "../utils/Auth";
import '../styles/dashboards/addApartments.css';

class AddApartment extends Component{
    state = {
        name: '',
        address: ''
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user } = this.props;
        const { getUserInformation } = this.props;
        let apt = this.state.name;
        let address = this.state.address;
        let landlord_id = user.userid;
        axios.post('/apartments/', { apt, address, landlord_id })
        .then(() => {
            return window.location.reload()
          })
    }

    handleInputs = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const { name, address } = this.state;
        return (
            <div className='addApt-container'>
            <div className='addApartmentForm'>
                <form onSubmit={this.handleSubmit}>
                    <label>Apartment Name</label>
                    <input
                    autoFocus
                    required
                    type='text'
                    name='name'
                    value={name}
                    placeholder='2A'
                    onChange={this.handleInputs} />
                    <label>Address</label>
                    <input
                    type='text'
                    required
                    name='address'
                    value={address}
                    placeholder='47-10 Austell Pl. Long Island City, NY'
                    onChange={this.handleInputs} />
                    <input
                    type='submit' />
                </form>
            </div>
            </div>
        )
    }
}

export default withRouter(AddApartment);