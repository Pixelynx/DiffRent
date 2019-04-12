import React, { Component } from 'react'
import axios from 'axios'

class LandlordDash extends Component {
  constructor(){
    super();
    this.state = {
      name: '',
      age:'',
      tenantNames: {
        name: '',
        apartmet: null
      },
      address: null,
      appointments: [],
      tickets: []
    }
  }

  getAptsByLandlord = () => {
    axios.get('/landlord/:id')
  }

  render(){
    return(
      <>

      </>
    )
  }
}

export default LandlordDash
