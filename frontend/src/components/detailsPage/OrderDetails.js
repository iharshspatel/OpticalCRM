import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import axios from 'axios'
import { getOrderDetails } from '../../actions/orderDetailsAction'
import Loading from '../Layout/Loading'
import Styles from './OrderDetails.module.css'
import { useAlert } from 'react-alert'
const OrderDetails = ({history,match}) => {

    const dispatch = useDispatch();
    const alert = useAlert();
    const {loading, orderdetails} = useSelector(state => state.orderdetail)

    useEffect(()=>{
        dispatch(getOrderDetails(match.params.id))
    },[])


    const updateOrderHadler = async() =>{
      history.push(`/customers/orders/update/${match.params.id}`)
    }

    const deleteOrderHandler = async() => {
      try{
      const {data} = await axios.delete(`/api/orders/${match.params.id}`, )
      console.log(data)
      alert.success("Order Deleted");
      history.push('/customer')
      }
      catch(error){
        console.log(error)
      alert.error("Order Delete Failed")
      }
    }
  return (
      <>
      {loading===false? <>
      <div className={Styles.container}>
         <p className={Styles.item} >Lens Type : {orderdetails.lens_type}</p>
         <p className={Styles.item} >Frame Type:{orderdetails.frame_type}</p>
         <p className={Styles.item} >Amount    :{orderdetails.amount}</p>
         <p className={Styles.item} >Remarks   :{orderdetails.remarks}</p>
         <p className={Styles.item} >RE SPH    :{orderdetails.re_sph}</p>
         <p className={Styles.item} >RE AXIS   :{orderdetails.re_axis}</p>
         <p className={Styles.item} >RE_CYL    :{orderdetails.re_cyl}</p>
         <p className={Styles.item} >LE_SPH    :{orderdetails.le_sph}</p>
         <p className={Styles.item} >LE_AXIS   :{orderdetails.le_axis}</p>
         <p className={Styles.item} >LE_CYL    :{orderdetails.le_cyl}</p>
        </div>

        <div className={Styles.buttonContainer}>
        <button className={Styles.button} onClick={updateOrderHadler}>Update Order</button>
        
        <button className={Styles.button} onClick={deleteOrderHandler}>Delete</button>
        </div>
         </>:<Loading/>
      }
        
    </>
 
  )
}

export default OrderDetails