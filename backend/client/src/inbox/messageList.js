import React from 'react';
import MessageItem from './messageItem';

const MessageList = (props) => {
  const messagesMap = props.messages.map(message => {
    return(
      <MessageItem message={message} key={message.id}/>
    )
  })
  
  return(
    <>
      <div style={{padding: 5, border:'1px red solid'}}>{messagesMap}</div>
    </>
  )
}

export default MessageList;