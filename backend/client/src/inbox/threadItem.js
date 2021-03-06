import React from 'react';
import axios from 'axios';
import MessageList from './messageList';
import {withRouter} from 'react-router-dom'
import '../styles/inbox/inbox.css'
import { Link } from 'react-router-dom';


class ThreadItem extends React.Component {
  constructor(){
    super();
    this.state = {
      messages: [],
      body: '',
      title: ''
    }
  }

  refresh = () => {
    axios.get(`/threads/${this.props.match.params.id}/messages`)
    .then(res => {
      this.setState({messages: res.data.data})
    })
  }

  componentDidMount(){
    this.refresh()
    console.log(this.props)
  }

  sendMessage = (e) => {
    e.preventDefault()
    const owner_id = this.props.user.userid
    console.log('props:', this.props)
    const threads_id = this.props.match.params.id
    // const message_date = new Date()
    axios.post(`/messages/newmessage`, {
      owner_id, 
      threads_id,
      body: this.state.body
    })
    .then(() => {
      this.setState({body: ''}) //resets it back to empty string
    })
    .then(() => this.refresh())
  }

  showMessages = () => {
    this.setState({showMessages: !this.state.showMessages})
  }

  handleChange = (e) => {
    this.setState({body: e.target.value})
  }
  

  render() {
    console.log('$$props', this.props)
    return (
      <div className="threadMsgContainer">
        <div>
          {this.state.title}
        </div>
        <div className="msgContainer">
          <div>
            <Link className="msg-back-link" to={`/inbox`}>Back</Link>
          </div>
          {this.state.messages.length !== 0 ? <div className="msgList">
            <MessageList messages={this.state.messages} sendMessage={this.sendMessage} />
          </div> : <h2>Send the first message!</h2>}
          <div>
            <form onSubmit={this.sendMessage}> 
              <input className="msgInput"onChange={this.handleChange} value={this.state.body} type="text" placeholder="Type your message here" /> 
              <input className="msgInput" type="submit" Send />
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(ThreadItem);