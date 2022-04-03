import React from 'react'
import "./logoutbutton.css";
const LogoutButton = (props) => {
    return (
        <button type='submit' className='logout btn btn-secondary' onClick={props.func}>
            logout
        </button>
    )
}

export default LogoutButton