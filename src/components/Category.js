import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionList from './QuestionList'

class Category extends Component {
	render() {
      	if(this.props.showNotFoudPage) {
        	return <Redirect to={'/404'} />
        }
        
		const headingText =  (this.props.answered ? 'Answered' : 'Unanswered') + ' Questions'

		return (
        	<div>
				<h3 className='text-center'>{ headingText }</h3>
      			<QuestionList relevantQuestions={this.props.relevantQuestions} questionCategory={headingText} />
      		</div>
      )
	}
}
  
function mapStateToProps({ questions, authedUser }, props) {
  	const category = props.category !== undefined ? props.category : props.match.params.category
	const categoryValid = category === 'answered' || category === 'unanswered'
    
    if(!categoryValid) {
    	return {
        	showNotFoudPage: true
        }
    }
    
  	const answered = category === 'answered'
	
    const relevantQuestions = Object.values(questions).filter((question) => {
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
    
    return {
		relevantQuestions,
      	answered
    }
}

export default connect(mapStateToProps)(Category)