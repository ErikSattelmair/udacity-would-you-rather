import { ADD_QUESTION, RECEIVE_QUESTIONS, UPDATE_QUESTION_ANSWERS } from '../actions/questions'

export default function questions(state = {}, action) {
  	switch(action.type) {
        case RECEIVE_QUESTIONS:
        	return {
        		...state, 
          		...action.questions
        	}
    	case ADD_QUESTION: 
        	const { question } = action	
        
        	return {
        		...state,
              	[question.id]: question
            }
      	case UPDATE_QUESTION_ANSWERS:
        	const { userId, questionId, answer } = action
            
            const res = {
            	...state,
              	[questionId]: {
                	...state[questionId],
              		[answer]: {
                    	...state[questionId][answer],
                      	votes: state[questionId][answer].votes.concat([userId])
                    }
                }
            }
            
            console.log(res)
        	return res
        
      	default: return state
    }
}