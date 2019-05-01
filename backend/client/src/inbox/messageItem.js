import React from 'react';
import moment from 'moment'


class MessageItem extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }


  render(){

    const {message} = this.props // const thread = this.props.thread (same thing written differently)
    console.log('message',message)
    return(
      <React.Fragment>
        <div>
          <p>{message.name}-
          {moment(message.message_date).format(`MMMM Do YYYY, h:mm:ss a`)}</p>
          <p>{message.body}</p>
        </div>
      </React.Fragment>
    )
  }
}

export default MessageItem;
