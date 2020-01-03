import { showLoading, hideLoading } from 'react-redux-loading'
import { _saveQuestionAnswer, _saveUser } from '../backend/_DATA'

export const RECEIVE_USERS = 'RECEIVE_USERS'
export const UPDATE_USER_ANSWERS = 'UPDATE_USER_ANSWERS'
export const ADD_USER = 'ADD_USER'

export function receiveUsers(users) {
    return {
        type: RECEIVE_USERS,
        users
    }
}

function updateUserAnswers(authedUserId, questionId, answer) {
	return {
    	type: UPDATE_USER_ANSWERS,
       	questionId: questionId,
        answer: answer,
        authedUser: authedUserId
    }
}

function addUser(user) {
	return {
    	type: ADD_USER,
      	user
    }
}

export function handleUpdateUserAnswer(questionId, answer) {
	return (dispatch, getState) => {
		const { authedUser } = getState()
  
      	dispatch(showLoading)
		dispatch(updateUserAnswers(authedUser, questionId, answer))
      
        return _saveQuestionAnswer({
        	authedUser: authedUser, 
          	qid: questionId,
          	answer: answer
        }).catch(() => dispatch(updateUserAnswers(questionId, null))).then(() => dispatch(hideLoading()))
    }
}

export function handleAddUser(username, name, avatar) {
	return (dispatch, getState) => {
		dispatch(showLoading)      	
      	
		return _saveUser(
        	username, 
          	name, 
          	avatar
        ).then((user) => dispatch(addUser(user)))
    }
}