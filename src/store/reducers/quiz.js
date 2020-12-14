import {
    FETCH_QUIZ_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FINISH_QUIZ,
    QUIZ_NEXT_QUESTION, QUIZ_RETRY,
    QUIZ_SET_STATE
} from "../actions/actionTypes";

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

export default function QuizReducer(state = initialState, action) {
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
            return {
                ...state, quiz: action.quiz, loading: false
            }
        case QUIZ_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results,
            }
        case FINISH_QUIZ:
            return {
                ...state, isFinished: true,
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerState: null
            }
        case QUIZ_RETRY:{
            return{
                ...state,
                isFinished: false,
                activeQuestion: 0,
                answerState: null,
                results:{}
            }
        }

        default:
            return state
    }
}
