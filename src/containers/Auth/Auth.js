import React, {Component} from 'react';
import './Auth.css'
import Button from '../../components/UI/Button/Button'
import Input from "../../components/UI/Input/Input";
import axios from 'axios'

function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFormValid: false,
            formControls: {
                email: {
                    value: '',
                    type: 'email',
                    label: 'Email',
                    errorMessage: 'Введите корректный e-mail',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        email: true
                    }
                },
                password: {
                    value: '',
                    type: 'password',
                    label: 'Password',
                    errorMessage: 'Введите корректный пароль',
                    valid: false,
                    touched: false,
                    validation: {
                        required: true,
                        minLength: 6
                    }
                }
            }
        }
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true
        if (validation.required) {
            isValid = value.trim() !== '' && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        if (validation.email) {
            isValid = validateEmail(value) && isValid
        }

        return isValid
    }

    onChangeHandler = (event, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.value = event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)
        formControls[controlName] = control
        let isFormValid = true
        Object.keys(formControls).forEach(name => {
            isFormValid = formControls[name].valid && isFormValid
        })
        this.setState({isFormValid, formControls})
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <Input
                    key={controlName + index}
                    type={control.type}
                    value={control.value}
                    valid={control.valid}
                    touched={control.touched}
                    label={control.label}
                    errorMessage={control.errorMessage}
                    shouldValidate={!!control.validation}
                    onChange={event => this.onChangeHandler(event, controlName)}
                />
            )
        })
    }

    loginHandler = async() => {
        try {
            const authData = {
                email: this.state.formControls.email.value,
                password: this.state.formControls.password.value,
                returnSecureToken: true
            }
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCBHVsRBdkm-Pvkum9G-8ctJDI9HN798_Q', authData)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    registrationHandler = async () => {
        try {
            const authData = {
                email: this.state.formControls.email.value,
                password: this.state.formControls.password.value,
                returnSecureToken: true
            }
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCBHVsRBdkm-Pvkum9G-8ctJDI9HN798_Q', authData)
            console.log(response.data)
        } catch (err) {
            console.log(err)
        }
    }
    submitHandler = (event) => {
        event.preventDefault()
    }

    render() {
        return (
            <div className={'Auth'}>
                <div>
                    <h1>Авторизация</h1>
                    <form className={'AuthForm'} onSubmit={this.submitHandler}>
                        {this.renderInputs()}
                        <Button
                            type="success"
                            onClick={this.loginHandler}
                            disabled={!this.state.isFormValid}
                        >Войти</Button>
                        <Button
                            type="primary"
                            onClick={this.registrationHandler}
                            disabled={!this.state.isFormValid}
                        >Зарегистрироваться</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default Auth;
