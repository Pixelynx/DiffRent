import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import '../styles/homepage.css'
import logo from "../logo/DiffRent_logo_official.png";
import home1 from "../assets/housesandbuildings.jpg";


class Homepage extends Component{
    handleTenant = () => {

    }
    render(){
      let styles = {
          width: '250px',
         height: '180px',
       };
       let bgImgStyle = {
         width: '100%',
         height: '100%',
         padding: "0px",
         margin: '0px',
         boder: '0px',
       }
        return(
            <>
                <img className='home1' src={home1} style={bgImgStyle} />
                <div className='container'>
                <div className='op'></div>
                <div className='homepageButtons'>
                <img className='logo_official' src={logo} style={styles} />
                  <a href='/tenants/login'><button className='tenantButton'>Tenant</button></a>
                  <a href='/landlords/login'><button className='landlordButton'>Landlord</button></a>
                </div>
                </div>
            </>
        )
    }
}

export default withRouter(Homepage);
