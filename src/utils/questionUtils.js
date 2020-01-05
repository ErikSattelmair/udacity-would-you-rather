export function getRelevantQuestionsByCategory(questions, category, authedUser) {
	const answered = category === 'answered'
    
  	return Object.values(questions).filter((question) => {
    	const votedOnQuestion =  question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
        
      	if(answered && votedOnQuestion) {
			return question
        }
      	
        if(!answered && !votedOnQuestion) {
        	return question
        }
      	
      	return null
	}).sort((questionOne, questionTwo) => {
    	return questionTwo.timestamp - questionOne.timestamp
	})

}