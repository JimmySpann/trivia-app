import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

import StartQuizComponent from './startQuizComponent/startQuizComponent'
import QuestionComponent from './questionComponent/questionComponent'
import ResultsComponent from './resultsComponent/resultsComponent'

import { selectQuizData } from '../../redux/quiz/quiz.selectors'

import './questionCard.css';

function QuestionContainer({quizData}) {
    const {quizStatus, questions, playerAnswers} = quizData;

    return (
        <div>
            {/* Neat way of conditionally switching components */}
            {!quizStatus && <StartQuizComponent /> }
            {quizStatus === "started" && <QuestionComponent questions={questions} /> }
            {quizStatus === "finished" && <ResultsComponent questions={questions} playerAnswers={playerAnswers} /> }
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


