import React, {Component} from 'react';
import './Layout.css'
import MenuToggle from '../../components/Navigation/MenuToggle/MenuToggle'
import Drawer from '../../components/Navigation/Drawer/Drawer'
import {connect} from "react-redux";

class Layout extends Component {
    state = {
        menu: false
    }
    toggleMenuHandler = () => {
        this.setState({menu: !this.state.menu})
    }
    MenuCloseHandler = () => {
        this.setState({menu: false})
    }

    render() {
        return (
            <div className={'Layout'}>
                <Drawer
                    isOpen={this.state.menu}
                    onClose={this.MenuCloseHandler}
                    isAuth={this.props.isAuth}
                />
                <MenuToggle
                    onToggle={this.toggleMenuHandler}
                    isOpen={this.state.menu}
                />
                <main>{this.props.children}</main>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        isAuth:!!state.auth.token
    }
}

export default connect(mapStateToProps)(Layout);
