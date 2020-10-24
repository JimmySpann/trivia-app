import QuizActionTypes from './quiz.types'

const INITIAL_STATE = {
    quizStarted: false
};

const quizReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case QuizActionTypes.START_QUIZ:
            return {
                ...state,
                questions: action.payload,
                isQuizStarted: true
            };
        default:
            return state;
    }
}

export default quizReducer;