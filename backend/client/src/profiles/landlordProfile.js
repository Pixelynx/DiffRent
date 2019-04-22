import React, { Component } from 'react';
import axios from 'axios'

class LandlordProfile extends Component {
  constructor(props){
    super(props);
    this.state({
      id: null,
      name: '',
      email: '',
      password: ''
      apt_Id: null,

    })
  }

  componentWillMount(){
    this.getUserInfo()
  }

  getUserInfo = () => {
    axios.get(`/landlords/${this.props.match.params.id}`)
      .then(response => {
        console.log(response)
        this.setState([
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          password: response.data.password_digest,
          
        ])
      })
  }
  render(){
    return(
      <>
        Profile
      </>
    )
  }
}

export default LandlordProfile;
