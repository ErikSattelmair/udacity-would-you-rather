import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestion, _removeQuestion } from '../backend/_DATA'

export const ADD_QUESTION = 'ADD_QUESTION'
export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS'
export const UPDATE_QUESTION_ANSWERS = 'UPDATE_QUESTION_ANSWERS'
export const REMOVE_QUESTION = 'REMOVE_QUESTION'

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

export function updateQuestionAnswers(userId, questionId, answer) {
	return {
    	type: UPDATE_QUESTION_ANSWERS,
      	questionId,
      	userId,
      	answer
    }
}

export function handleRemoveQuestion(questionId) {
	return (dispatch, getState) => {
  		const { authedUser } = getState()

      	dispatch(showLoading)

        return _removeQuestion(
        	authedUser,
          	questionId
        ).then(() => dispatch(removeQuestion(questionId))).then(() => dispatch(hideLoading()))
    }
}

function removeQuestion(questionId) {
	return {
    	type: REMOVE_QUESTION,
      	questionId
    }
}