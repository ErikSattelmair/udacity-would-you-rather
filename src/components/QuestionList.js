import React, { Component } from 'react'
import { connect } from 'react-redux'
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom'
import Question from './Question'

class QuestionList extends Component {
	render() {
    	return (
          	<div>
				<h3 className='text-center'>{this.props.answered ? 'Answered' : 'Unanswered'} Questions</h3>
          		<ListGroup flush>
					{this.props.relevantQuestions.map((question) => {
                      	const questionId = question.id
                      
						return <ListGroupItem key={questionId}>
							<Link to={'/questions/' + questionId}>
								<Question question={question}/>
							</Link>  
						</ListGroupItem>
              		})}
            	</ListGroup>
      		</div>
        )
    }
}

function mapStateToProps({ questions, authedUser }, props) {
  	const { question_selector } = props.match.params
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