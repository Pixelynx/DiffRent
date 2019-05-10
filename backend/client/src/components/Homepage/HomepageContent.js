import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import '../../styles/homepage/homepage.css'
import { SectionOne } from './Sections/SectionOne';
import { SectionFour } from './Sections/SectionFour';

class HomepageContent extends Component{

    render() {
        const { handleScroll01, handleScroll02, handleScroll03, handleScroll04 } = this.props; 
        return(
            <div className='container'>

                {/* section one */}
                <section id='section01'>
                    <SectionOne />
                    <span onClick={handleScroll02}></span>
                    <span onClick={handleScroll02}></span>
                    <span onClick={handleScroll02}></span>

                </section>

                {/* section two */}
                <section id='section02'>

                    <span onClick={handleScroll03}></span>
                    <span onClick={handleScroll03}></span>
                    <span onClick={handleScroll03}></span>

                </section>

                {/* section three */}
                <section id='section03'>

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