import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL
} from'../constants/customerConstant';
import axios from 'axios';

export const getOrderDetails = (id) => async (dispatch) => {
    try{
        dispatch({
            type:GET_ORDER_REQUEST
        })

        const {data} = await axios.post('/api/customer/order',{id});
        console.log(data.order)
        dispatch({
            type:GET_ORDER_SUCCESS,
            payload:data.order
        })


    }
    catch(error){
        dispatch({
            type:GET_ORDER_FAIL,
            payload:error
        })
    }
}