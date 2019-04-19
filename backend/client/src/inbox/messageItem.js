import React from 'react';

class MessageItem extends React.Component {
  constructor(){
    super()
    this.state = {
     
    }
  }


  render(){
    const {message} = this.props // const thread = this.props.thread (same thing written differently)
    return(
      <React.Fragment>
        <div style={{padding: 4, border:'1px darkgrey solid'}}>
          <p><span>{message.message_date}</span>-{message.owner_id}</p> 
          <p>{message.body}</p>
        </div>
      </React.Fragment>
    )
  }
}

export default MessageItem; 