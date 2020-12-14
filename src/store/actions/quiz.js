import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION,
    QUIZ_RETRY,
    QUIZ_SET_STATE
} from "./actionTypes";

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

export function fetchQuizSuccess(payload) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz: payload
    }
}

export function QuizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState,
        results
    }
}

export function FinishQuiz() {
    return {
        type: FINISH_QUIZ
    }
}

export function QuizNextQuestion(activeQuestion) {
    return {
        type: QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}

export function RetryQuiz() {
    return {
        type: QUIZ_RETRY
    }
}

function quizFinished(state) {
    return state.activeQuestion + 1 === state.quiz.length
}

export function onAnswerClickHandler(payload) {
    return (dispatch, getState) => {
        const state = getState().quiz
        if (state.answerState) {
            const key = Object.keys(state.answerState)[0]
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const question = state.quiz[state.activeQuestion]
        const results = state.results
        if (question.rightAnswerId === payload) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            dispatch(QuizSetState({[payload]: 'success'}, results))
            const timeout = window.setTimeout(() => {
                if (quizFinished(state)) {
                    dispatch(FinishQuiz())
                } else {
                    dispatch(QuizNextQuestion(state.activeQuestion + 1))
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            dispatch(QuizSetState({[payload]: 'error'}, results))
        }
    }
}

