import {FETCH_QUIZ_SUCCESS, FETCH_QUIZES_ERROR, FETCH_QUIZES_START, FETCH_QUIZES_SUCCESS} from "../actions/actionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {}, // {[id]:'success' || 'error'}
    isFinished: false,
    activeQuestion: 0,
    answerState: null, // {[id]:'success' || 'error'}
    quiz: null,
}

export function QuizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, quizes: action.quizes, loading: false
            }
        case FETCH_QUIZES_ERROR:
            console.log(action.error)
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return{
                ...state,quiz:action.quiz,loading: false
            }
        default:
            return state
    }
}
