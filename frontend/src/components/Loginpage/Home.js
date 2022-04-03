import React, { useState } from "react"
import { Navigate, Redirect, useNavigate } from 'react-router-dom'
import Styles from './Home.module.css'
import Heading from "./Heading"
// import Userform from "./Userform";
import { Link } from "react-router-dom";
import store from "../../store";
import { useDispatch, useSelector } from "react-redux"
import { clearErrors, loadUser, login } from "../../actions/clientAction"
import "../../App.css";
function Home({ history }) {
    // const navigate = useNavigate()
    let initialValue = {
        email: '',
        password: ''
    }
    const [val, setVal] = useState(initialValue)
    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
    }

    // const handleClick = async () => {
    //     console.log(val);
    //     const response = await fetch('http://localhost:4000/api/clients/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify(val)
    //     })

    //     const json = await response.json()

    //     if (json.success) {
    //         navigate('/home')
    //     }
    //     console.log(json);
    // }

    const dispatch = useDispatch();
    
    const { client, isAuthenticated } = useSelector(state => state.client);

    const handleClick = () => {
        console.log(val);
        if (!val.email || !val.password) {
            return <Redirect to={'/'} />
            // console.log("no")
        }

        dispatch(login(val.email, val.password));

        history.push("/customer")

        // window.location.reload();

        // return <Redirect to="/customer" />
    }
    
    return <>
        <div className={Styles.BigContainer}>
            <Heading />
            <div className={Styles.Container}>
                <div className={Styles.SubContainer}>
                    {/* <label>Username</label> */}
                    <br />
                    <input className={Styles.Input} type="email" placeholder="Email" name="email" value={val.email} onChange={handleChange} />
                </div>
                <div className={Styles.SubContainer}>
                    {/* <label>Password</label> */}
                    <br />
                    <input className={Styles.Input} type="password" placeholder="Password" name="password" value={val.password} onChange={handleChange} />
                </div>
                {/* <Link to='/customer'> */}
                <div >
                    <button onClick={handleClick} className="submitbtn btn btn-success" type="submit">Submit</button>
                </div>
                {/* </Link> */}

            </div>
        </div>
    </>
}

export default Home;