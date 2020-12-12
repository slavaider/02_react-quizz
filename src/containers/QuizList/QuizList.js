import React, {Component} from 'react';
import './QuizList.css'
import {NavLink} from "react-router-dom";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizes} from "../../store/actions/quiz";

class QuizList extends Component {

    renderQuizList() {
        return this.props.quizes.map((quiz) => {
            return (
                <li key={quiz.id}>
                    <NavLink to={'/quiz/' + quiz.id}>{quiz.name}</NavLink>
                </li>
            )
        })
    }

    componentDidMount() {
        this.props.fetchQuizes()
    }

    render() {
        return (
            <div className={'QuizList'}>
                <div>
                    <h1>Список тестов</h1>
                    {!this.props.loading && this.props.quizes.length !== 0 ?
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

function wrapMapToProps(state) {
    return {
        quizes: state.quiz.quizes,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizes: () => dispatch(fetchQuizes())
    }
}

export default connect(wrapMapToProps, mapDispatchToProps)(QuizList);
