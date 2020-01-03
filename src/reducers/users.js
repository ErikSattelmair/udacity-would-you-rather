import { RECEIVE_USERS, UPDATE_USER_ANSWERS, ADD_USER } from '../actions/users'

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
        const updatedAnswers = !isAnswerPresentAlready ? Object.assign({...currentAnswers}, {[questionId]: answer}) : currentAnswers
        
        return {
    		...state,
          	[authedUser]: {
              	...state[authedUser],
            	answers: updatedAnswers
            }
    	}
      case ADD_USER:
        const { user } = action
        
        return {
        	...state,
          	[user.id]: user
        }
        
    default: return state 
    }
}