import React, { Component } from 'react';
import axios from 'axios'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultVals: {
          id: null,
          name: '',
          email: '',
          phone: '',
          password: '',
          apt_Id: null,
        },
        newVals: {
          name: '',
          email: '',
          phone: '',
          password: ''
        }
    }
  }

  componentWillMount(){
    this.getUserInfo()
  }

  getUserInfo = () => {
    axios.get(`/landlords/${this.props.match.params.id}`)
      .then(response => {
        console.log("response is: ",response)
        this.setState({ defaultVals : {
          id: response.data.landlord_id,
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone,
          password: response.data.password_digest,
          apt_Id: response.data.apartmentId
        }
      })
    })
  }

  handleChange = (event) => {
    event.target.name = event.target.value
    console.log(event.target.value)
  }
  render(){
    return(
      <>
        <input type='text' onChange={this.handleChange} name='name' defaultValue={this.state.newVals.name}/>
      </>
    )
  }
}

export default Profile;
