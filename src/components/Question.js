import React, { Component } from 'react'
import { connect } from 'react-redux'
import { handleUpdateUserAnswer, handleDeleteUserAnswer } from '../actions/users'
import { updateQuestionAnswers, handleRemoveQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'
import { 
  Label, Input, Form, FormGroup, Card, CardImg, CardTitle,
  CardSubtitle, CardBody, Button
} from 'reactstrap'
import { Pie } from 'react-chartjs-2'

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

	handleQuestionDelete(questionId) {
    	const { dispatch } = this.props

      	dispatch(handleRemoveQuestion(questionId))
		dispatch(handleDeleteUserAnswer(questionId))
    }
	
  	render() {
      	if(this.props.showNotFoudPage) {
			return <Redirect to={'/404'} />
        }
      	
      	const { question, questionAuthor, authedUser } = this.props
		const { timestamp, optionOne, optionTwo } = question
		const authedUserVoted = this.isQuestionAnswered()
		const authedUserVote = authedUserVoted ? this.calculateAuthedUserVote() : ''
        const pieData = [this.calculateOptionVote(optionOne), this.calculateOptionVote(optionTwo)]
        const pieLabels = [optionOne.text, optionTwo.text]
        const option = {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                var dataset = data.datasets[0];
                var meta = dataset._meta[Object.keys(dataset._meta)[0]];
                var total = meta.total;
                var currentValue = dataset.data[tooltipItem.index];
                var percentage = parseFloat((currentValue/total*100).toFixed(2));
                return percentage + '% (total: ' +  currentValue + ')';
              },
              title: function(tooltipItem, data) {
                return data.labels[tooltipItem[0].index];
              }
            }
          }
        }
        
        return (
            <Card>
				<CardImg top width="100%" src={questionAuthor.avatarURL} alt={`Avatar of ${questionAuthor.id}`} />
				<CardBody>
                    <CardTitle><u>Created on {this.convertTimestampToDateRepresentation(timestamp)} at {this.convertTimestampToTimeRepresentation(timestamp)} by { questionAuthor.id }</u></CardTitle>
                    <CardSubtitle className='font-weight-bold h4'>Would you rather</CardSubtitle>
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
							{authedUserVoted &&
								<FormGroup>
                                    <br />
									<h4>Statistics</h4>
                                    <Pie width={80} height={10} data={{
                                        labels: pieLabels,
                                        datasets: [{
                                            data: pieData,
                                            backgroundColor: ['red', 'blue']
                                        }]
                                    }} options={option} />
							</FormGroup>}
						</FormGroup>
						{ authedUser === questionAuthor.id && (
                            <FormGroup>
                                <Button onClick={() => this.handleQuestionDelete(question.id)}>Delete Question</Button>
                            </FormGroup>
						)}
					</Form>
				</CardBody>
            </Card>
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