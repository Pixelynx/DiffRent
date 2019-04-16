import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class Homepage extends Component{
    handleTenant = () => {

    }
    render(){
        return(
            <>
                <h1>DiffRent</h1>
                <a href='/tenants/login'><button>Tenant</button></a>
                <a href='/landlords/login'><button>Landlord</button></a>
            </>
        )
    }
}

export default withRouter(Homepage);