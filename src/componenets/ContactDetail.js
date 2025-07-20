import React from 'react'
import user from "../images/user2.png"
import { Link } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

const ContactDetail = () => {
    const location = useLocation();
    const { name, email } = location.state.contact;

    return (
        <div className='main'>
            <div className='ui card centered'>
                <div className='image'>
                    <img src={user} alt='user'/>
                </div>
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div className='description'>{email}</div>
                </div>
            </div>
            <div className='center-div' style={{ textAlign: "center", marginTop: "20px" }}>
                <Link to="/">
                    <button className='ui button blue center'>Back to contact list</button>
                </Link>
            </div>
        </div>
  );
};

export default ContactDetail;