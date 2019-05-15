import React, { Component } from 'react';
import '../../styles/about/about.css'
import insta from '../../assets/logos/insta_logo.png';
import git from '../../assets/logos/github_logo.png';
import lnkd from '../../assets/logos/linkedin_logo.png';
import erick from '../../assets/profileImgs/erick.jpg';
import tkeya from '../../assets/profileImgs/tjs.png';
import trey from '../../assets/profileImgs/treagan.jpeg';
import kelly from '../../assets/profileImgs/Kelly.png'

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
                            <img alt='' src={tkeya} className='profileImage' />
                        </div>
                        
                        <div>T'Keya Stevens</div>

                        <div>
                            <p>
                                <a href='//www.instagram.com/pixelynx_'><img alt='' src={insta} className='socialButton' /></a>
                                <a href='//www.github.com/pixelynx'><img alt='' src={git} className='socialButton' /></a>
                                <a href='//www.linkedin.com/in/tjstevens92'><img alt='' src={lnkd} className='socialButton' /></a>
                            </p>
                        </div>
                    </div>

                    <div className='cardTwo'>
                        <div className='imageContainer'>
                            <img alt='' src={trey} className='profileImage' />
                        </div>
                        
                        <div>Treagan Birbal</div>

                        <div>
                            <p>
                                <a href='//www.instagram.com/treaganism'><img alt='' src={insta} className='socialButton' /></a>
                                <a href='//www.github.com/treaganbirbal'><img alt='' src={git} className='socialButton' /></a>
                                <a href='//www.linkedin.com/in/treagan-birbal'><img alt='' src={lnkd} className='socialButton' /></a>
                            </p>
                        </div>
                    </div>

                    <div className='cardThree'>
                        <div className='imageContainer'>
                            <img alt='' src={erick} className='profileImage' />
                        </div>

                        <div>Erick Arellano</div>

                        <div>
                            <p>
                                <a href='//www.instagram.com/earellano1719'><img alt='' src={insta} className='socialButton' /></a>
                                <a href='//github.com/earellano1719'><img alt='' src={git} className='socialButton' /></a>
                                <a href='//www.linkedin.com/in/earellano1719'><img alt='' src={lnkd} className='socialButton' /></a>
                            </p>
                        </div>
                    </div>

                    <div className='cardFour'>
                        <div className='imageContainer'>
                            <img alt='' src={kelly} className='profileImage' />
                        </div>
                        
                        <div>Kelly Liang</div>

                        <div>
                            <p>
                                <a href='//www.instagram.com/imkellyliang'><img alt='' src={insta} className='socialButton' /></a>
                                <a href='//www.linkedin.com/in/imkellyliang'><img alt='' src={git} className='socialButton' /></a>
                                <a href='//www.github.com/kellyliang7'><img alt='' src={lnkd} className='socialButton' /></a>
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        )
    }
}

export default About;