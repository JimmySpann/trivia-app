import React from 'react';
import {sampleData} from '../../sampleData.js'

import './questionCard.css';

class QuestionContainer extends React.Component {

    state = {
        isConnecting: true
    }
    
    /* Randomize array in-place using Durstenfeld shuffle algorithm */
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    componentDidMount() {
        fetch('https://opentdb.com/api.php?amount=10&category=20&type=multiple')
        .then(response => response.json())
        .then(data => {
            const questions = []
            for(let result of data.results) {
                const question = {}
                question.question = result.question;

                question.choices = result.incorrect_answers;
                question.choices.push(result.correct_answer);
                this.shuffleArray(question.choices);

                question.answer = question.choices.indexOf(result.correct_answer)
                questions.push(question);
            }
            this.setState({
                currentQuestion: questions[0],
                questions: questions, 
                total: questions.length, 
                questionsCompleted: 0,
                playerAnswers: [],
                numOfTrueAns: 0,
                isConnecting: false
            });
        });
    }

    render () {

        if (this.state.isConnecting) return null;

        const question = this.state.currentQuestion;
        const playerAnswers = this.state.playerAnswers;

        function restartChoices() {
            for(let i = 0; i < 4; i++) {
                document.querySelector("#c-"+i).classList.remove("wrong");
                document.querySelector("#c-"+i).classList.remove("right");
                document.querySelector("#c-"+i).classList.add("neutral");
            }
        }

        const handleQuestionClick = (index) => {
            const ans = question.answer
            document.querySelector("#c-"+ans).classList.remove("neutral");
            document.querySelector("#c-"+ans).classList.add("right");

            let updatedArray = this.state.playerAnswers            
            if(index === ans) {
                updatedArray.push(true)
            } else {
                updatedArray.push(false)
            }

            this.setState({ playerAnswers: updatedArray});
            console.log(this.state.playerAnswers);

            if(index !== ans){
                document.querySelector("#c-"+index).classList.remove("neutral");
                document.querySelector("#c-"+index).classList.add("wrong");
            }

            document.querySelector(".answer-container").classList.remove("hide");

            if(this.state.questionsCompleted+1 === this.state.questions.length) {
                document.querySelector(".next-button").innerHTML = "Finished";
            }

        }

        const handleNextQ = () => {            
            if(this.state.questionsCompleted+1 === this.state.questions.length) {
                document.querySelector(".question-holder").classList.add("hide");
                let numOfTrueAns = this.state.playerAnswers.reduce((n, x) => n + (x === true), 0);
                this.setState({numOfTrueAns});
            } else {
                this.setState({
                    currentQuestion: this.state.questions[this.state.questionsCompleted+1],
                    questionsCompleted: this.state.questionsCompleted+1 
                })
                restartChoices();
                document.querySelector(".answer-container").classList.add("hide");
            }
            

        }

        return (

            <div>
            
                <div className="start-holder">
                    
                    <h2>Trivia Game!</h2>
                    <h3>(Clever name right?)</h3>

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

                    <button>
                        Start Quiz
                    </button>
                </div>

                <div className="question-holder hide">
                    <div className="question-container">
                        <span className="q-amount">
                            Question: {this.state.questionsCompleted+1}/{this.state.total}
                        </span>
                        <br/>    
                        <br/>    
                        <span className="question">{question.question}</span>
                        <br/>
                        <br/>    
                    </div>

                    <div className="choice-container">
                        {question.choices.map((choice, index) => (
                            <div id={"c-"+index} key={index} className="choice-button neutral" 
                                 onClick={() => handleQuestionClick(index)}>
                                {choice} 
                            </div>
                        ))} 
                        <br/>
                    </div>

                    <div className="answer-container hide">
                        <button className="next-button" onClick={handleNextQ}>
                            Next
                        </button>
                        <b>Answer: </b>
                        {question.choices[question.answer]}
                    </div>
                </div>

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

            </div>              

        );
    }
}

export default QuestionContainer;


