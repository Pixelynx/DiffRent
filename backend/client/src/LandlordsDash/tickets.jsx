import React, { Component } from 'react';

class Tickets extends Component {
  state = {
    apts: {
      unresolvedTickets: []
    }
  }
  render() {
    return(
      <>
       <button>You have unresolved XXX tickets.</button>
      </>
    )
  }
}
