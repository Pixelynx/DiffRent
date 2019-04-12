import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import axios from 'axios';
import LandlordDash from './LandlordsDash/LandlordDash.js'

class App extends Component {
  render() {
    return (
      <div className="App">
        <>
          <h3>Team 3!</h3>
          <Switch>
            <Route exact path='/landlord' component={LandlordDash} />
          </Switch>
        </>
      </div>
    );
  }
}

export default App;
