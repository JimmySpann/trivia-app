import QuizActionTypes from './quiz.types';

export const startQuiz = questions => ({
    type: QuizActionTypes.START_QUIZ,
    payload: questions
});

export const finishQuiz = payload => ({
    type: QuizActionTypes.START_QUIZ,
    payload: payload
});