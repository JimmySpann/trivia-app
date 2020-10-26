import React from 'react';
import {connect} from 'react-redux';
import {AllHtmlEntities} from 'html-entities'


import { startQuiz } from '../../../redux/quiz/quiz.actions';

import './startQuizContainer.css';

function StartQuizComponent ({startQuiz}) {
    //     const Entities = require('html-entities').XmlEntities;
    
    const entities = new AllHtmlEntities();
    console.log(entities)
 
// console.log(entities.encode('<>"\'&©®')); // &lt;&gt;&quot;&apos;&amp;©®
// console.log(entities.encodeNonUTF('<>"\'&©®')); // &lt;&gt;&quot;&apos;&amp;&#169;&#174;
// console.log(entities.encodeNonASCII('<>"\'&©®')); // <>"\'&©®
console.log(entities.decode('&lt;&gt;&quot;&apos;&amp;&copy;&reg;&#8710;'));

    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function handleStartQuiz() {

        //Sets form fields to values
        let category   = document.querySelector('#categories').value;
        let amount     = document.querySelector('#numOfQuestions').value;
        let difficulty = document.querySelector('#difficulty').value;

        //Constructs url for getting question data
        let url = `https://opentdb.com/api.php?`;
        url += `amount=${amount}`;
        url += (category !== "0") ? `&category=${category}` : "";
        url += (difficulty !== "0") ? `&difficulty=${difficulty}` : "";
        url += `&type=multiple`;

        //Retrieves question data, updates state, then starts QuestionComponent
        fetch(url)
        .then(response => response.json())
        .then(data => {
            //Restructures data to work in quiz game
            const questions = []
            for(let result of data.results) {
                const question = {choices: []}
                question.question = entities.decode(result.question);

                // question.choices = result.incorrect_answers;
                for(let answer of result.incorrect_answers) {
                    question.choices.push(entities.decode(answer))
                }
                question.choices.push(entities.decode(result.correct_answer));
                shuffleArray(question.choices);

                question.answer = question.choices.indexOf(entities.decode(result.correct_answer))
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
                <option value="0">Any</option>
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
                <input id="numOfQuestions" type="number" min="1" max="100" defaultValue="10"/>
            </div>

            <div>
                <label>difficulty</label>
                <select id="difficulty">
                    <option value="0">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
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

export default connect(
    null,
    mapDispatchToProps
)(StartQuizComponent);