import React from 'react';

import {connect} from 'react-redux';
import { newQuiz } from '../../../redux/quiz/quiz.actions';

import './resultsContainer.css';

function ResultsComponent ({questions, playerAnswers, playerChoices, timeUpStatus, newQuiz}) {

    const total = questions.length;
    //Counts total of true answers the player has made
    const numOfTrueAns = playerAnswers.reduce((n, x) => n + (x === true), 0);
    const scorePercentage = Math.round((numOfTrueAns/total)*100);
    //Restarts state, ends ResultComponent, and starts StartComponent
    function handleNewQuizButton() { newQuiz() }

  return (

    <div className="results-holder">
        <div className="results-header">
            <div className="score-display">
                {numOfTrueAns}/{total}
            </div>
            <div className="score-label">
                Your score is {scorePercentage}%
            </div>
        </div>

        <div className="results-container">
            {questions.map((question, index) => {
                const isCorrect = playerAnswers[index];
                const playerChoice = playerChoices && playerChoices[index] !== undefined ? playerChoices[index] : null;
                const isTimeUp = timeUpStatus && timeUpStatus[index] !== undefined ? timeUpStatus[index] : false;
                const playerAnswerText = playerChoice !== null ? question.choices[playerChoice] : 'No answer';

                return (
                    <div key={index} className={`question-card ${isCorrect ? 'correct' : 'wrong'}`}>
                        <div className="question-number">
                            Question {index + 1}
                        </div>
                        <div className="question-text">
                            {question.question}
                        </div>
                        {isTimeUp ? (
                            <div className="answer-display">
                                <span className="answer-label">Status: </span>
                                <span className="answer-wrong">Time's Up!</span>
                            </div>
                        ) : (
                            <div className="answer-display">
                                <span className="answer-label">You chose: </span>
                                <span className={isCorrect ? 'answer-correct' : 'answer-wrong'}>
                                    {playerAnswerText}
                                </span>
                            </div>
                        )}
                        {!isCorrect && (
                            <div className="answer-display">
                                <span className="answer-label">Correct answer: </span>
                                <span className="answer-correct">
                                    {question.choices[question.answer]}
                                </span>
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        <div className="restart-container">
            <button className="restart-button" onClick={handleNewQuizButton}>
                New Quiz
            </button>
        </div>
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
    newQuiz: payload => dispatch(newQuiz(payload))
});

export default connect(
    null,
    mapDispatchToProps
)(ResultsComponent);