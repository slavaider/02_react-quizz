import React, {Component} from 'react';
import './Drawer.css'
import BackDrop from '../../UI/BackDrop/BackDrop'

const links = [1, 2, 3]

class Drawer extends Component {

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
                                    <a href={'https://google.com'}>{link}</a>
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
