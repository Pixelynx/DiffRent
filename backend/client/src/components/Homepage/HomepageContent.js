import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '../../styles/homepage/homepage.css'
import { SectionOne } from './Sections/SectionOne';
import { SectionFour } from './Sections/SectionFour';
import { SectionTwo } from './Sections/SectionsTwo';
import { SectionThree } from './Sections/SectionThree';

class HomepageContent extends Component{

    tenantLogin = () => {
        this.props.history.push("/tenants/login")
    }
    landlordLogin = () => {
        this.props.history.push("/landlords/login")
    }

    render() {
        const { handleScroll01, handleScroll02, handleScroll03, handleScroll04 } = this.props; 
        return(
            <div className='container'>

                {/* section one */}
                <section id='section01'>
                    <SectionOne 
                    tenantLogin={this.tenantLogin}
                    handleScroll02={handleScroll02} 
                    handleScroll03={handleScroll03} 
                    handleScroll04={handleScroll04} 
                    landlordLogin={this.landlordLogin} />
                    
                    <span onClick={handleScroll02}></span>
                    <span onClick={handleScroll02}></span>
                    <span onClick={handleScroll02}></span>

                </section>

                {/* section two */}
                <section id='section02'>

                    <SectionTwo />

                    <span onClick={handleScroll03}></span>
                    <span onClick={handleScroll03}></span>
                    <span onClick={handleScroll03}></span>

                </section>

                {/* section three */}
                <section id='section03'>

                    <SectionThree />

                    <span onClick={handleScroll04}></span>
                    <span onClick={handleScroll04}></span>
                    <span onClick={handleScroll04}></span>

                </section>

                {/* section four */}
                <section id='section04'>

                    <SectionFour />

                    <span onClick={handleScroll01}></span>
                    <span onClick={handleScroll01}></span>
                    <span onClick={handleScroll01}></span>
                </section>

            </div>
        )
    }
}

export default withRouter(HomepageContent);