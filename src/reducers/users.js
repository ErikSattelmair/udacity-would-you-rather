import { RECEIVE_USERS, UPDATE_USER_ANSWERS } from '../actions/users'

export default function users(state = {}, action) {
	switch(action.type) {
   	case RECEIVE_USERS: 
		return {
            ...state,
            ...action.users
        }
    case UPDATE_USER_ANSWERS: 
        const { authedUser, questionId, answer } = action
        
        const currentAnswers = state[authedUser].answers
        const isAnswerPresentAlready = currentAnswers[questionId] !== undefined
        const updatedAnswers = !isAnswerPresentAlready ? Object.assign({currentAnswers}, {questionId: answer}) : currentAnswers
        
        return {
    		...state,
          	[authedUser]: {
              	...state[authedUser],
            	answers: updatedAnswers
            }
    	}
    default: return state 
    }
}