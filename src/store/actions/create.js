import {CREATE_QUIZ_QUESTION, RESET_QUIZ} from "./actionTypes";
import axios from "../../axios/axios-quiz";

export function createQuizQuestion(payload) {
    return {
        type: CREATE_QUIZ_QUESTION,
        item:payload
    }
}

export function ResetQuiz() {
    return {
        type: RESET_QUIZ
    }
}

export function createQuiz() {
    return async (dispatch, getState) => {
        const state = getState()
        await axios.post('/quizes.json', state.create.quiz)
        dispatch(ResetQuiz())
    }
}
