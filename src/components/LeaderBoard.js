import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import {
  Card, CardImg, CardTitle, CardText, Container, Row, Col,
  CardSubtitle, CardBody
} from 'reactstrap';

class LeaderBoard extends Component {
  	
  	createLeaderBoardCards() {
      	const users = this.props.users
    	
        return Object.keys(users).sort(this.sortUsersByQuestionAnsweredAskedCount).map((userId, rank) => {
			const user = users[userId]
			const numberOfQuestionsAsked = this.getNumberOfAskedQuestions(user)
			const numberOfQuestionsAnswered = this.getNumberOfAnsweredQuestions(user)
            
            return <Col sm={4} key={userId} className='mt-3'><Card>
                  <CardImg top width="100%" src={user.avatarURL} alt={`Avatar of ${userId}`} />
                  <CardBody>
                      <CardTitle><b>{rank + 1}.</b> {userId}</CardTitle>
                      <CardSubtitle>Statistic Summary</CardSubtitle>
          			  <br />
                      <CardText>Questions answered: {numberOfQuestionsAnswered}<br />Questions asked: {numberOfQuestionsAsked}</CardText>
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