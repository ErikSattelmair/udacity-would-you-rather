import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpdateUserAnswer } from '../actions/users'
import { updateQuestionAnswers } from '../actions/questions'
import { 
  Label, Input, Form, FormGroup, Card, CardImg, CardTitle,
  CardSubtitle, CardBody
} from 'reactstrap'

class Question extends Component {
  	
  	convertTimestampToDateRepresentation = (timestamp) => {
		const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      	const date = new Date(timestamp * 1e3)
        
      	return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
	}

	convertTimestampToTimeRepresentation = (timestamp) => {
		return new Date(timestamp * 1e3).toISOString().slice(-13, -5)
    }
  	
	calculateTotalVotes() {
    	const question = this.props.question
      	const totalVotes = question.optionOne.votes.concat(question.optionTwo.votes)
		
		return totalVotes.length
    }

	calculateOptionVote(option) {
    	return option.votes.length
    }
	
	calculateOptionTotalVoteRatio(option) {
    	return (this.calculateOptionVote(option) / this.calculateTotalVotes() * 100).toFixed(2)
    }
	
	isQuestionAnswered() {
    	const question = this.props.question
      	const authedUser = this.props.authedUser
		const totalVotes = question.optionOne.votes.concat(question.optionTwo.votes)

      	return totalVotes.includes(authedUser)
    }

	calculateAuthedUserVote() {
    	const { authedUser, question } = this.props
		
		return question.optionOne.votes.includes(authedUser) ? 'optionOne' : 'optionTwo'
    }
	

	onChange(evt) {
      	const choesenOption = evt.target.value
      	const { dispatch, question, authedUser } = this.props
		
		dispatch(handleUpdateUserAnswer(question.id, choesenOption))
		dispatch(updateQuestionAnswers(authedUser, question.id, choesenOption))
    }
	
  	render() {
      	const { question, questionAuthor } = this.props
		const { timestamp, optionOne, optionTwo } = question
		const authedUserVoted = this.isQuestionAnswered()
		const authedUserVote = authedUserVoted ? this.calculateAuthedUserVote() : ''
				
        return (
            <Card>
				<CardImg top width="100%" src={questionAuthor.avatarURL} alt={`Avatar of ${questionAuthor.id}`} />
				<CardBody>
                    <CardTitle>Created on {this.convertTimestampToDateRepresentation(timestamp)} at {this.convertTimestampToTimeRepresentation(timestamp)} by { questionAuthor.id }</CardTitle>
                    <CardSubtitle className='font-weight-bold'>Would you rather</CardSubtitle>
					<Form>
						<FormGroup>
                        	<FormGroup check>
                            	<Label check htmlFor="optionOne">
                                	<Input type="radio" value="optionOne" disabled={ authedUserVoted } checked={authedUserVote === 'optionOne'} onChange={(e) => this.onChange(e)} />
									{question.optionOne.text}
                            	</Label>
								{authedUserVoted && (
									<Label>
										(number of votes: {this.calculateOptionVote(optionOne)}, ratio: {this.calculateOptionTotalVoteRatio(optionOne)}%)
									</Label>
								)}
                        	</FormGroup>
                        	<FormGroup check>
                            	<Label check htmlFor="optionTwo">
                                	<Input type="radio" value="optionTwo" disabled={ authedUserVoted } checked={authedUserVote === 'optionTwo'} onChange={(e) => this.onChange(e)} />
									{question.optionTwo.text}
                            	</Label>
								{authedUserVoted && (
									<Label>
										(number of votes: {this.calculateOptionVote(optionTwo)}, ratio: {this.calculateOptionTotalVoteRatio(optionTwo)}%)
									</Label>
								)}
                        	</FormGroup>
						</FormGroup>
					</Form>
				</CardBody>
            </Card>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
	const questionId = props.questionId !== undefined ? props.questionId : props.match.params.question_id
	const question = questions[questionId]

	return {
    	authedUser,
      	question: question,
      	questionAuthor: users[question.author]
    }
}

export default connect(mapStateToProps)(Question)