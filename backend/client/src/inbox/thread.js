import React from 'react';
import MessageList from './messageList';
import axios from 'axios';

class Thread extends React.Component {
  constructor(){
    super()
    this.state = {
      messages: [],
      showMessages: false,
      messageBody: '',
      threadInfo: [],
    }
  }

  componentDidMount(){
    // axios.get(`/threads/${this.props.thread.id}/messages`)
    // .then(res => {
    //   this.setState({messages: res.data.data})
    // })
    console.log(this.props)
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
    console.log('threads prop', this.props)
    return(
      <React.Fragment>
        {/* <div><button onClick={this.showMessages}>{thread.title}</button></div>
        <div>
          {this.state.showMessages && <MessageList messages={this.state.messages} sendMessage={this.sendMessage}/>}
        </div>
        <div> 
          <input type="text" placeholder="type here" /> 
          <button onClick={this.sendMessage}>Send</button>
        </div> */}
        <h1>Hi I am Here</h1>
    </React.Fragment>
    )
  }
}

export default Thread; 