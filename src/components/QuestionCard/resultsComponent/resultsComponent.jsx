import React from 'react';

import {connect} from 'react-redux';
import { newQuiz } from '../../../redux/quiz/quiz.actions';

import './resultsContainer.css';

function ResultsComponent ({questions, playerAnswers, newQuiz}) {  

    const total = questions.length;
    //Counts total of true answers the player has made
    const numOfTrueAns = playerAnswers.reduce((n, x) => n + (x === true), 0);
    //Restarts state, ends ResultComponent, and starts StartComponent
    function handleNewQuizButton() { newQuiz() }

  return (
        
    <div className="results-holder">
        <div className="results-briefing">
            You got {numOfTrueAns}/{total} right! <br/>
            Your score is {(numOfTrueAns/total)*100}%
        </div>

        <div className="restart-container">
            <button className="restart-button" onClick={handleNewQuizButton}>
                New Quiz
            </button>
        </div>

        <div className="results-container">
            {playerAnswers.map((isCorrect, index) => (
                <div key={index}>
                    <p>{index+1}: {isCorrect.toString()}</p>
                </div>
            ))} 
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