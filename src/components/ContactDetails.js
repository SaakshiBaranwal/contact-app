// import React from "react";
// import user from '../images/user.png'
// import { Link, useLocation } from "react-router-dom";

// const ContactDetail = (props) => {
    

//     const { name, email } = props.location.state.contact;
//      return(
//         <div className="main">
//             <div className="ui card centered">
//                 <div className='image'>
//                     <img src={user} alt='user'/>                
//             </div>
//             <div className="content">
//                 <div className="header">{name}</div>
//                 <div className="description">{email}</div>
//             </div>
//             </div>

//             <div className="center-div">
//             <Link to="/">
//             <button className="ui button blue center">Back to Contact List</button>
//             </Link>
//             </div>
            
//         </div>
//     )
// }

// export default ContactDetail;

import React from "react";
import user from '../images/user.png';
import { Link, useLocation } from "react-router-dom";

const ContactDetail = () => {
    const location = useLocation(); // Get the location object
    const { contact } = location.state || {}; // Extract contact from state

    if (!contact) {
        return (
            <div className="main">
                <h2>No contact data available.</h2>
                <Link to="/">
                    <button className="ui button blue">Back to Contact List</button>
                </Link>
            </div>
        );
    }

    const { name, email } = contact;

    return (
        <div className="main">
            <div className="ui card centered">
                <div className="image">
                    <img src={user} alt="user" />
                </div>
                <div className="content">
                    <div className="header">{name}</div>
                    <div className="description">{email}</div>
                </div>
            </div>

            <div className="center-div">
                <Link to="/">
                    <button className="ui button blue center">Back to Contact List</button>
                </Link>
            </div>
        </div>
    );
};

export default ContactDetail;
