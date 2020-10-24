import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { startQuiz } from '../../../redux/quiz/quiz.actions';
import { selectQuizData } from '../../redux/quiz/quiz.selectors'

import QuestionComponent from './questionComponent/questionComponent'
import StartQuizComponent from './startQuizComponent/startQuizComponent'

import './questionCard.css';

function QuestionContainer(quizData) {
    const {questions} = quizData
    console.log(quizData.quizData.questions)
    const quizStarted = false;
    // if (this.state.isConnecting) return null;

    // const playerAnswers = this.state.playerAnswers;

    return (

        <div>
        
            {quizStarted !== true && <StartQuizComponent /> }

            {quizStarted === true && <QuestionComponent questions={this.state.questions} /> }

        </div>              

    );
}

const mapStateToProps = createStructuredSelector({
    quizData: selectQuizData
});

export default connect(
    mapStateToProps,
    null
)(QuestionContainer);


