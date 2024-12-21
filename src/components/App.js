
import React, {useState, useEffect} from 'react';
import './App.css';
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
import { v4 as uuidv4 } from 'uuid';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import ContactDetail from './ContactDetails';
import api from '../api/contacts';
import EditContact from './EditContact';




 
function App() {

  const LOCAL_STORAGE_KEY = 'contacts';
  const [contacts, setcontacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);


  const retrieveContacts = async () => {
    const response = await api.get ('/contacts');
    return response.data;
  }

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id:uuidv4(),
      ...contact,
    }

    const response = await api.post("/contacts", request);
    console.log(response);
    setcontacts([...contacts, { ...contact , response}]);
  };

  const removeContactHandler = async (id) => {

    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setcontacts (newContactList);
  }

  // const updateContactHandler = (updatedContact) => {
  //     setcontacts(contacts.map(contact => 
  //         contact.id === updatedContact.id ? updatedContact : contact
  //     ));
  // };

  // const updateContactHandler = async(contact) => {
  //   const response =await api.put(`/contacts/${contact.id}`, contact)
  //   const{id,name,email} = response;
  //   setcontacts(contacts.map(contact => {
  //     return contact.id===id? {...response} : contact;
  //   }))
  // }

  const updateContactHandler = async (contact) => {
    try {
        const response = await api.put(`/contacts/${contact.id}`, contact);
        const updatedContact = response.data; // Extract updated contact from response

        setcontacts(
            contacts.map((existingContact) =>
                existingContact.id === updatedContact.id ? updatedContact : existingContact
            )
        );
    } catch (error) {
        console.error("Error updating contact:", error);
    }
};

// const searchHandler = () =>{
//   setSearchTerm(searchTerm);
//   if(searchTerm !== ""){
//     const newContactList = contacts.filter((contact) => {
//       return Object.values(contact)
//       .join(" ")
//       .toLowerCase()
//       .includes(searchTerm.toLowerCase())
//     })
//     setSearchResult(newContactList);
//   }
//   else {
//     setSearchResult(contacts);
//   }
// }
const searchHandler = (term) => {
  setSearchTerm(term); // Update the state with the search term
  if (term !== "") {
    const newContactList = contacts.filter((contact) => {
      return Object.values(contact)
        .join(" ")
        .toLowerCase()
        .includes(term.toLowerCase());
    });
    setSearchResult(newContactList); // Update the search result
  } else {
    setSearchResult(contacts); // Show all contacts if search is empty
  }
};



  useEffect( () => {
    // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retrieveContacts && retrieveContacts.length > 0) setcontacts(retrieveContacts);

    const getAllContacts = async () => {
      const allContacts = await retrieveContacts();
      if (allContacts) setcontacts(allContacts);
    }

    getAllContacts();

  },[]);

  useEffect( () => {
    // localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);



  return (
    <div className='ui container'>
      <Router>
        <Header />
        
<div>
  <Link to="/">Home</Link> | <Link to="/add">Add Contact</Link>
</div>

<div className="content">

  <Routes>
    <Route
      path="/"
      element={<ContactList 
        contacts={searchTerm.length <1 ? contacts : searchResult} 
        getContactId={removeContactHandler} 
        term={searchTerm}
        searchKeyword={searchHandler}
        />}
    />

  <Route
      path="/edit"
      element={<EditContact updateContactHandler={updateContactHandler} />}
  />

  <Route
    path="/add"
    element={<AddContact addContactHandler={addContactHandler} />}
  />
  <Route path='/contact/:id' element={<ContactDetail/>}/>
</Routes>
</div>
      
     
      </Router>
      
    </div>
  );
}

export default App;
