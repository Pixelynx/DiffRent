import React from 'react';
import '../styles/faq_style/faq.css';

export const FAQ = () => {
  return (
    <div  className='faq-container'>
      <div className='app-qa'>
        <h1>Frequently Asked Questions</h1>
        <h2>How Do I Sign-Up as a User on DiffRent?</h2>
        <h3>
          First, A landlord needs have an account on DiffRent & register apartments with an address & an apartment number. Tenants can sign-up under their assigned apartment number for a given address.
       </h3>
       <h2>
          What are tickets on DiffRent and how does it work?
       </h2>
       <h3>
          Tickets are the primary way to raise concern and bring attention to issues within an apartment.  Tickets remain open until the matter is resolved.  To ensure quality control, both landlord & tenant has to mark each ticket as resolved for it to be 100% resolved.
       </h3>
       <h2>
          What is an Inbox and how does this differ from Tickets?
       </h2>
       <h3>
         Inbox is used to streamline communication between landlords and tenants designed to be more like a conversation.  Each user has the ability to create new threads, which are subject matters. By creating a new thread, users essentially start a new conversation with each other.
       </h3>
       <h2>
          Can I list or find available apartments for rent on DiffRent?
       </h2>
       <h3>
         DiffRent is not a listing site for vacant properties.  We do not offer realtor services.  DiffRent simply makes property management easier for all.
       </h3>
       <hr/>
      </div>
      <div className='laws-container'>
        <h2>Resources to Local & State Laws</h2>
        <p><a href='https://ag.ny.gov/sites/default/files/tenants_rights.pdf'>Tenant Rights PDF</a></p>
        <p><a href='https://nycourts.gov/courts/nyc/housing/pdfs/Landlordbooklet.pdf'>Landlord Rights PDF</a></p>
        <p><a href='https://www1.nyc.gov/site/hpd/renters/tenants-rights.page'>Housing Preservation & Development(HPD)</a></p>
        <p><a href='http://metcouncilonhousing.org/tenants_rights_telephone_hotline'>Tenants Rights Hotline</a></p>
        <p><a href='https://www.hud.gov/states/new_york/renting/tenantrights'>U.S Department of Housing and Urban Development(HUD)</a></p>
      </div>
    </div>
    )
}
