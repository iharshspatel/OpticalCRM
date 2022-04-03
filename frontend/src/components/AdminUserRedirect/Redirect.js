import React from "react";
import { useDispatch, useSelector } from "react-redux"


const redirect = ({ history }) => {
    const dispatch = useDispatch();

    const { client } = useSelector((state) => state.client);
    const role = client.user;
    console.log(role.role);

    
    if (role.role === 'admin') {
        history.push("/admin")
    }
    else {

        history.push("/customer");
    }

    return null
}
export default redirect;