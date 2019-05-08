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
            <div className='landingPage'>
                <img className='home1' src={home1} style={bgImgStyle} />
                <div className="arrow-bounce bounce">

                </div>
                <section className='section-1'>
                  <h1 className='app-name'>DiffRent</h1>
                  <h2 className='slogan'>
                    The inclusive, user friendly communication platform that streamlines the landlord and tenant interaction.
                  </h2>
                  <h2>
                    Whether you are a landlord managing multi-family apartments or a tenant looking for an easy uncomplicate
                    a part of life in an ever-growing, complicated world, DiffRent is the right tool for you.
                  </h2>
                </section>

                <div className="home2">
                  <div className='home2-text'>
                      <span className='border'>
                    </span>
                  </div>
                </div>

                <section className='section-2'>
                  <h1 className='hompage_question'>What does DiffRent do, uh...differently?</h1>
                  <div className='desc_container'>
                    <div className='card-1'>
                      <h2>Organization Made Easy</h2>
                      <h3>
                        DiffRent makes keeping track of important contact information ultra easy, it's right there on your Dashboard!
                      </h3>
                      <h3>

                      </h3>
                    </div>
                    <div className='card-2'>
                      <h2>
                        Ticketing System
                      </h2>
                      <h3>
                        Whenever a problem arises within the apartment tenants can notify the landlord with detailed information.
                      </h3>
                      <h3>
                        Scheduling and Tracking Appointments are made easy with a very intuitive calender system built right in tickets.
                      </h3>
                    </div>
                    <div className='card-3'>
                      <h2>
                        Messaging
                      </h2>
                      <h3>
                        The landlord & tenant relationship is easily maintained with DiffRent's messaging system.  It is designed to
                        keep the lines of communication open.
                      </h3>
                      <h3>
                        Create new conversation threads to easily keep topics seperated.
                      </h3>
                    </div>
                  </div>
                </section>

                <div className="home3">
                  <div className='home2-text'>
                    <span className='border'>

                    </span>
                  </div>
                </div>

                <section className='section-3'>
                  <h2>Section Two</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nunc sed id semper risus in. Cursus mattis molestie a iaculis. Nam libero justo laoreet sit amet cursus sit. In vitae turpis massa sed elementum. At risus viverra adipiscing at in. Convallis aenean et tortor at risus viverra adipiscing at. In est ante in nibh mauris cursus mattis molestie a. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. Est pellentesque elit ullamcorper dignissim. Feugiat in fermentum posuere urna nec. Vestibulum mattis ullamcorper velit sed. Id velit ut tortor pretium viverra suspendisse potenti nullam. Venenatis a condimentum vitae sapien pellentesque habitant morbi tristique senectus. At auctor urna nunc id cursus metus aliquam eleifend mi.
                  </p>
                </section>

                <div className='container'>
                  <div className='op'></div>
                    <div className='homepageButtons'>
                      <img className='logo_official' src={logo} style={styles} />
                      <a href='/tenants/login'><button className='tenantButton'>Tenant</button></a>
                      <a href='/landlords/login'><button className='landlordButton'>Landlord</button></a>
                  </div>
                </div>
                <footer className='footer'>
                <p>footer</p>
                </footer>
            </div>
        )
    }
}

export default withRouter(Homepage);
