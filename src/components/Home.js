import React, { Component } from 'react'
import { Container, Row, Col, ButtonToggle } from "reactstrap";
import { connect } from 'react-redux'
import QuestionList from './QuestionList'
import User from './User'
import { getRelevantQuestionsByCategory } from '../utils/questionUtils'

class Home extends Component {
	state = {
    	relevantQuestions: getRelevantQuestionsByCategory(this.props.questions, 'unanswered', this.props.authedUser)
    }
  	
	handleToggle(evt) {
    	const show = evt.target.value
      
      	this.setState({
    		relevantQuestions: getRelevantQuestionsByCategory(this.props.questions, show, this.props.authedUser)
    	})
    }

  	render() {
    	return (
        	<div>
      			<h3 className='text-center'>Home</h3>
				<Container>
             		<Row>
             			<Col>
                            <Container className='text-center mb-2'>
                                <ButtonToggle color='secondary' value='unanswered' onClick={(evt) => this.handleToggle(evt)}>Unanswered Questions</ButtonToggle>{' '}
                                <ButtonToggle color='secondary' value='answered' onClick={(evt) => this.handleToggle(evt)}>Answered Questions</ButtonToggle>
							</Container>
                            <QuestionList relevantQuestions={this.state.relevantQuestions} />
						</Col>
						<Col>
							<h4 className='text-center'>User information</h4>
							<User userId={this.props.authedUser} />
						</Col>
					</Row>
				</Container>
			</div>
        )
    }
}

function mapStateToProps({ authedUser, questions }) {  
  	return { 
      	authedUser,
		questions
    }
}

export default connect(mapStateToProps)(Home) 