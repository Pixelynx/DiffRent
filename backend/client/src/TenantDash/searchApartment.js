import React, { Component } from 'react'
import axios from 'axios'
import '../styles/dashboards/searchApartments.css'

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

    updateApt = (aptid) => {
        axios.put(`/apartments/${aptid}`)
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
                </>
            )
        })
        return (
            <div className='searchApt-container'>
                <h3>Search for apartment!</h3>
                <div className='apartment-list'>
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

export default searchApartment;