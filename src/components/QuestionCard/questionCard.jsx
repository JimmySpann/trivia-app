import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { startQuiz } from '../../../redux/quiz/quiz.actions';
import { selectQuizData } from '../../redux/quiz/quiz.selectors'

import QuestionComponent from './questionComponent/questionComponent'
import StartQuizComponent from './startQuizComponent/startQuizComponent'

import './questionCard.css';

function QuestionContainer({quizData}) {
    const {quizStatus, questions} = quizData;

    return (

        <div>
        
            {!quizStatus && <StartQuizComponent /> }

            {quizStatus === "started" && <QuestionComponent questions={questions} /> }

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


