import {
    CLIENT_REQUEST,
    CLIENT_FAIL,
    CLIENT_SUCCESS,
    CLEAR_ERRORS,
    LOGOUT_FAIL,
    LOGOUT_SUCCESS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    ALL_CLIENT_FAIL,
    ALL_CLIENT_REQUEST,
    ALL_CLIENT_SUCCESS,
    ADD_CLIENT_FAIL,
    ADD_CLIENT_REQUEST,
    ADD_CLIENT_SUCCESS
} from "../constants/clientConstants";
import axios from "axios";
export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({ type: CLIENT_REQUEST });
        const config = { headers: { "Content-Type": "application/json" } };
        const { data } = await axios.post(`/api/clients/login`, { email, password }, config);

        dispatch({ type: CLIENT_SUCCESS, payload: data.client })
    } catch (error) {
       
        dispatch({
            type: CLIENT_FAIL,
             payload: error
        })
    }

}
export const createClient = (client) => async (dispatch) => {
    try {
        dispatch({ type: ADD_CLIENT_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        const { data } = await axios.post("/api/clients/register", client, config);

        dispatch({ type: ADD_CLIENT_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: ADD_CLIENT_FAIL,
            payload: error.response.data.message,
        });
    }
};
export const getClients = (keyword="", currentPage=1) => async (dispatch) => {
    try {
        console.log(`keyword is ${keyword}`)
        dispatch({
            type: ALL_CLIENT_REQUEST
        });
        const { data } = await axios.get(`/api/allclient?keyword=${keyword}&page=${currentPage}`)
        console.log(`${keyword} ${currentPage}`)
        console.log(data)
        dispatch({
            type: ALL_CLIENT_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: ALL_CLIENT_FAIL,
            payload: error.response.data.message
        })
    }
}

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: LOAD_USER_REQUEST });
        


        const { data } = await axios.get(`/api/client`);
        console.log(data)
        dispatch({ type: LOAD_USER_SUCCESS, payload: data.client });
    } catch (error) {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response.data.message });
    }
};
export const logout = () => async (dispatch) => {
    try {
        await axios.get(`/api/clients/logout`);

        dispatch({ type: LOGOUT_SUCCESS });
    } catch (error) {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data.message });
    }

};
export const clearErrors = () => async(dispatch) => {
    dispatch({
        type: CLEAR_ERRORS
    })
}