import React from 'react';
import '../../../styles/homepage/section3.css'

export const SectionThree = () => {
    return (
        <>
        <div className='sectionThree'>
        <div className='hompage_question'>
        <h1>What does DiffRent do, uh...differently?</h1>
        </div>
        <div className='featuresContainer'>
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
        </div>
        </div>
        </>
    )
}