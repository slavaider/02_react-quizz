import React from 'react'
import './AnswersList.css'
import AnswerItem from './AnswerItem/AnswerItem'

const AnswersList = props => (
    <ul className={'AnswersList'}>
        {props.answers.map((answer, index) => (
            <AnswerItem
                state={props.state ? props.state[answer.id] : null}
                onAnswerClick={props.onAnswerClick}
                answer={answer}
                key={index}
            />
        ))}
    </ul>
)

export default AnswersList
