import React from 'react';
import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';

// import { startQuiz } from '../../../redux/quiz/quiz.actions';
import { selectQuizData } from '../../redux/quiz/quiz.selectors'

import StartQuizComponent from './startQuizComponent/startQuizComponent'
import QuestionComponent from './questionComponent/questionComponent'
import ResultsComponent from './resultsComponent/resultsComponent'

import './questionCard.css';

function QuestionContainer({quizData}) {
    const {quizStatus, questions, playerAnswers} = quizData;

    return (
        <div>
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


