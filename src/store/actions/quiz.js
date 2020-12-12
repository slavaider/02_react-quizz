import axios from "../../axios/axios-quiz";
import {FETCH_QUIZ_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "./actionTypes";

export function fetchQuizes() {
    return async (dispatch) => {
        try {
            dispatch(fetchQuizesStart)
            const response = await axios.get('/quizes.json')
            const quiz = []
            Object.keys(response.data).forEach((key, index) => {
                quiz.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quiz))
        } catch (err) {
            dispatch(fetchQuizesError(err))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(payload) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: payload
    }
}

export function fetchQuizesError(payload) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: payload
    }
}

export function fetchQuizByID(payload) {
    return async (dispatch) => {
        try {
            dispatch(fetchQuizesStart())
                const response = await axios.get(`/quizes/${payload}.json`)
                const quiz = response.data
            dispatch(fetchQuizSuccess(quiz))
        } catch (err) {
            dispatch(fetchQuizesError(err))
        }
    }
}
export function fetchQuizSuccess(payload){
    return {
        type:FETCH_QUIZ_SUCCESS,
        quiz:payload
    }
}
