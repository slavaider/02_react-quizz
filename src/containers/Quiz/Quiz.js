import './Quiz.css'

import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        results: {}, // {[id]:'success' || 'error'}
        isFinished: false,
        activeQuestion: 0,
        answerState: null, // {[id]:'success' || 'error'}
        Quiz: [
            {
                question: 'Какого цвета небо?',
                rightAnswer: 2,
                id: 1,
                answers: [
                    {text: 'Чёрный', id: 1},
                    {text: 'Синий', id: 2},
                    {text: 'Красный', id: 3},
                    {text: 'Зелёный', id: 4},
                ]
            },
            {
                question: 'В каком году основали Санкт-Петербург?',
                rightAnswer: 3,
                id: 2,
                answers: [
                    {text: '1700', id: 1},
                    {text: '1702', id: 2},
                    {text: '1703', id: 3},
                    {text: '1802', id: 4},
                ]
            }
        ]
    }

    onAnswerClickHandler = (answer_id) => {
        if (this.state.answerState) {
            const key = Object.keys(this.state.answerState)[0]
            if (this.state.answerState[key] === 'success') {
                return
            }
        }
        const question = this.state.Quiz[this.state.activeQuestion]
        const results = this.state.results
        if (question.rightAnswer === answer_id) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            this.setState({answerState: {[answer_id]: 'success'}, results})
            const timeout = window.setTimeout(() => {
                if (this.QuizFinished()) {
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

    QuizFinished() {
        return this.state.activeQuestion + 1 === this.state.Quiz.length
    }

    render() {
        // console.log(this.props.match.params.id)
        return (
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.state.isFinished ?
                        <FinishedQuiz
                            results={this.state.results}
                            quiz={this.state.Quiz}
                            OnRetry={this.OnRetryHandler.bind(this)}
                        /> :
                        <ActiveQuiz
                            state={this.state.answerState}
                            quizLength={this.state.Quiz.length}
                            answerNumber={this.state.activeQuestion + 1}
                            onAnswerClick={this.onAnswerClickHandler}
                            question={this.state.Quiz[this.state.activeQuestion].question}
                            answers={this.state.Quiz[this.state.activeQuestion].answers}/>
                    }
                </div>
            </div>
        );
    }
}

export default Quiz;
