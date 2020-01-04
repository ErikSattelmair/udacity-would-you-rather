import React, { Component } from 'react'
import { Card, CardImg, CardTitle, CardText, Col, CardSubtitle, CardBody } from 'reactstrap'

class User extends Component {
  
	render() {
      	const { user, rank } = this.props
		const numberOfQuestionsAsked = user.questions.length
		const numberOfQuestionsAnswered = user.answers === undefined ? 0 : Object.keys(user.answers).length

    	return (
        	<Col sm={4} key={user.id} className='mt-3'>
				<Card>
                  <CardImg top width="100%" src={user.avatarURL} alt={`Avatar of ${user.id}`} />
                  <CardBody>
                      <CardTitle><b>{user.id}</b></CardTitle>
                      <CardSubtitle>Leaderboard rank: {rank}</CardSubtitle>
          			  <br />
                      <CardText>Questions answered: {numberOfQuestionsAnswered}<br />Questions asked: {numberOfQuestionsAsked}</CardText>
                  </CardBody>
            	</Card>
			</Col>
        )
    }
}

export default User