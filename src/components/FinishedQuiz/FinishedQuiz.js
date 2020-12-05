import React from 'react'
import './FinishedQuiz.css'

const FinishedQuiz = () => {
    return (
        <div className='FinishedQuiz'>
            <ul>
                <li>
                    <strong>1. </strong>
                    How r u?
                    <i className={'fa fa-times error'}/>
                </li>
                <li>
                    <strong>1. </strong>
                    How r u?
                    <i className={'fa fa-check success'}/>
                </li>
            </ul>
            <p>Правильно 4 из 10</p>
            <div>
                <button>Повторить</button>
            </div>
        </div>
    )
}
export default FinishedQuiz
