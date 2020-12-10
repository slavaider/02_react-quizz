import React from 'react'
import './Select.css'

const Select = props => {
    const HtmlFor = `${props.label}-${Math.random()}`
    return (
        <div className={'Select'}>
            <label htmlFor={HtmlFor}>{props.label}</label>
            <select
                value={props.value}
                onChange={props.onChange}
                id={HtmlFor}>
                {props.options.map((option, index) => {
                    return (
                        <option
                            value={option.value}
                            key={option.value + index}
                        >
                            {option.text}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
export default Select
