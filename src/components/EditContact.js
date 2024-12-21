
// import React, { useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";

// const EditContact = (props) => {
//     const location = useLocation(); // Get the location object
//     const { contact } = location.state || {}; // Extract contact or use a fallback

//     // Null check for contact
//     if (!contact) {
//         return (
//             <div className="ui main">
//                 <h2>No contact data available.</h2>
//             </div>
//         );
//     }

//     const [updatedName, setUpdatedName] = useState(contact.name || "");
//     const [updatedEmail, setUpdatedEmail] = useState(contact.email || "");
//     const navigate = useNavigate();

//     const update = (e) => {
//         e.preventDefault();
//         if (updatedName === "" || updatedEmail === "") {
//             alert("All the fields are mandatory");
//             return;
//         }
//         props.updateContactHandler({ id: contact.id, name: updatedName, email: updatedEmail });
//         navigate("/");
//     };

//     return (
//         <div className="ui main">
//             <h2>Update Contact</h2>
//             <form className="ui form" onSubmit={update}>
//                 <div className="field">
//                     <label>Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         placeholder="Name"
//                         value={updatedName}
//                         onChange={(e) => setUpdatedName(e.target.value)}
//                     />
//                 </div>

//                 <div className="field">
//                     <label>Email</label>
//                     <input
//                         type="text"
//                         name="email"
//                         placeholder="Email"
//                         value={updatedEmail}
//                         onChange={(e) => setUpdatedEmail(e.target.value)}
//                     />
//                 </div>
//                 <button className="ui button blue">Update</button>
//             </form>
//         </div>
//     );
// };

// export default EditContact;

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EditContact = (props) => {
    const location = useLocation();
    const navigate = useNavigate();

    // Initialize state unconditionally
    const { contact } = location.state || {};
    const [updatedName, setUpdatedName] = useState(contact?.name || "");
    const [updatedEmail, setUpdatedEmail] = useState(contact?.email || "");

    // Handle cases where contact data is missing
    if (!contact) {
        return (
            <div className="ui main">
                <h2>No contact data available.</h2>
            </div>
        );
    }

    const update = (e) => {
        e.preventDefault();
        if (updatedName === "" || updatedEmail === "") {
            alert("All the fields are mandatory");
            return;
        }
        props.updateContactHandler({ id: contact.id, name: updatedName, email: updatedEmail });
        navigate("/");
    };

    return (
        <div className="ui main">
            <h2>Update Contact</h2>
            <form className="ui form" onSubmit={update}>
                <div className="field">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={updatedName}
                        onChange={(e) => setUpdatedName(e.target.value)}
                    />
                </div>

                <div className="field">
                    <label>Email</label>
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        value={updatedEmail}
                        onChange={(e) => setUpdatedEmail(e.target.value)}
                    />
                </div>
                <button className="ui button blue">Update</button>
            </form>
        </div>
    );
};

export default EditContact;
