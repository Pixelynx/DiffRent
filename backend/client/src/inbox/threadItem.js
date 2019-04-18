import React from 'react';

const ThreadItem = (props) => {
  let thread = props.thread
  return(
    <React.Fragment>
      <div>{thread.title}</div>
    </React.Fragment>
  )
}

export default ThreadItem; 