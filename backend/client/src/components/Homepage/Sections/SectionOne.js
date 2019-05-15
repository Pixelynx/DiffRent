import React from 'react'
import {Link} from 'react-router-dom'
import '../../../styles/homepage/section1.css'
import logo from "../../../logo/DiffRent_logo_official.png";

export const SectionOne = (props) => {
    return(
        <div className='section1'>

            <img alt='' src={logo} className='logo' /> 

            <div className='loginButtons'>

                <button className='tenantButton' onClick={props.tenantLogin}>Tenant</button>
                <button className='landlordButton' onClick={props.landlordLogin}>Landlord</button>

            </div>

            <div className='links'>

                <div className='name' onClick={props.handleScroll02}>DiffRent</div>
                <div className='features' onClick={props.handleScroll03}>Features</div>
                <div className='team' onClick={props.handleScroll04}>The Team</div>

            </div>
        </div>
    )
}