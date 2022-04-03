import {
    CLIENT_REQUEST,
    CLIENT_FAIL,
    CLIENT_SUCCESS,
    CLEAR_ERRORS,
    LOAD_USER_FAIL,
    LOAD_USER_REQUEST,
    LOAD_USER_SUCCESS,
    ALL_CLIENT_FAIL,
    ALL_CLIENT_REQUEST,
    ALL_CLIENT_SUCCESS
} from "../constants/clientConstants";
export const clientsReducer = (state = { clients: {} }, action) => {
    switch (action.type) {
        case ALL_CLIENT_SUCCESS:
            return {
                ...state,
                loading: false,
                clients: action.payload.clients,
                clientCount:action.payload.clientCount,
                resultPerPage:action.payload.resultPerPage,
                filteredClientCount:action.payload.filteredClientCount
            }
        case ALL_CLIENT_REQUEST:
            return {
                loading: true
            }
        case ALL_CLIENT_FAIL:
            return {
                loading: false,
                clients: null,
                error: action.payload
            }
        default:
            return state
    }
}
export const clientReducer = (state = { client: {} }, action) => {
    switch (action.type) {
        case CLIENT_REQUEST:
        case LOAD_USER_REQUEST:
            return {
                loading: true,
                isAuthenticated: false
            }

        case CLIENT_SUCCESS:
        case LOAD_USER_SUCCESS:
            return {
                ...state,
                loading: false,
                isAuthenticated: true,
                client: action.payload
            }

        case CLIENT_FAIL:
            return {
                ...state,
                loading: false,
                client: null,
                isAuthenticated: false,
                error: action.payload
            }
        case CLEAR_ERRORS:
            return {
                ...state,
                error: null
            }
        case LOAD_USER_FAIL:
            return {
                loading: false,
                client: null,
                isAuthenticated: false,
                error: action.payload
            }
        default:
            return state;
    }
}