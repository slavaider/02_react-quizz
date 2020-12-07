import React from 'react'
import './MenuToggle.css'

const MenuToggle = (props) => {
    const cls = [
        'MenuToggle',
        'fa',
        props.isOpen ? 'fa-times open' : 'fa-bars'
    ]
    return (
            <i className={cls.join(' ')}
               onClick={props.onToggle}
            />
    )
}
export default MenuToggle
