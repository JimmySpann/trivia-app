import React from 'react';
import { useState } from 'react';

import {connect} from 'react-redux';

import { finishQuiz } from '../../../redux/quiz/quiz.actions';

import './questionContainer.css';

function QuestionComponent ({questions, finishQuiz}) {  

    const [question, setQuestion] = useState(questions[0])
    const [questionsCompleted, setQuestionsCompleted] = useState(0)
    const [playerAnswers, setPlayerAnswers] = useState([])
    const total = questions.length;


    //Clears all choice containers and makes them neutral again
    function restartChoices() {
        for(let i = 0; i < 4; i++) {
            //Could improve by finding rights and wrongs instead
            document.querySelector("#c-"+i).classList.remove("wrong");
            document.querySelector("#c-"+i).classList.remove("right");
            document.querySelector("#c-"+i).classList.add("neutral");
        }
    }

    const handleQuestionClick = (choice) => {
        const ans = question.answer
        
        //Decide if answer is right or wrong, then record
        const isChoiceCorrect = (choice === ans) ? true : false
        setPlayerAnswers([...playerAnswers, isChoiceCorrect]);


        //Highlight correct choice in green
        document.querySelector("#c-"+ans).classList.remove("neutral");
        document.querySelector("#c-"+ans).classList.add("right");
        
        //Highlight choice as red if wrong
        if(choice !== ans){
            document.querySelector("#c-"+choice).classList.remove("neutral");
            document.querySelector("#c-"+choice).classList.add("wrong");
        }

        //Show answer text and Next Button
        document.querySelector(".answer-container").classList.remove("hide");

        //Change Next button to Finished button
        if(questionsCompleted+1 === total) {
            document.querySelector(".next-button").innerHTML = "Finished";
        }

    }

    const handleNextQ = () => {            
        if(questionsCompleted+1 === total) { //Finishes Quiz
            //Updates redux. Ends this component
            finishQuiz({playerAnswers});
        } else {
            //Updates state and resets choice containers
            setQuestion(questions[questionsCompleted+1])
            setQuestionsCompleted(questionsCompleted+1)
            restartChoices();
        }
    }

  return (
    <div className="question-holder">
        <div className="question-container">
            <span className="q-amount">
                Question: {questionsCompleted+1}/{total}
            </span>
            <br/>    
            <br/>    
            <span className="question">{question.question}</span>
            <br/>
            <br/>    
        </div>

        <div className="choice-container">
            {question.choices.map((choice, index) => (
                <div id={"c-"+index} key={index} 
                     className="choice-button neutral" 
                     onClick={() => handleQuestionClick(index)
                }>
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
  );
}

const mapDispatchToProps = dispatch => ({
    finishQuiz: payload => dispatch(finishQuiz(payload))
});

export default connect(
    null,
    mapDispatchToProps
)(QuestionComponent);
