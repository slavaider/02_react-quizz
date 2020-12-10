import React, {Component} from 'react';
import './QuizCreator.css'
import Button from "../../components/UI/Button/Button";
import {CreateControl, Validate, ValidateForm} from '../../form/FormFramework'
import Input from "../../components/UI/Input/Input";
import Select from "../../components/UI/Select/Select";

function createOptionControl(number) {
    return CreateControl({
        label: `Вариант ${number}`,
        errorMessage: 'Значение не может быть пустым',
        id: number,
    }, {required: true})
}

function createFormControls() {
    return {
        question: CreateControl(
            {
                label: 'Введите вопрос',
                errorMessage: 'Вопрос не может быть пустым'
            }, {required: true}
        ),
        option1: createOptionControl(1),
        option2: createOptionControl(2),
        option3: createOptionControl(3),
        option4: createOptionControl(4),
    }
}

class QuizCreator extends Component {
    state = {
        quiz: [],
        isFormValid: false,
        formControls: createFormControls(),
        rightAnswerId: 1
    }
    SubmitHandler = event => {
        event.preventDefault()
    }
    addQuestionHandler = () => {
        const quiz = this.state.quiz.concat()
        const index = quiz.length + 1
        const {question, option1, option2, option3, option4} = this.state.formControls
        const questionItem = {
            question,
            id: index,
            rightAnswerId: this.state.rightAnswerId,
            answers: [
                {text: option1.value, id: option1.id},
                {text: option2.value, id: option2.id},
                {text: option3.value, id: option3.id},
                {text: option4.value, id: option4.id},
            ]
        }
        quiz.push(questionItem)
        this.setState({
            quiz,
            isFormValid: false,
            formControls: createFormControls(),
            rightAnswerId: 1
        })
    }
    createQuizHandler = (event) => {
        event.preventDefault()
        console.log(this.state.quiz)
    }
    onChangeHandler = (value, controlName) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[controlName]}
        control.touched = true
        control.value = value
        control.valid = Validate(control.value, control.validation)
        formControls[controlName] = control
        this.setState({isFormValid: ValidateForm(formControls), formControls})
    }
    selectChangeHandler = event => {
        this.setState({rightAnswerId: +event.target.value});
    }

    renderInputs() {
        return Object.keys(this.state.formControls).map((controlName, index) => {
            const control = this.state.formControls[controlName]
            return (
                <React.Fragment key={controlName + index}>
                    <Input
                        key={index}
                        label={control.label}
                        value={control.value}
                        valid={control.valid}
                        shouldValidate={!!control.validation}
                        touched={control.touched}
                        errorMessage={control.errorMessage}
                        onChange={event => this.onChangeHandler(event.target.value, controlName)}
                    />
                    {index === 0 ? <hr/> : null}
                </React.Fragment>
            )
        })
    }

    render() {
        return (
            <div className={'QuizCreator'}>
                <div>
                    <h1>Создание теста</h1>
                    <form onSubmit={this.SubmitHandler}>
                        {this.renderInputs()}
                        <Select
                            label={'Выберите правильный ответ'}
                            value={this.state.rightAnswerId}
                            onChange={this.selectChangeHandler}
                            options={[
                                {text: 1, value: 1},
                                {text: 2, value: 2},
                                {text: 3, value: 3},
                                {text: 4, value: 4},
                            ]}
                        />
                        <Button
                            disabled={!this.state.isFormValid}
                            type={'primary'}
                            onClick={this.addQuestionHandler}
                        >Добавить вопрос</Button>
                        <Button
                            disabled={this.state.quiz.length === 0}
                            type={'success'}
                            onClick={this.createQuizHandler}
                        >Создать тест</Button>
                    </form>
                </div>
            </div>
        );
    }
}

export default QuizCreator;
