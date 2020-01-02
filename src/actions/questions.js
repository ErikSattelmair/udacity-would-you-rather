import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestion } from '../backend/_DATA'

export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'

function addQuestion(question) {
	return {
    	type: ADD_QUESTION,
      	question
    }
}

export function handleAddQuestion(optionOneText, optionTwoText) {
	return (dispatch, getState) => {
		const { authedUser } = getState()
  
      	dispatch(showLoading)

        return _saveQuestion({
        	author: authedUser,
           	optionOneText: optionOneText,
          	optionTwoText: optionTwoText
        }).then((question) => dispatch(addQuestion(question))).then(() => dispatch(hideLoading()))
    }
}

export function receiveQuestions(questions) {
	return {
    	type: RECEIVE_QUESTIONS,
      	questions
    }
}