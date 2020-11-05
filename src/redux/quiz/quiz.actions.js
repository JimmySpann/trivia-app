import QuizActionTypes from './quiz.types';

function newAction(type) {
    return (payload) => ({ 
        type: QuizActionTypes[type],
        payload: payload
     })
}

export const startQuiz = newAction("START_QUIZ");
export const finishQuiz = newAction("FINISH_QUIZ");
export const newQuiz = newAction("NEW_QUIZ");