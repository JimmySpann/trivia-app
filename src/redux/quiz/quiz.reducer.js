import QuizActionTypes from './quiz.types'

const INITIAL_STATE = {
    pause: false
};

const quizReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case QuizActionTypes.START_QUIZ:
            return {
                ...state,
                questions: action.payload,
                quizStatus: 'started'
            };
        case QuizActionTypes.FINISH_QUIZ:
            return {
                ...state,
                playerAnswers: action.payload.playerAnswers,
                quizStatus: 'finished'
            };
        case QuizActionTypes.NEW_QUIZ:
            return INITIAL_STATE;
        case QuizActionTypes.PAUSE_TIMER: {
            console.log("TEST")
            return {
                ...state,
                pause: true
            }}
        default:
            return state;
    }
}

export default quizReducer;