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
          <p><span>
          
          {moment().format(`MMMM Do YYYY, ${message.message_date}`)}
         </span>-{message.owner_id}</p> 
          <p>{message.body}</p>
        </div>
      </React.Fragment>
    )
  }
}

export default MessageItem; 