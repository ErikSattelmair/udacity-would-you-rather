import { ADD_QUESTION, RECEIVE_QUESTIONS, UPDATE_QUESTION_ANSWERS, REMOVE_QUESTION } from '../actions/questions'

export default function questions(state = {}, action) {
  	switch(action.type) {
        case RECEIVE_QUESTIONS: {
        	return {
        		...state, 
          		...action.questions
        	}
        }
    	case ADD_QUESTION: {
        	const { question } = action	
        
        	return {
        		...state,
              	[question.id]: question
            }
        }
      	case UPDATE_QUESTION_ANSWERS: {
        	const { userId, questionId, answer } = action
            
            return {
            	...state,
              	[questionId]: {
                	...state[questionId],
              		[answer]: {
                    	...state[questionId][answer],
                      	votes: state[questionId][answer].votes.concat([userId])
                    }
                }
            }
        }
      	case REMOVE_QUESTION:
        	const { questionId } = action
        	
        	const updatedQuestions = Object.keys(state).reduce((object, key) => {
				if (key !== questionId) {
                	object[key] = state[key]
				}
                    return object
			}, {})
            
            return {
            	...updatedQuestions
            }
      	default: return state
    }
}