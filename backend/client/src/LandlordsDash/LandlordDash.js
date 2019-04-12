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

  componentDidMount(){
    this.getAptsByLandlord()
  }

  getAptsByLandlord = () => {
    axios.get('/landlords/1/apartments')
    .then(res => {
      console.log('apt data: ', res.data.data)
    })
  }

  render(){
    return(
      <>

      </>
    )
  }
}

export default LandlordDash
