import React, { Component } from 'react';
import '../styles/profiles/profiles.css';
import {Redirect} from 'react-router-dom'
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
          user_type: ""
        },
        newVals: {
          name: '',
          phone: '',
          email: '',
          password: ''
        },
      formSubmitted: false
    }
  }

  componentWillMount(){
    this.getLandlordInfo()
  }

  getLandlordInfo = () => {
    axios.get(`/users/${this.props.user.email}`)
      .then(response => {
        debugger;
        console.log("response", response)
        this.setState({ defaultVals : {
          id: response.data.data.userId,
          name: response.data.data.name,
          dob: response.data.data.dob,
          phone: response.data.data.phone,
          email: response.data.data.email,
          password: response.data.data.password_digest,
          apt_Id: response.data.data.apartmentId,
          user_type: response.data.data.user_type
        }
      })

    })
    .catch(err => console.log('GET LANDLORD FAILED', err))
  }

  handleChange = event => {
  const value = event.target.value;
  this.setState({
    newVals:{...this.state.newVals,
    [event.target.name] : event.target.value,
  },
    formSubmitted: true
  })
};

handleSubmit = event => {
  const {defaultVals, newVals} = this.state;
  event.preventDefault();
  let putRequestInfo = {
    id: defaultVals.id,
    name: newVals.name,
    dob: newVals.dob,
    email: newVals.email,
    phone: newVals.phone,
    password_digest: newVals.password,
    apt_Id: defaultVals.apt_Id,
    user_type: defaultVals.Id
  };
  if(!newVals.apt_id){
    putRequestInfo.apt_Id = defaultVals.apt_id
  }
  if(!newVals.name){
    putRequestInfo.name = defaultVals.name
  }
  if(!newVals.dob){
    putRequestInfo.dob = defaultVals.dob
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
  if(!newVals.user_type) {
    putRequestInfo.user_type = defaultVals.user_type
  }

  axios.put(`/users/${this.props.user.userid}`, putRequestInfo)
  .then(console.log("the puts", putRequestInfo))
    .then(() => console.log('This updated'))
  .catch(err => console.log('GET LANDLORD FAILED', err))
}

  render(){
    return(
      <>
        <h2 className='titile'>Edit Your Profile</h2>

          <form onSubmit={this.handleSubmit}>
            <div className='profile-form'>
            Name: <input type='text' className='name-input' onChange={this.handleChange} name='name' defaultValue={this.state.defaultVals.name}/>
          <hr/>
            Email Address: <input type='email' className='email-input' onChange={this.handleChange} name='email' defaultValue={this.state.defaultVals.email} />
          <hr/>
            Phone Number: <input type='text' className='phone-input' onChange={this.handleChange} name='phone' defaultValue={this.state.defaultVals.phone} />
          <hr/>
            New Password: <input type='password' onChange={this.handleChange} name='password' placeholder='' value='' />
          <hr/>
            <input type='submit' className='submit-btn' value="Submit Changes"/>
        </div>
        </form>

          {/*<button><Redirect to='/landlord/:id' /></button>*/}


      </>
    )
  }
}

export default Profile;
