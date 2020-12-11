import './Quiz.css'

import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
    state = {
        results: {}, // {[id]:'success' || 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]:'success' || 'error'}
        quiz: [],
        loading: true
    }

    onAnswerClickHandler = (answer_id) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswerId === answer_id) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({answerState: {[answer_id]: 'success'}, results})
            const timeout = window.setTimeout(() => {
                if (this.quizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({activeQuestion: this.state.activeQuestion + 1, answerState: null})
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
        return this.state.activeQuestion + 1 === this.state.quiz.length
    }

    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
             this.setState({quiz, loading: false})
        } catch (err) {
            console.log(err)
        }
    }
    render() {
        return (
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.state.loading ? <Loader/>
                        : this.state.isFinished ? <FinishedQuiz
                                results={this.state.results}
                                quiz={this.state.quiz}
                                OnRetry={this.OnRetryHandler.bind(this)}
                            />
                            : <ActiveQuiz
                                state={this.state.answerState}
                                quizLength={this.state.quiz.length}
                                answerNumber={this.state.activeQuestion + 1}
                                onAnswerClick={this.onAnswerClickHandler}
                                question={this.state.quiz[this.state.activeQuestion].question}
                                answers={this.state.quiz[this.state.activeQuestion].answers}
                            />
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;
