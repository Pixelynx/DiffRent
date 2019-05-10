import React, { Component } from 'react';
import HomepageContent from './HomepageContent';

class Homepage extends Component {

    handleScroll01 = () => {
        document.getElementById('section01').scrollIntoView({behavior: "smooth"}) 
    }

    handleScroll02 = () => {
        document.getElementById('section02').scrollIntoView({behavior: "smooth"}) 
    }

    handleScroll03 = () => {
        document.getElementById('section03').scrollIntoView({behavior: "smooth"}) 
    }

    handleScroll04 = () => {
        document.getElementById('section04').scrollIntoView({behavior: "smooth"}) 
    }

    render() {
        return(

            <>
                <HomepageContent
                handleScroll01={this.handleScroll01}
                handleScroll02={this.handleScroll02}
                handleScroll03={this.handleScroll03}
                handleScroll04={this.handleScroll04}
                 />
            </>

        )
    }
}

export default Homepage;