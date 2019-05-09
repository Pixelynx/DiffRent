import React, { Component } from 'react';
import '../../styles/about/about.css'
import insta from '../../assets/logos/insta_logo.png';
import git from '../../assets/logos/github_logo.png';
import lnkd from '../../assets/logos/linkedin_logo.png';
import erick from '../../assets/profileImgs/erick.jpg';

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
                        <div className='imageContainer'>
                            <img className='profileImage' />
                        </div>
                        
                        <div>T'Keya Stevens</div>

                        <div>
                            <p>
                                <img src={insta} className='socialButton' />
                                <img src={git} className='socialButton' />
                                <img src={lnkd} className='socialButton' />
                            </p>
                        </div>
                    </div>

                    <div className='cardTwo'>
                        <div className='imageContainer'>
                            <img className='profileImage' />
                        </div>
                        
                        <div>Treagan Birbal</div>

                        <div>
                            <p>
                                <img src={insta} className='socialButton' />
                                <img src={git} className='socialButton' />
                                <img src={lnkd} className='socialButton' />
                            </p>
                        </div>
                    </div>

                    <div className='cardThree'>
                        <div className='imageContainer'>
                            <img src={erick} className='profileImage' />
                        </div>

                        <div>Erick Arellano</div>

                        <div>
                            <p>
                                <img src={insta} className='socialButton' />
                                <img src={git} className='socialButton' />
                                <img src={lnkd} className='socialButton' />
                            </p>
                        </div>
                    </div>

                    <div className='cardFour'>
                        <div className='imageContainer'>
                            <img className='profileImage' />
                        </div>
                        
                        <div>Kelly Liang</div>

                        <div>
                            <p>
                                <img src={insta} className='socialButton' />
                                <img src={git} className='socialButton' />
                                <img src={lnkd} className='socialButton' />
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default About;