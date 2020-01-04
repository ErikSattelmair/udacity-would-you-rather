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
      			<ListGroup>
                    {this.props.relevantQuestions.length === 0 ? (
                        <ListGroupItem>No entries to show</ListGroupItem>
                    ) : (
                      this.props.relevantQuestions.map((question) => {
                              return <ListGroupItem key={question.id}><Question questionId={question.id}/></ListGroupItem>
                          })
                    )}
				</ListGroup>
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

export default connect(mapStateToProps)(QuestionList)