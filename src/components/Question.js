import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { handleUpdateUserAnswer, handleDeleteUserAnswer } from '../actions/users'
import { updateQuestionAnswers, handleRemoveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { 
  Label, Input, Form, FormGroup, Card, CardImg, CardTitle,
  CardSubtitle, CardBody, Button, Row, Col, Container
} from 'reactstrap'
import { Link } from 'react-router-dom'
import QuestionStatistics from './QuestionStatistics'

class Question extends Component {
  	
  	convertTimestampToDateRepresentation = (timestamp) => {
		const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      	const date = new Date(timestamp * 1e3)
        
      	return date.getDate() + ' ' + months[date.getMonth()] + ' ' + date.getFullYear()
	}

	convertTimestampToTimeRepresentation = (timestamp) => {
		return new Date(timestamp * 1e3).toISOString().slice(-13, -5)
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

	handleQuestionDelete(questionId) {
    	const { dispatch } = this.props

      	dispatch(handleRemoveQuestion(questionId))
		dispatch(handleDeleteUserAnswer(questionId))
    }
	
	createQuestionInfo() {
    	const { question, questionAuthor, authedUser } = this.props
		const { timestamp } = question
		const authedUserVoted = this.isQuestionAnswered()
		const authedUserVote = authedUserVoted ? this.calculateAuthedUserVote() : ''
    	
		return <Card>
				<CardImg top width="100%" src={questionAuthor.avatarURL} alt={`Avatar of ${questionAuthor.id}`} />
				<CardBody>
                    <CardTitle><u>Created on {this.convertTimestampToDateRepresentation(timestamp)} at {this.convertTimestampToTimeRepresentation(timestamp)} by <Link to={'/users/' + questionAuthor.id }>{ questionAuthor.id }</Link></u></CardTitle>
                    <CardSubtitle className='font-weight-bold h4 mb-1'>Would you rather</CardSubtitle>
					<Form>
						<FormGroup>
                        	<FormGroup check>
                            	<Label check htmlFor="optionOne">
                                	<Input type="radio" value="optionOne" disabled={ authedUserVoted } checked={authedUserVote === 'optionOne'} onChange={(e) => this.onChange(e)} />
									{question.optionOne.text}
                            	</Label>
                        	</FormGroup>
                        	<FormGroup check>
                            	<Label check htmlFor="optionTwo">
                                	<Input type="radio" value="optionTwo" disabled={ authedUserVoted } checked={authedUserVote === 'optionTwo'} onChange={(e) => this.onChange(e)} />
									{question.optionTwo.text}
                            	</Label>
                        	</FormGroup>
							{authedUserVoted && <QuestionStatistics question={question} />
								}
						</FormGroup>
						{ authedUser === questionAuthor.id && (
                            <FormGroup>
                                <Button onClick={() => this.handleQuestionDelete(question.id)}>Delete Question</Button>
                            </FormGroup>
						)}
					</Form>
				</CardBody>
            </Card>
	}

  	render() {
      	if(this.props.showNotFoudPage) {
			return <Redirect to={'/404'} />
        }
      	
		const questionSearchedDirectly =  this.props.questionId === undefined
        const questionInfo = this.createQuestionInfo()
        
        return (
            <Fragment>
				{questionSearchedDirectly ? (
                    <Container><Row><Col sm="12" md={{ size: 6, offset: 3 }}>{questionInfo}</Col></Row></Container>
                ) : (
                    questionInfo
                )}
			</Fragment>
        )
    }
}

function mapStateToProps({ authedUser, users, questions }, props) {
	const questionId = props.questionId !== undefined ? props.questionId : props.match.params.question_id
	const question = questions[questionId]
	
	if(question === undefined) {
		return { showNotFoudPage: true }
	}
	
	return {
    	authedUser,
      	question: question,
      	questionAuthor: users[question.author]
    }
}

export default connect(mapStateToProps)(Question)