import React, { Component } from 'react'
import axios from 'axios';
import Auth from "../utils/Auth";

class AddApartment extends Component{
    state = {
        name: '',
        address: ''
    }

    componentDidMount() { 
        // this.props.getUserInformation(Auth.getToken())
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const { user } = this.props;
        const { getUserAptInfo, getUserInfo } = this.props;
        let apt = this.state.name;
        let address = this.state.address;
        let landlord_id = user.userid;
        debugger;
        axios.post('/apartments/', { apt, address, landlord_id })
        .then(() => {
            if (!user) {
              return getUserAptInfo(user.email);
            } 
          })
          .then(() => {
            if (!user) {
              return getUserInfo(user.email);
            }
          })
    }

    handleInputs = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        const { name, address } = this.state;
        return (
            <>
                <form onSubmit={this.handleSubmit}>
                    <input
                    autoFocus
                    type='text'
                    name='name'
                    value={name}
                    onChange={this.handleInputs} />
                    <input
                    type='text'
                    name='address'
                    value={address}
                    onChange={this.handleInputs} />
                    <input
                    type='submit' />
                </form>
            </>
        )
    }
}

export default AddApartment;