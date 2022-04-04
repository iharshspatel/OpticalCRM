import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import Styles from './OrderCreate.module.css'
import { clearErrors, createOrder, getCustomer } from "../../actions/customerAction"
import { updateProfile } from "../../actions/customerAction"
import { useAlert } from 'react-alert';

const OrderCreate = ({ history }) => {
    const dispatch = useDispatch();
    const alert = useAlert();

    const { client, loading, isAuthenticated } = useSelector((state) => state.client);
    const {error,orderdetails} = useSelector(state=> state.orderdetail)
    const { customers } = useSelector(
        (state) => state.customers
    );
    const str = history.location.pathname;
    const id = str.substring(str.length - 24);
    
    useEffect(()=>{
        console.log(error)
        if(error){
            alert.error("error")
            dispatch(clearErrors())
        }

    },[error,alert,dispatch])

    useEffect(() => {
        dispatch(getCustomer());
        if (isAuthenticated === false) {

            history.push("/");
        }
    }, [history, isAuthenticated]);
    let initialValue = {
        lens_type: "",
        frame_type: "",
        amount: "",
        remarks: "",
        re_sph: "",
        re_cyl: "",
        re_axis: "",
        le_sph: "",
        le_cyl: "",
        le_axis: ""

    }
    const [val, setVal] = useState(initialValue)

    const handleChange = (e) => {
        setVal({ ...val, [e.target.name]: e.target.value })
    }

    function handleClick(e) {
        e.preventDefault();
        dispatch(createOrder(val, id));
        history.goBack();
    }
    return (
        <div className={Styles.Container}>
            <form className={Styles.Form}>
            <input placeholder='lens_type' name="lens_type" className={Styles.input} value={val.lens_type} onChange={handleChange} />
            <input placeholder='frame_type' name="frame_type" className={Styles.input} value={val.frame_type} onChange={handleChange} />
            <input placeholder='amount' name="amount" className={Styles.input} value={val.amount} onChange={handleChange} />
            <input placeholder='remarks' name="remarks" className={Styles.input} value={val.remarks} onChange={handleChange} />
            <input placeholder='re_sph' type='number' name="re_sph" className={Styles.input} value={val.re_sph} onChange={handleChange} />
            <input placeholder='re_cyl' type='number' name="re_cyl" className={Styles.input} value={val.re_cyl} onChange={handleChange} />
            <input placeholder='re_axis' type='number' name="re_axis" className={Styles.input} value={val.re_axis} onChange={handleChange} />
            <input placeholder='le_sph' type='number' name="le_sph" className={Styles.input} value={val.le_sph} onChange={handleChange} />
            <input placeholder='le_cyl' type='number' name="le_cyl" className={Styles.input} value={val.le_cyl} onChange={handleChange} />
            <input placeholder='le_axis' type='number' name="le_axis" className={Styles.input} value={val.le_axis} onChange={handleChange} />
            <button onClick={handleClick} className={Styles.button} type="submit">Submit</button>
        </form></div>
    )
}

export default OrderCreate;