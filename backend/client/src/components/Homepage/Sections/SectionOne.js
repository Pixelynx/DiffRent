import React from 'react'
import {Link} from 'react-router-dom'
import '../../../styles/homepage/section1.css'
import logo from "../../../logo/DiffRent_logo_official.png";

export const SectionOne = () => {
    return(
        <div className='section1'>

            <img alt='' src={logo} alt='' className='logo' /> 

            <div className='loginButtons'>

                <Link to='/tenants/login'><button className='tenantButton'>Tenant</button></Link>
                <Link to='/landlords/login'><button className='landlordButton'>Landlord</button></Link>

            </div>
        </div>
    )
}