import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import logo from "../logo/DiffRent_logo_official.png";


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
         height: '504px',
         padding: "0px",
         margin: '0px',
         boder: '0px'
       }
        return(
            <>
                <img className='logo_official' src={logo} style={styles} />
                <h1>DiffRent</h1>
                <img src='https://webassets.inman.com/wp-content/uploads/2016/03/NY_Ss_Ryan-DeBerardinis_247248475-1984x880.jpg' style={bgImgStyle}/>
                <img src='https://images.fastcompany.net/image/upload/w_1280,f_auto,q_auto,fl_lossy/wp-cms/uploads/2017/07/p-1-meet-the-nyc-renter-who-built-a-business-exposing-bad-landlords-1.jpg' style={bgImgStyle} />
                <a href='/tenants/login'><button>Tenant</button></a>
                <a href='/landlords/login'><button>Landlord</button></a>
            </>
        )
    }
}

export default withRouter(Homepage);
