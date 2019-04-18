import React from 'react';
import axios from 'axios';

class Thread extends React.Component {
  constructor() {
    super();
    this.state = {
      threads: [] 
    }
  }

  componentDidMount() {
    let landlord_id = this.props.landlord_id
    let tenant_id = this.props.tenant_id
    axios.get(`/threads/${landlord_id}/${tenant_id}`).then(res => {
      console.log(res)
    })
  }
  render(){
    return(
      <div>
        <p>hi</p>
      </div>
    )
  }
}

export default Thread; 