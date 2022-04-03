import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAIL,
    CLEAR_ERRORS
} from'../constants/customerConstant'

export const orderdetailsReducer = (state = { orderdetails:{} }, action) => {
    switch (action.type) {
        case GET_ORDER_REQUEST:
            return {
                loading: true,
            };
        case GET_ORDER_SUCCESS:
            return {
                loading: false,
                orderdetails:action.payload
            };
        case GET_ORDER_FAIL:
            return {
                loading: false,
                error: action.payload
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }

        default:
            return state;
    }
}