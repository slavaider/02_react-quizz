import './Quiz.css'

import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizByID} from "../../store/actions/quiz";

class Quiz extends Component {

    onAnswerClickHandler = (answer_id) => {
        if (this.props.answerState) {
            const key = Object.keys(this.props.answerState)[0]
            if (this.props.answerState[key] === 'success') {
                return
            }
        }
        const question = this.props.quiz[this.props.activeQuestion]
        const results = this.props.results
        if (question.rightAnswerId === answer_id) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({answerState: {[answer_id]: 'success'}, results})
            const timeout = window.setTimeout(() => {
                if (this.quizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({activeQuestion: this.props.activeQuestion + 1, answerState: null})
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error'
            this.setState({answerState: {[answer_id]: 'error', results}})
        }

    }

    OnRetryHandler() {
        this.setState({
            isFinished: false,
            activeQuestion: 0,
            answerState: null,
            question: {}
        })
    }

    quizFinished() {
        return this.props.activeQuestion + 1 === this.props.quiz.length
    }

    componentDidMount() {
        this.props.fetchQuizByID(this.props.match.params.id)
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading || !this.props.quiz ?
                            <Loader/>
                            : this.props.isFinished ? <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                OnRetry={this.OnRetryHandler.bind(this)}
                            />
                            : <ActiveQuiz
                                state={this.props.answerState}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                onAnswerClick={this.onAnswerClickHandler}
                                question={this.props.quiz[this.props.activeQuestion].question}
                                answers={this.props.quiz[this.props.activeQuestion].answers}
                            />
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quiz.results,
        isFinished: state.quiz.isFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizByID: (id) => dispatch(fetchQuizByID(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
