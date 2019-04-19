import React from 'react';
import MessageList from './messageList';
import axios from 'axios';

class ThreadItem extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      showMessages: false
    }
  }

  componentDidMount(){
    axios.get(`/threads/${this.props.thread.id}/messages`)
    .then(res => {
      this.setState({messages: res.data.data})
    })
  }

  sendMessage = (body) => {
    const owner_id = 11
    const threads_id = this.props.thread.id
    const message_date = new Date()
    axios.post(`/messages/newmessage`, {
      owner_id, 
      threads_id,
      message_date,
      body
    })
    .then(res => {
      this.setState({messages: [...this.state.messages, res.data.newMessage]})
    })
  }

  showMessages = () => {
    this.setState({showMessages: !this.state.showMessages})
  }

  render(){
    const {thread} = this.props // const thread = this.props.thread (same thing written differently)
    return(
      <React.Fragment>
        <div><button onClick={this.showMessages}>{thread.title}</button></div>
        <div>
          {this.state.showMessages && <MessageList messages={this.state.messages} sendMessage={this.sendMessage}/>}
        </div>
    </React.Fragment>
    )
  }
}

export default ThreadItem; 