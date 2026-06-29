import React from 'react';
import { useState, useRef, useEffect } from 'react';

import { connect } from 'react-redux';
import { finishQuiz } from '../../../redux/quiz/quiz.actions';

import CountDownComponent from '../count-down/count-down'

import './questionContainer.css';

function QuestionComponent ({questions, finishQuiz}) {

    const [question, setQuestion] = useState(questions[0])
    const [questionsCompleted, setQuestionsCompleted] = useState(0)
    const [playerAnswers, setPlayerAnswers] = useState([])
    const [pauseTimer, setPauseTimer] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [overlayType, setOverlayType] = useState(''); // 'correct', 'wrong', 'timesup'
    const total = questions.length;

    const isChoiceCorrect = useRef();
    const timesUpElm = useRef();
    const hasPlayerChose = useRef(false);
  
    function handleFinished() {
        // console.log(hasPlayerChose, pauseTimer)
        timesUpElm.current.classList.remove("hide");
        setOverlayType('timesup');
        setShowOverlay(true);
        handleChoiceClick(null)
    } 

    //Clears all choice containers and makes them neutral again
    function restartChoices() {
        for(let i = 0; i < 4; i++) {
            //Could improve by finding rights and wrongs instead
            document.querySelector("#c-"+i).classList.remove("wrong");
            document.querySelector("#c-"+i).classList.remove("right");
            document.querySelector("#c-"+i).classList.add("neutral");
            document.querySelector(".answer-container").classList.add("hide");
        }
    }

    function handleChoiceClick(choice) {
        if(!hasPlayerChose.current) {

            hasPlayerChose.current = true;
            setPauseTimer(true)

            //Decide if answer is right or wrong, then record
            isChoiceCorrect.current = (choice === question.answer) ? true : false

            //Set overlay type based on answer
            if (choice === null) {
                setOverlayType('timesup');
            } else if (isChoiceCorrect.current) {
                setOverlayType('correct');
            } else {
                setOverlayType('wrong');
            }
            setShowOverlay(true);

            //Highlight correct choice in green
            document.querySelector("#c-"+question.answer).classList.remove("neutral");
            document.querySelector("#c-"+question.answer).classList.add("right");

            //Highlight choice as red if wrong
            if(choice !== question.answer && choice !== null){
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
    }

    function handleNextQ () {
        setPlayerAnswers([...playerAnswers, isChoiceCorrect.current]);
        setShowOverlay(false);

        if(questionsCompleted+1 !== total) { //Finishes Quiz
            //Updates state and resets choice containers
            setPauseTimer(false);
            setQuestion(questions[questionsCompleted+1])
            setQuestionsCompleted(questionsCompleted+1)
            restartChoices();

            timesUpElm.current.classList.add("hide");
            hasPlayerChose.current = false;
        }
    }

    function handleQuit() {
        setPlayerAnswers([...playerAnswers, isChoiceCorrect.current]);
        finishQuiz({playerAnswers});
    }

    //Finishes quiz is all questions are completed
    useEffect(() => {
        if(playerAnswers.length === questionsCompleted+1) {
            finishQuiz({playerAnswers}); 
        }  
    }, [questionsCompleted, finishQuiz, playerAnswers])
     


  return (
    <div className="question-holder">
        <div className="question-container">
            <span className="timesUp hide" ref={timesUpElm}>Times Up!</span>
            <span className="q-amount">
                Question: {questionsCompleted+1}/{total}
            </span>
            <br/> <br/>
            <CountDownComponent startValue={15}
                                size={.75}
                                start={true}
                                handleFinished={handleFinished}
                                pause={pauseTimer}
            />
            <br/> <br/>
            <div className="question-backdrop">
                <span className="question">{question.question}</span>
            </div>
        </div>

        <div className="choice-container">
            {question.choices.map((choice, index) => (
                <div id={"c-"+index} key={index}
                     className="choice-button neutral"
                     onClick={() => handleChoiceClick(index)}
                >
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

        {showOverlay && (
            <div className="overlay">
                <div className="overlay-content">
                    <h2 className="overlay-title">
                        {overlayType === 'correct' && 'Correct!'}
                        {overlayType === 'wrong' && 'Wrong!'}
                        {overlayType === 'timesup' && "Time's Up!"}
                    </h2>
                    <p className="overlay-answer">
                        <b>Answer: </b>
                        {question.choices[question.answer]}
                    </p>
                    <div className="overlay-buttons">
                        {questionsCompleted+1 < total ? (
                            <>
                                <button className="overlay-button next" onClick={handleNextQ}>
                                    Next
                                </button>
                                <button className="overlay-button quit" onClick={handleQuit}>
                                    Quit
                                </button>
                            </>
                        ) : (
                            <button className="overlay-button finish" onClick={handleNextQ}>
                                Finish
                            </button>
                        )}
                    </div>
                </div>
            </div>
        )}

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
