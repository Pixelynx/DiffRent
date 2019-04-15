import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Homepage extends Component{
    handleTenant = () => {

    }
    render(){
        return(
            <>
                <h1>DiffRent</h1>
                <a href='/tenant/login'><button>Tenant</button></a>
                <a href='/landlord/login'><button>Landlord</button></a>
            </>
        )
    }
}

export default withRouter(Homepage);