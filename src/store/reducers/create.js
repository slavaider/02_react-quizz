import {CREATE_QUIZ_QUESTION, RESET_QUIZ} from "../actions/actionTypes";

const InitialState = {
    quiz: []
}
export default function CreateReducer(state = InitialState, action) {
    switch (action.type) {
        case CREATE_QUIZ_QUESTION:
            return {
                ...state,
                quiz: [...state.quiz, action.item]
            }
        case RESET_QUIZ:
            return {
                ...state,
                quiz: []
            }
        default:
            return state
    }
}
