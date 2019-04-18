import React from 'react';
import axios from 'axios';
import ThreadList from './threadList';
import '../styles/inbox/threads.css'

class Thread extends React.Component {
  constructor() {
    super();
    this.state = {
      threads: [],
      title_input: ''
    }
  }

  componentDidMount() {
    let landlord_id = this.props.landlord_id
    let tenant_id = this.props.tenant_id
    axios.get(`/threads/${landlord_id}/${tenant_id}`).then(res => {
      this.setState({threads: res.data.threads})
    })
  }

  handleChange = (e) => {
    this.setState({title_input: e.target.value})
  }

  render(){
    console.log(this.state)
    return(
      <React.Fragment>
        <div>
          <form>
            <label>
              <input type="text" onChange={this.handleChange} value={this.state.title_input} placeholder={"Subject"}/>
            </label>
            <input type="submit" value="submit" />
          </form>
          <ThreadList threads={this.state.threads} />
        </div>
      </React.Fragment>
    )
  }
}

export default Thread; 