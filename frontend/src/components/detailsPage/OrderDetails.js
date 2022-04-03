import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getOrderDetails } from '../../actions/orderDetailsAction'
import Styles from './OrderDetails.module.css'

const OrderDetails = ({match}) => {

    const dispatch = useDispatch();
    const {loading, orderdetails} = useSelector(state => state.orderdetail)

    useEffect(()=>{
        dispatch(getOrderDetails(match.params.id))
    },[])
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
         </>:"waiting"
      }
        
    </>
 
  )
}

export default OrderDetails