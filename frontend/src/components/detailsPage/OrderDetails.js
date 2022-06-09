import React, { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getOrderDetails } from '../../actions/orderDetailsAction'
import Loading from '../Layout/Loading'
import Styles from './OrderDetails.module.css'
import { useAlert } from 'react-alert'
import ReactToPrint from "react-to-print"
const OrderDetails = ({ history, match }) => {

  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, orderdetails } = useSelector(state => state.orderdetail)

  useEffect(() => {
    dispatch(getOrderDetails(match.params.id))
  }, [])


  const updateOrderHadler = async () => {
    history.push(`/customers/orders/update/${match.params.id}`)
  }

  const deleteOrderHandler = async () => {
    try {
      const { data } = await axios.delete(`/api/orders/${match.params.id}`,)
      console.log(data)
      alert.success("Order Deleted");
      history.push('/customer')
    }
    catch (error) {
      console.log(error)
      alert.error("Order Delete Failed")
    }
  }
  const componetRef = useRef()
  return (
    <>
      {loading === false ? <>
        <div className={Styles.container} ref={componetRef}>
          <p className={Styles.item} >Lens Type : {orderdetails.lens_type}</p>
          <p className={Styles.item} >Frame Type:{orderdetails.frame_type}</p>
          <p className={Styles.item} >Amount    :{orderdetails.amount}</p>
          <p className={Styles.item} >Remarks   :{orderdetails.remarks}</p>
          <table>
            <tbody>
              <tr>
                <th>Right Eye</th>
                <th>SPH</th>
                <th>CYL</th>
                <th>AXIS</th>
              </tr>

              <tr>
                <td>Distance</td>
                <td>
                  {orderdetails.re_sph}
                </td>

                <td>
                  {orderdetails.re_cyl}
                </td>

                <td>
                  {orderdetails.re_axis}
                </td>

              </tr>

              <tr>
                <td>Near</td>
                <td>{orderdetails.re_near_sph}</td>
                <td>{orderdetails.re_near_cyl}</td>
                <td>{orderdetails.re_near_axis}</td>

              </tr>
            </tbody>
          </table>


          <table>
            <tbody>
              <tr>
                <th>Left Eye</th>
                <th>SPH</th>
                <th>CYL</th>
                <th>AXIS</th>
              </tr>

              <tr>
                <td>Distance</td>
                <td>
                  {orderdetails.le_sph}
                </td>

                <td>
                  {orderdetails.le_cyl}
                </td>

                <td>
                  {orderdetails.le_axis}
                </td>

              </tr>

              <tr>
                <td>Near</td>
                <td>{orderdetails.le_near_sph}</td>
                <td>{orderdetails.le_near_cyl}</td>
                <td>{orderdetails.le_near_axis}</td>

              </tr>
            </tbody>
          </table>
        </div>

        <div className={Styles.buttonContainer}>
          <button className={Styles.button} onClick={updateOrderHadler}>Update Order</button>

          <button className={Styles.button} onClick={deleteOrderHandler}>Delete</button>
          <ReactToPrint trigger={() => <button className={Styles.button}>Print / Download</button>}
            content={() => componetRef.current} />
        </div>
      </> : <Loading />
      }

    </>

  )
}

export default OrderDetails