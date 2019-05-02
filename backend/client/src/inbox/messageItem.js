import React from 'react';
import moment from 'moment';


class MessageItem extends React.Component {
  constructor(){
    super()
    this.state = {

    }
  }


  render(){

    const {message, justify} = this.props // const thread = this.props.thread (same thing written differently)
    const backgroundColor = justify[message.name] === 'flex-start' ? 'rgba(100,55,185,0.77)' : 'rgba(114,177,202,1)' 
    // console.log('message',message)
    const styles = {
      alignSelf: `${justify[message.name]}`,
      backgroundColor 
    }
    return(
      <React.Fragment>
        <div className="msgContainer" >
          <span className="msgBody" style={styles}>{message.body}</span>
          <span className="msgName" style={{alignSelf: `${justify[message.name]}`}}>{message.name}</span>
          <span className="msgDate" style={{alignSelf: `${justify[message.name]}`}}> {moment(message.message_date).format(`MMMM Do YYYY, h:mm:ss a`)}</span>
        </div>
      </React.Fragment>
    )
  }
}

export default MessageItem;
