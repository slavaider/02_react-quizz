import React from 'react'
import './FinishedQuiz.css'
import Button from '../UI/Button/Button'

const FinishedQuiz = (props) => {
    const success_count = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total
    }, 0)
    return (
        <div className='FinishedQuiz'>

            {props.quiz.map((item, index) => {
                const cls = ['fa',
                    props.results[item.id] === 'error' ? 'fa-times' : 'fa-check',
                    props.results[item.id] + '_icon'
                ]
                return (
                    <li key={index}>
                        <strong>{index + 1}</strong>.&nbsp;
                        {item.question}&nbsp;
                        <i className={cls.join(' ')}/>
                    </li>
                )
            })}
            <p>Правильно {success_count} из {props.quiz.length}</p>
            <Button OnRetry={props.OnRetry} type={'primary'}>Повторить</Button>
            <Button type={'success'}>Перейти в список тестов</Button>
        </div>
    )
}
export default FinishedQuiz
