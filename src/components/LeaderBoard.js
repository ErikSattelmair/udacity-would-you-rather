import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Card, Button, CardImg, CardTitle, CardText, Container, Row, Col,
  CardSubtitle, CardBody
} from 'reactstrap';
import { Link } from 'react-router-dom'

class LeaderBoard extends Component {
  	
  	createLeaderBoardCards() {
      	const users = this.props.users
    	
        return Object.keys(users).sort(this.sortUsersByQuestionAnsweredAskedCount).map((userId, rank) => {
			const user = users[userId]
			const numberOfQuestionsAsked = this.getNumberOfAskedQuestions(user)
			const numberOfQuestionsAnswered = this.getNumberOfAnsweredQuestions(user)
            
            return <Col sm={3} key={userId}><Card>
                  <CardImg top width="100%" src={user.avatarURL} alt="Card image cap" />
                  <CardBody>
                      <CardTitle><b>{rank + 1}.</b> {user.name}</CardTitle>
                      <CardSubtitle>Statistic Summary</CardSubtitle>
          			  <br />
                      <CardText>Questions answered: {numberOfQuestionsAnswered}<br />Questions asked: {numberOfQuestionsAsked}</CardText>
					  <Link to={'users/' + userId}>  
          			  	<Button>Go to user profile</Button>
          			  </Link>
                  </CardBody>
            </Card></Col>
        	}
		)
    }

  	sortUsersByQuestionAnsweredAskedCount = (user1Id, user2Id) => {
    	const { users } = this.props

        return this.calculateTotalRankingNumber(users[user2Id]) - this.calculateTotalRankingNumber(users[user1Id])
	}
        
   	calculateTotalRankingNumber = (user) => {
    	return this.getNumberOfAskedQuestions(user) + this.getNumberOfAnsweredQuestions(user)
    }

  	getNumberOfAskedQuestions = (user) => {
    	return user.questions.length
    }
  
  	getNumberOfAnsweredQuestions = (user) => {
    	return user.answers === undefined ? 0 : Object.keys(user.answers).length
    }
  	
  	render() {
    	return (
        	<Fragment>
      			<h3 className='text-center'>LeaderBoard</h3>
				<Container>
             		<Row>
               			{ this.createLeaderBoardCards() }
            		</Row>
				</Container>
      		</Fragment>
        )
    }
}

function mapStateToProps({ users }) {
	return { users }
}

export default connect(mapStateToProps)(LeaderBoard) 