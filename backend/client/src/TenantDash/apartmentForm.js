import React from 'react';

export const ApartmentForm = (props) => {
    const { apt, user, updateApt, modal, handleModal } = props;

    return(
        <div className='modalField' onClick={handleModal}>
        <div className='modalButton' onClick={handleModal}>X</div>
        <div className='aptInfo'>
            <p>{apt.name}</p>
            <p>{apt.apt} {apt.address}</p>
            <p>{apt.email}</p>
            <p>{apt.phone}</p>
        </div>
        <form onSubmit={updateApt}>
            <input
            name='aptid'
            type='hidden'
            readOnly={true}
            value={apt.aptid} />
            <input
            name='apt'
            type='hidden'
            readOnly={true}
            value={apt.apt} />
            <input
            name='address'
            type='hidden'
            readOnly={true}
            value={apt.address} />
            <input
            name='landlord_id'
            type='hidden'
            readOnly={true}
            value={apt.landlord_id} />
            <input
            name='tenant_id'
            type='hidden'
            readOnly={true}
            value={user.userid} />
            <input type='submit' />
        </form>
        </ div>
    )
}