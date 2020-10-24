import React from 'react';

import {connect} from 'react-redux';
// import { createStructuredSelector } from 'reselect';

import { startQuiz } from '../../../redux/quiz/quiz.actions';

import './startQuizContainer.css';

function StartQuizComponent ({startQuiz}) {  

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function handleStartQuiz() {
        fetch('https://opentdb.com/api.php?amount=10&category=20&type=multiple')
        .then(response => response.json())
        .then(data => {
            const questions = []
            for(let result of data.results) {
                const question = {}
                question.question = result.question;

                question.choices = result.incorrect_answers;
                question.choices.push(result.correct_answer);
                shuffleArray(question.choices);

                question.answer = question.choices.indexOf(result.correct_answer)
                questions.push(question);
            }
            startQuiz(questions);
        });
    }

    return (
      <div className="start-holder">
          
          <span>Trivia Game!</span>
          <span>(Clever name right?)</span>

          <div>
            <label>categories</label>
            <select id="categories">
                <option value="9">General Knowledge</option>
                <option value="10">Entertainment: Books</option>
                <option value="11">Entertainment: Film</option>
                <option value="12">Entertainment: Music</option>
                <option value="13">Entertainment: Musicals And Theatres</option>
                <option value="14">Entertainment: Television</option>
                <option value="15">Entertainment: Video Games</option>
                <option value="16">Entertainment: Board Games</option>
                <option value="17">Science and Nature</option>
                <option value="18">Science: Computers</option>
                <option value="19">Science: Mathmatics</option>
                <option value="20">Mythology</option>
                <option value="21">Sports</option>
                <option value="22">Geography</option>
                <option value="23">History</option>
                <option value="24">Politics</option>
                <option value="25">Art</option>
                <option value="26">Celebreties</option>
                <option value="27">Animals</option>
                <option value="28">Vehicles</option>
                <option value="29">Entertainment: Comics</option>
                <option value="30">Science: Gadgets</option>
                <option value="31">Entertainment: Japanese Anime and Manga</option>
                <option value="32">Entertainment: Cartoon And Animations</option>
            </select>
        </div>

          
          <div>
            <label>number of questions</label>
            <input type="number" min="1" max="100" defaultValue="10"/>
        </div>


          <div>
            <label>difficulty</label>
            <select id="difficulty">
                <option value="1">Any</option>
                <option value="2">Easy</option>
                <option value="3">Medium</option>
                <option value="4">Hard</option>
            </select>
        </div>

          <button onClick={handleStartQuiz}>
              Start Quiz
          </button>
      </div>
    );
}

const mapDispatchToProps = dispatch => ({
    startQuiz: questions => dispatch(startQuiz(questions))
});

// const mapStateToProps = createStructuredSelector({
//     itemCount: selectCartItemsCount
// });

export default connect(
    null,
    mapDispatchToProps
)(StartQuizComponent);