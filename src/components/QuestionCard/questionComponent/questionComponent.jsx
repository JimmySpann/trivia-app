import React from 'react';
import { useState } from 'react';

import './questionContainer.css';

function QuestionComponent (props) {
    const {questions} = props;   

    const [question, setQuestion] = useState(questions[0])
    const [questionsCompleted, setQuestionsCompleted] = useState(0)
    const [playerAnswers, setPlayerAnswers] = useState([])
    const total = questions.length;


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
        
        let updateArr = playerAnswers
        if(index === ans) {
            updateArr.push(true)
        } else {
            updateArr.push(false)
        }
        setPlayerAnswers(updateArr);


        if(index !== ans){
            document.querySelector("#c-"+index).classList.remove("neutral");
            document.querySelector("#c-"+index).classList.add("wrong");
        }

        document.querySelector(".answer-container").classList.remove("hide");

        if(questionsCompleted+1 === total) {
            document.querySelector(".next-button").innerHTML = "Finished";
        }

    }

    const handleNextQ = () => {            
        if(questionsCompleted+1 === total) {
            document.querySelector(".question-holder").classList.add("hide");
            // numOfTrueAns = playerAnswers.reduce((n, x) => n + (x === true), 0);
        } else {
            setQuestion(questions[questionsCompleted+1])
            setQuestionsCompleted(questionsCompleted+1)
            console.log(questionsCompleted, question)
            restartChoices();
            document.querySelector(".answer-container").classList.add("hide");
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
  );
}

export default QuestionComponent;
