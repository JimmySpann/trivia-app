import React from 'react';

import {connect} from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { startQuiz } from '../../../redux/quiz/quiz.actions';

// import { toggleCartHidden } from '../../redux/cart/cart.actions';
// import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './resultsContainer.css';

function ResultsComponent () {  

    let playerAnswers;

  return (
        
        <div className="results-holder hide">
            <div className="results-briefing">
                You got {this.state.numOfTrueAns}/{this.state.total} right! <br/>
                Your score is {(this.state.numOfTrueAns/this.state.total)*100}%
            </div>

            <div className="results-container">
                {playerAnswers.map((isCorrect, index) => (
                    <div>
                        <p>{index+1}: {isCorrect.toString()}</p>
                    </div>
                ))} 
            </div>

            <div className="restart-container">
                <button className="restart-button">
                    New Quiz
                </button>
            </div>
        </div>
  );
}

const mapDispatchToProps = dispatch => ({
    toggleCartHidden: (questions) => dispatch(startQuiz(questions))
});

// const mapStateToProps = createStructuredSelector({
//     itemCount: selectCartItemsCount
// });

export default connect(
    // mapStateToProps,
    mapDispatchToProps
)(ResultsComponent);