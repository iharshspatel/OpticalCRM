import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import Styles from './CutomerCreate.module.css'
import { createClient } from "../../actions/clientAction"
import { useEffect, useState } from "react"
const ClientCreate = ({ history }) => {
    const dispatch = useDispatch();
    const { client, loading, isAuthenticated } = useSelector((state) => state.client);
    
    useEffect(() => {
        if (isAuthenticated === false) {
            console.log("clientCustomer returning")
            history.push("/");
        }
    }, [history, isAuthenticated]);

    let initialValue = {

        name: "",
        address: "",
        date: "",
        contactno: "",
        email: "",
        username: "",
        password: "",
        remarks: ""

    }
    const [val, setVal] = useState(initialValue)

    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
    }

    function handleClick(e) {
        e.preventDefault();
        console.log(`client`)
        console.log(val)
        dispatch(createClient(val));
        history.push("/admin");
    }
    return (
        <div className={Styles.Container}>
            <form className={Styles.Form}>
            <input placeholder='Name' required name="name" className={Styles.input} value={val.name} onChange={handleChange} />
            <input placeholder='Address' name="address" className={Styles.input} value={val.address} onChange={handleChange} />
            <input placeholder='Date' type='date' name="date" className={Styles.input} value={val.date} onChange={handleChange} />
            <input placeholder='Contact no.' type='tel' name="contactno" className={Styles.input} value={val.contactno} onChange={handleChange} />
            <input placeholder='Email' type='email' name="email" className={Styles.input} value={val.email} onChange={handleChange} />
            <input placeholder='username' name="username" className={Styles.input} value={val.username} onChange={handleChange} />
            <input placeholder='password' name="password" className={Styles.input} type='password' value={val.password} onChange={handleChange} />
            <input placeholder='remarks' name="remarks" className={Styles.input} value={val.remarks} onChange={handleChange} />
            <button onClick={handleClick} className={Styles.button} type="submit">Submit</button>
        </form></div>
    )
}

export default ClientCreate;