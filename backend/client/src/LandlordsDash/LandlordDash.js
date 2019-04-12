import React, { Component } from 'react'

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

  render(){
    return(
      <>
        LandDarsh
      </>
    )
  }
}

export default LandlordDash
