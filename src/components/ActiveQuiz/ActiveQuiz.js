import React from 'react';
import './ActiveQuiz.css'
import AnswersList from './AnswersList/AnswersList'

const ActiveQuiz = (props) => {
    return (
        <div className={'ActiveQuiz'}>
            <p className={'Question'}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
                <small>{props.answerNumber} из {props.quizLength}</small>
            </p>
            <AnswersList
                state={props.state}
                onAnswerClick={props.onAnswerClick}
                answers={props.answers}/>
        </div>
    )
}
export default ActiveQuiz
