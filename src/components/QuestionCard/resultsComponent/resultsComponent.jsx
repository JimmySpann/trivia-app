import React from 'react';

import {connect} from 'react-redux';
import { newQuiz } from '../../../redux/quiz/quiz.actions';

// import { toggleCartHidden } from '../../redux/cart/cart.actions';
// import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './resultsContainer.css';

function ResultsComponent ({questions, playerAnswers, newQuiz}) {  

    const total = questions.length;
    const numOfTrueAns = playerAnswers.reduce((n, x) => n + (x === true), 0);
    console.log(newQuiz)
    function handleNewQuizButton() {
        newQuiz('?');
    }

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