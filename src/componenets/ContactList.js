import React,{useRef} from 'react';
import { Link } from 'react-router-dom';
import ContactCard from './ContactCard';

const ContactList = (props) => {
  const inputEl = useRef("");
  const deleteContactHandler = (id) => {
    props.getContactId(id);
  };
  
  const renderContactList = props.contacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={deleteContactHandler}
        key={contact.id}
      />
    );
  });

  const getSearchTerm = () => {
    props.searchKeyWord(inputEl.current.value);
   };
  return (
    <div className="main">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Contact List</h2>
        <Link to='/add'>
          <button className="ui button blue">Add Contact</button>
        </Link>
      </div>
      <div className='ui search'>
        <div className='ui icon input'>
          <input ref={inputEl} type='text' placeholder='search contacts' className='prompt' value={props.term} onChange={ getSearchTerm} style={{ width: '1125px' } } />
          <i className='search icon'></i>
        </div>
      </div>
      <div className="ui celled list">{renderContactList.length>0?renderContactList:"No result found. Please add a contact!"}</div>
    </div>
  );
};


export default ContactList;
