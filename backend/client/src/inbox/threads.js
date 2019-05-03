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
        threads: [...this.state.threads, newThread], 
        title_input: ''
      })
    })
  }

  render() {
    return(
      <React.Fragment>
        <div className="inboxContainer">
          <div>
          <h1>Say Hello :)</h1>
          <p>Create a thread and send a message to each other!</p>
            <form onSubmit={this.handleSubmit}>
              <div className="threadInputContainer">
                <input className="threadInput" type="text" onChange={this.handleChange} value={this.state.title_input} placeholder="Subject"/>
                <input type="submit" value="send" />
              </div>
            </form>
          </div>
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