
// import React, {useRef} from "react";
// import { Link } from "react-router-dom";
// import ContactCard from "./ContactCard";
// import { useNavigate } from "react-router-dom";

// const ContactList = (props) => {

//     const inputE1 = useRef("")
//     const contacts = props.contacts || [];

//     const deleteContactHandler = (id) => {
//         props.getContactId(id);
//     }

//     const navigate = useNavigate();

//     const viewContactHandler = (contact) => {
//     navigate(`/contact/${contact.id}`, { state: { contact } });
//     };
        
//     const renderContactList = contacts.map((contact) => {
//         return(
//             <div>
//             <ContactCard 
//             contact={contact} 
//             clickHandler={deleteContactHandler} 
//             key={contact.id} /> 
//             {/* <Link
//                 to={{
//                 pathname: `/contact/${contact.id}`,
//                 state: { contact },
//                 }}>
            
//                 <button className="ui button blue" onClick={() => viewContactHandler(contact)}>View Details</button>
//             </Link> */}

// <Link
//     to={`/contact/${contact.id}`}
//     state={{ contact }} // Use 'state' prop
// >
//     <button className="ui button blue" onClick={() => viewContactHandler(contact)}>
//         View Details
//     </button>
// </Link>


//       </div>
//         )
// })

//     const getSearchTerm =() => {

//         props.searchKeyword(inputE1.current.value);
//     };
//     return (
//         <div>
//         <h2>
//             Contact List
//             <Link to='/add'>
//               <button className='ui button blue right'>Add Contact</button>
//             </Link>
//         </h2>

//         <div className="ui search">
//             <div className="ui icon input">

//                 <input 
//                 ref={inputE1}
//                 type='text' 
//                 placeholder="Search Contact" 
//                 className="prompt" 
//                 value={props.term} 
//                 onChange={getSearchTerm}
//                 />
//                 <i className="search icon"></i>
//             </div>
//         </div>

//         <div className="ui celled list">
//             {renderContactList.length > 0 ? renderContactList: "No Contacts"}
//         </div>
//         </div>
//     )
// }

// export default ContactList

import React, { useRef } from "react";
import { Link } from "react-router-dom";
import ContactCard from "./ContactCard";
import { useNavigate } from "react-router-dom";

const ContactList = (props) => {
  const inputE1 = useRef(""); // Initialize useRef to track search input
  const contacts = props.contacts || []; // Use provided contacts or an empty array as a fallback

  const deleteContactHandler = (id) => {
    props.getContactId(id); // Call parent function to handle delete
  };

  const navigate = useNavigate();

  const viewContactHandler = (contact) => {
    navigate(`/contact/${contact.id}`, { state: { contact } });
  };

  // Map through contacts to create a list of contact cards
  const renderContactList = contacts.map((contact) => {
    return (
      <div key={contact.id}>
        <ContactCard contact={contact} clickHandler={deleteContactHandler} />
        <Link
          to={`/contact/${contact.id}`}
          state={{ contact }} // Pass contact data as state
        >
          <button className="ui button blue">View Details</button>
        </Link>
      </div>
    );
  });

  // Handle search term change
  const getSearchTerm = () => {
    props.searchKeyword(inputE1.current.value); // Pass the input value to the parent handler
  };

  return (
    <div>
      <h2>
        Contact List
        <Link to="/add">
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>

      <div className="ui search">
        <div className="ui icon input">
          <input
            ref={inputE1}
            type="text"
            placeholder="Search Contacts"
            className="prompt"
            value={props.term} // Reflect the current search term from the parent
            onChange={getSearchTerm} // Trigger search on input change
          />
          <i className="search icon"></i>
        </div>
      </div>

      <div className="ui celled list">
        {renderContactList.length > 0 ? renderContactList : "No contacts available"}
      </div>
    </div>
  );
};

export default ContactList;
