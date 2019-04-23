import React from 'react';
import ThreadItem from './threadItem';
import { Link, Route } from 'react-router-dom';


const ThreadList = (props) => {
  const threadsMap = props.threads.map(thread => {
    return(
      <div key={thread.id} style={{color:'black'}}>
        <Link to={`/inbox/threads/${thread.id}`}>{thread.title}</Link>
      </div>
    )
  })
  return(
    <>
      <div>{threadsMap}</div>
    </>
  )
}

export default ThreadList;