import QuizActionTypes from './quiz.types';

export const startQuiz = questions => ({
    type: QuizActionTypes.START_QUIZ,
    payload: questions
});