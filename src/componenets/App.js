import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import './App.css';
import api from "../api/contact"
import Header from "./Header";
import ContactList from "./ContactList";
import AddContactWrapper from "./useNavigate";
import ContactDetail from "./ContactDetail";
import EditContact from "./EditContact";



function App() {
  const LOCAL_STORAGE_KEY = "contacts";

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const SearchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      })
      setSearchResults(newContactList);
    }
    else {
      setSearchResults(contacts);
    }
   };

  //retrieveContacts
  const retrieveContacts = async () => { 
    const response = await api.get("/contacts");
    return response.data;
  };

  const AddContactHandler = async (contact) => {
    const newContact = {
      id: uuid(),
      ...contact,
    };
    const response = await api.post("/contacts", newContact);
    setContacts([...contacts, response.data]);
  };

  const UpdateContactHandler = async (contact) => {
    const response = await api.put(`contacts/${contact.id}`, contact);
    const { id, name, email } = response.data;
    setContacts(contacts.map((contact) => {
      return contact.id === id ? { ...response.data } : contact;
    })
    );
   };


  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });
    setContacts(newContactList);
  };


  
  useEffect(() => {
    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setContacts(allContacts);
    };
    getAllContacts();
  }, []);
  

  return (
    <div className='ui container'>
      <Router>
        <Header />
        <div style={{ marginTop: "90px" }}></div>
        <Routes>
          <Route path="/add" element={<AddContactWrapper AddContactHandler={AddContactHandler} />} />
          <Route
            path="/"
            element={
              <ContactList
                contacts={searchResults.length<1?contacts:searchResults}  
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyWord={SearchHandler}
              />
            }
          />
          <Route
            path="/contact/:id"
            element={<ContactDetail/>}
          ></Route>
          <Route path="/edit" element={<EditContact UpdateContactHandler={UpdateContactHandler} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
