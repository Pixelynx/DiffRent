import React from 'react';

class Thread extends React.Component {
  constructor(){
    super()
    this.state = {
      title: ''
    }
  }

  render(){
    const {thread} = this.state // const thread = this.state.thread (same thing written differently)
    console.log('threads prop', this.props)
    return(
      <React.Fragment>
        

        <h1>Hi I am Here</h1>
    </React.Fragment>
    )
  }
}

export default Thread; 