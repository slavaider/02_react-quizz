import React from 'react'
import './AnswerItem.css'

const AnswerItem = props => {
    const classes = ['AnswerItem']
    if (props.state) {
        classes.push(props.state)
    }
    return (
        <li
            onClick={() => {
                props.onAnswerClick(props.answer.id)
            }}
            className={classes.join(' ')}>
            {props.answer.text}
        </li>
    )
}
export default AnswerItem
