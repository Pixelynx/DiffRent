import React from 'react';
import axios from 'axios';
import ThreadList from './threadList';
import '../styles/inbox/inbox.css'

class Threads extends React.Component {
  constructor() {
    super();
    this.state = {
      threads: [],
      title_input: ''
    }
  }

  // let landlord_id = this.props.landlord_id; props from app.js passing to threads 

  componentDidMount() {
    let landlord_id = this.props.user.landlord_id
    let tenant_id = this.props.user.tenant_id
    console.log('inbox componentDidMount', landlord_id,tenant_id)
    axios.get(`/threads/${landlord_id}/${tenant_id}`).then(res => {
      this.setState({threads: res.data.threads})
    })
  }

  handleChange = (e) => {
    this.setState({title_input: e.target.value})
  }

  // pass in two arguments: route and object
  // look at axios.post 

  handleSubmit = (e) => {
    e.preventDefault()
    axios.post(`/threads/newthread`, {
      title: this.state.title_input,
      landlord_id: this.props.user.landlord_id,
      tenant_id: this.props.user.tenant_id
    })
    .then(res => {
      let newThread = res.data.thread
      this.setState({
        threads: [newThread, ...this.state.threads], 
        title_input: ''
      })
    })
  }

  render() {
    return(
      <React.Fragment>
        <div className="inboxContainer">
          <section className="threadContainer">
            <div className="thread-header-text">
            <h1 className="threadHeader" style={{color: 'black'}}>Add Thread</h1>
              <form onSubmit={this.handleSubmit}>
                <div className="threadInputContainer">
                  <input className="threadInput" type="text" onChange={this.handleChange} value={this.state.title_input} placeholder="Subject"/>
                  <input type="submit" value="create" />
                </div>
              </form>
            </div>
            {/* <div className="threadListContainer">
            <ThreadList  
              threads={this.state.threads} 
              user={this.props.user}
            />
            </div> */}
          </section>
          
        </div>
        <div className="threadListContainer" >
          <ThreadList  
            threads={this.state.threads} 
            user={this.props.user}
          />
        </div>
      </React.Fragment>
    )
  }
}

export default Threads; 