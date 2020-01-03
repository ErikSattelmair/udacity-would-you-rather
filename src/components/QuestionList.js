import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import Question from './Question'

class QuestionList extends Component {
	render() {
      	if(this.props.showNotFoudPage) {
        	return <Redirect to={'/404'} />
        }
      	
    	return (
          	<div>
				<h3 className='text-center'>{this.props.answered ? 'Answered' : 'Unanswered'} Questions</h3>
          		<ListGroup flush>
					{this.props.relevantQuestions.map((question) => {
						return <ListGroupItem key={question.id}><Question questionId={question.id}/></ListGroupItem>
              		})}
            	</ListGroup>
      		</div>
        )
    }
}

function mapStateToProps({ questions, authedUser }, props) {
  	const { question_selector } = props.match.params
	const querySelectorValid = question_selector === 'answered' || question_selector === 'unanswered'
    
    if(!querySelectorValid) {
    	return {
        	showNotFoudPage: true
        }
    }
    
  	const answered = question_selector === 'answered'
	
    const relevantQuestions = Object.values(questions).filter((question) => {
    	const votedOnQuestion =  question.optionOne.votes.includes(authedUser) || question.optionTwo.votes.includes(authedUser)
      	
      	if(answered && votedOnQuestion) {
			return question
        }
      	
        if(!answered && !votedOnQuestion) {
        	return question
        }
    }).sort((questionOne, questionTwo) => {
    	return questionTwo.timestamp - questionOne.timestamp
    })
    
    return {
		relevantQuestions,
      	answered
    }
}

export default connect(mapStateToProps)(QuestionList)