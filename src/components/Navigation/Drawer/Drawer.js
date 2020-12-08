import React, {Component} from 'react';
import './Drawer.css'
import BackDrop from '../../UI/BackDrop/BackDrop'
import {NavLink} from 'react-router-dom'

const links = [
    {to: '/', label: 'Список', exact: true},
    {to: '/auth', label: 'Авторизация', exact: false},
    {to: '/quiz-creator', label: 'Создать тест', exact: false},
]

class Drawer extends Component {
    clickHandler = () => {
        this.props.onClose()
    }

    render() {
        const cls = [
            'Drawer',
            !this.props.isOpen ? 'close' : null
        ]
        return (
            <React.Fragment>
                <nav className={cls.join(' ')}>
                    <ul>
                        {links.map((link, index) => {
                            return (
                                <li key={index}>
                                    <NavLink to={link.to}
                                             exact={link.exact}
                                             onClick={this.clickHandler}
                                    >
                                        {link.label}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </nav>
                {this.props.isOpen ? <BackDrop onClick={this.props.onClose}/> : null}

            </React.Fragment>
        );
    }
}

export default Drawer;
