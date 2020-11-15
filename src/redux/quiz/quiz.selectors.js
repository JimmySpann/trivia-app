import { createSelector } from 'reselect';

const selectQuiz = state => state.quiz;

export const selectQuizData = createSelector(
    [selectQuiz],
    quiz => quiz
);

export const selectPause = createSelector(
    [selectQuiz],
    quiz => quiz.pause
);