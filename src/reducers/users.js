import { RECEIVE_USERS, UPDATE_USER_ANSWERS, ADD_USER, REMOVE_USER_ANSWER } from '../actions/users'

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
      case REMOVE_USER_ANSWER: {
		const { questionId } = action
        let newState = Object.assign({}, state)
        
        Object.values(state)
          	.filter((user) => Object.keys(user.answers).includes(questionId) || user.questions.includes(questionId))
          	.forEach((user) => {
                const updatedAnswers = Object.keys(user.answers).reduce((object, key) => {
                  if (key !== questionId) {
                    object[key] = newState[key]
                  }
                  return object
                }, {})

                const updatedQuestions = user.questions.filter((qid) => questionId !== qid)
          	
                newState = {
                    ...newState,
                  	[user.id]: {
                        ...newState[user.id],
                        answers: updatedAnswers,
                      	questions: updatedQuestions
                    }
                }
        })
        
        return newState
	  }
        
      default: return state 
    }
}