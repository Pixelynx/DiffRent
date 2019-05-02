import React from 'react';
import MessageItem from './messageItem';

const MessageList = (props) => {
  const justify = {}
  const messagesMap = props.messages.map((message, index) => {
    if(index < 1) justify[message.name] = 'flex-end' // can remove {}
    if(!justify[message.name]) justify[message.name] = 'flex-start'
    return(
      <MessageItem justify={justify} message={message} key={message.id}/>
    )
  })
  
  return(
    <>
      <div>{messagesMap}</div>
    </>
  )
}

export default MessageList;