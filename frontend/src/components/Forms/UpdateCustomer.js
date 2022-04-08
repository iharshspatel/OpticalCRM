import React,{useEffect, useState} from 'react'
import axios from 'axios'
import Styles from './UpdateCustomer.module.css'
import { useAlert } from 'react-alert'
const UpdateCustomer = ({match, history}) => {
    
    useEffect(()=>{
        getCustomer();
    },[])

    const [val, setVal] = useState();
    const alert = useAlert();

    const handleChange = (e) => {
    setVal({ ...val, [e.target.name]: e.target.value })
    }

    const SubmitHandler = async(e) => {
        try{
        e.preventDefault();
        const {data} = await axios.put(`/api/customers/${match.params.id}`, val)
        alert.success("Order Updated Successfully")
        history.push("/customer")
        }
        catch(error){
        alert.error(error)
        }
    }

    const DeleteHandler =  async(e) => {
        try{
            e.preventDefault()
            const {data} = await axios.delete(`/api/customers/${match.params.id}`)
            alert.success("Customer Deleted!")
            history.push("/customer")


        }
        catch(error){
            alert.error("Erorr!")
        }
    }


    const getCustomer = async() =>{
        const {data} = await axios.get(`/api/customers/${match.params.id}`)
        setVal(data.customer);
        console.log(data.customer)
    }


    
  return (
    <div>
    { val && 
        <div className={Styles.Container}>
            <form className={Styles.Form}>
            <label className={Styles.label}>Name</label>
            <input placeholder='name' name="name" className={Styles.input} defaultValue={val.name} onChange={handleChange} />
            <label className={Styles.label}>Adress</label>
            <input placeholder='address' name="address" className={Styles.input} defaultValue={val.address} onChange={handleChange} />

            <label className={Styles.label}>Docter Name</label>
            <input placeholder='Dr Name' name="drname" className={Styles.input} defaultValue={val.drname} onChange={handleChange} />

            <label className={Styles.label}>Docter Address</label>
            <input placeholder='Dr Address' name="draddress" className={Styles.input} defaultValue={val.draddress} onChange={handleChange} />

            <label className={Styles.label}>Contact No</label>
            <input placeholder='contactno' name="contactno" className={Styles.input} defaultValue={val.contactno} onChange={handleChange} />
            <label className={Styles.label}>Date</label>
            <input placeholder='date' name="Date" className={Styles.input} defaultValue={val.date} onChange={handleChange} />
            <label className={Styles.label}>Adress</label>
            <input placeholder='Address'  name="Address" className={Styles.input} defaultValue={val.address} onChange={handleChange} />

            
            <button onClick={SubmitHandler} className={Styles.button} type="submit">Submit</button>
            <button onClick={DeleteHandler} className={Styles.button} type="submit">Delete</button>


            </form>
        </div>
     
    } 
    </div>
  )
}

export default UpdateCustomer