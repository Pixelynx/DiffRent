import React from 'react';
// import ThreadItem from './threadItem';
import { Link } from 'react-router-dom';


const ThreadList = (props) => {
  const threadsMap = props.threads.map(thread => {
    return(
      <div>
        <Link to={`/inbox/threads/${thread.id}`} key={thread.id}>{thread.title}</Link>
      </div>
    )
  })
  return(
    <div>{threadsMap}</div>
  )
}

export default ThreadList;