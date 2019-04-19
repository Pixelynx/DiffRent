import React from 'react';
import ThreadItem from './threadItem';

const ThreadList = (props) => {
  const threadsMap = props.threads.map(thread => {
    return(
      <ThreadItem thread={thread} key={thread.id}/>
    )
  })
  return(
    <div>{threadsMap}</div>
  )
}

export default ThreadList;