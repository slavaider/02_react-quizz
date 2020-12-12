import {combineReducers} from "redux";
// Reducers
import {QuizReducer} from "./quiz";

export default combineReducers({quiz: QuizReducer})
