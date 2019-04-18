import React from 'react';
import axios from 'axios';
import ThreadList from './threadList';

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
      this.setState({threads: res.data.threads})
    })
  }
  render(){
    let threads = this.props.threads
    console.log(this.props)
    return(
      <React.Fragment>
        <div>
          <ThreadList threads={this.state.threads} />
        </div>
      </React.Fragment>
    )
  }
}

export default Thread; 