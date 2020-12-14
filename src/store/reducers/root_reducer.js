import {combineReducers} from "redux";
// Reducers
import QuizReducer from "./quiz";
import CreateReducer from "./create"
import AuthReducer from './auth'
export default combineReducers({quiz: QuizReducer,create:CreateReducer,auth:AuthReducer})
