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
      <div>{messagesMap}</div>
    </>
  )
}

export default MessageList;