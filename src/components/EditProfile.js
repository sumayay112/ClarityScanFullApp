import React from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';


export default function EditProfile() {
  return (
     <div className="editprofilecontainer">
            <h1>Edit Profile </h1>
         

<input type="text" placeholder="Edit Display Name" />
<input type="text" placeholder="Edit First Name" />
<input type="text" placeholder="Edit Last Name" />

<div className="buttons">
<button className="cancelbutton">Cancel</button>
<button className="savebutton">Save Chages</button>
            
        </div>
        </div>
  );
}

