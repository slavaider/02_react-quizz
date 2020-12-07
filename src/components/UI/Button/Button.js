import React from 'react'
import './Button.css'
const Button = (props) => {
    const cls = [
        'Button',
        props.type
    ]
    return (
        <React.Fragment>
            <button className={cls.join(' ')}
                    onClick={props.OnRetry}
                    disabled={props.disabled}
            >
                {props.children}</button>
        </React.Fragment>
    )
}
export default Button
