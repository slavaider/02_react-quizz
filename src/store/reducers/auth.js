import {AUTH_LOGOUT, AUTH_SUCCESS} from "../actions/actionTypes";

const InitialState = {}
export default function AuthReducer(state = InitialState, action) {
    switch (action.type) {
        case AUTH_SUCCESS:
            return{
                ...state,
                token: action.token,
            }
        case AUTH_LOGOUT:
            return{
                ...state,
                token: null,
            }
        default:
            return state
    }
}
