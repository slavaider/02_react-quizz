import './Quiz.css'

import React, {Component} from 'react';
import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz'
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz'

class Quiz extends Component {
    state = {
        isFinished: true,
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
        if (question.rightAnswer === answer_id) {
            this.setState({answerState: {[answer_id]: 'success'}})
            const timeout = window.setTimeout(() => {
                if (this.QuizFinished()) {
                    this.setState({isFinished: true})
                } else {
                    this.setState({activeQuestion: this.state.activeQuestion + 1, answerState: null})
                }
                window.clearTimeout(timeout)
            }, 1000)
        } else {
            this.setState({answerState: {[answer_id]: 'error'}})
        }

    }

    QuizFinished() {
        return this.state.activeQuestion + 1 === this.state.Quiz.length
    }

    render() {
        return (
            <div className={'Quiz'}>
                <div className={'QuizWrapper'}>
                    <h1>Ответьте на все вопросы</h1>
                    {this.state.isFinished ?
                        <FinishedQuiz

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
