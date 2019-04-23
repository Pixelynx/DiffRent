import React, { Component } from 'react';
import axios from 'axios'

class Profile extends Component {
  constructor(props){
    super(props);
    this.state = {
      defaultVals: {
          id: null,
          name: '',
          dob: '',
          phone: '',
          email: '',
          password: '',
          apt_Id: null,
          user_type: 'landlord'
        },
        newVals: {
          name: '',
          phone: '',
          email: '',
          password: ''
        }
    }
  }

  componentWillMount(){
    this.getLandlordInfo()
  }

  getLandlordInfo = () => {
    axios.get(`/users/${this.props.match.params.id}`)
      .then(response => {
        debugger;
        console.log("response is: ",response)
        this.setState({ defaultVals : {
          id: response.data.data.id,
          name: response.data.data.name,
          dob: response.data.data.dob,
          phone: response.data.data.phone,
          email: response.data.data.email,
          password: response.data.data.password_digest,
          apt_Id: response.data.data.apartmentId
        }
      })
    })
    .catch(err => console.log('GET LANDLORD FAILED', err))
  }

  handleChange = event => {
  const value = event.target.value;
  this.setState({
    newVals:{
    [event.target.name] : event.target.value,

    }
  })
};

handleSubmit = event => {
  const {defaultVals, newVals} = this.state;
  event.preventDefault();
  let putRequestInfo = {
    id: defaultVals.id,
    name: newVals.name,
    email: newVals.email,
    phone: newVals.phone,
    password_digest: newVals.passport,
    apt_Id: defaultVals.apt_Id
  };
  if(!newVals.name){
    putRequestInfo.name = defaultVals.name
  }
  if(!newVals.email){
    putRequestInfo.email = defaultVals.email
  }
  if(!newVals.phone){
    putRequestInfo.phone = defaultVals.phone
  }
  if(!newVals.password){
    putRequestInfo.password_digest = defaultVals.password
  }

  axios.put(`/landlords/2`, putRequestInfo)
    .then(() => console.log('This updated'))
  .catch(err => console.log('GET LANDLORD FAILED', err))
}

  render(){
    return(
      <>
        <form onSubmit={this.handleSubmit}>
          <input type='text' onChange={this.handleChange} name='name' defaultValue={this.state.defaultVals.name}/>
          <input type='email' onChange={this.handleChange} name='email' defaultValue={this.state.defaultVals.email} />
          <input type='text' onChange={this.handleChange} name='phone' defaultValue={this.state.defaultVals.phone} />
          {/*<input type='password' onChange={this.handleChange} name='password' defaultValue={this.state.defaultVals.password} />*/}
          <input type='submit' value="Submit Changes"/>
        </form>

      </>
    )
  }
}

export default Profile;
