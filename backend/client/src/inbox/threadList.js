import React from 'react';
import { Link } from 'react-router-dom';

const ThreadList = (props) => {
  const threadsMap = props.threads.map(thread => {
    return(
      <div className="threadList" key={thread.id} style={{color:'black'}}>
      <hr/>
        <p><Link to={`/inbox/threads/${thread.id}`}>{thread.title}</Link></p>
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
