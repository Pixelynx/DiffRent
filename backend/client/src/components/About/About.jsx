import React, { Component } from 'react';
import '../../styles/about/about.css'

class About extends Component {
    state = {
        hover: false
    }

    handleHover = () => {
        this.setState({
            hover: !this.state.hover
        })
    }


    render() {
        return (
            <div className='outerAbout'>
                <div className='cardGrid'>
                    
                    <div className='cardOne'>
                        <h2>one</h2>
                    </div>

                    <div className='cardTwo'>
                        <h2>two</h2>
                    </div>

                    <div className='cardThree'>
                        <h2>three</h2>
                    </div>

                    <div className='cardFour'>
                        <h2>four</h2>
                    </div>

                </div>
            </div>
        )
    }
}

export default About;