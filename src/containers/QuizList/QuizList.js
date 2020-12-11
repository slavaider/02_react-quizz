import React, {Component} from 'react';
import './QuizList.css'
import {NavLink} from "react-router-dom";
import axios from '../../axios/axios-quiz'
import Loader from "../../components/UI/Loader/Loader";

class QuizList extends Component {
    state = {
        quiz: [],
        loading: true
    }

    renderQuizList() {
        return this.state.quiz.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    async componentDidMount() {
        try {
            const response = await axios.get('/quizes.json')
            const quiz = []
            Object.keys(response.data).forEach((key, index) => {
                quiz.push({
                    id: key,
                    name: `Тест №${index + 1}`
                })
            })
            this.setState({quiz, loading: false})
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className={'QuizList'}>
                <div>
                    <h1>Список тестов</h1>
                    {!this.state.loading ?
                        <ul>
                            {this.renderQuizList()}
                        </ul>
                        : <Loader/>
                    }
                </div>
            </div>
        );
    }
}

export default QuizList;
