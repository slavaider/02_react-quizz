import './Quiz.css'

import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizByID, onAnswerClickHandler, RetryQuiz} from "../../store/actions/quiz";

class Quiz extends Component {

    componentDidMount() {
        this.props.fetchQuizByID(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.props.RetryQuiz()
    }
    render() {
        return (
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading || !this.props.quiz ?
                            <Loader/>
                            : this.props.isFinished ?
                            <FinishedQuiz
                                results={this.props.results}
                                quiz={this.props.quiz}
                                OnRetry={this.props.RetryQuiz}
                            />
                            : <ActiveQuiz
                                state={this.props.answerState}
                                quizLength={this.props.quiz.length}
                                answerNumber={this.props.activeQuestion + 1}
                                onAnswerClick={this.props.onAnswerClickHandler}
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
        fetchQuizByID: (id) => dispatch(fetchQuizByID(id)),
        onAnswerClickHandler:(id)=>dispatch(onAnswerClickHandler(id)),
        RetryQuiz:()=>dispatch(RetryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
