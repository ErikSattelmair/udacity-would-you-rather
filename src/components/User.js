import React, { Component } from 'react'
import { Card, CardImg, CardTitle, CardText, Col, CardSubtitle, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUsersSortedByRank } from '../utils/UserUtils'

class User extends Component {
  
	render() {
      	if(this.props.showNotFoudPage) {
			return <Redirect to={'/404'} />
        }
      	
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

function mapStateToProps({ users }, props) {
	const userId = props.userId !== undefined ? props.userId : props.match.params.user_id
	const user = users[userId]

	if(user === undefined) {
		return { showNotFoudPage: true }
	}
	
	let userRank

	getUsersSortedByRank(users).filter((user, rank) => { 
		if(user === userId) {
			userRank = rank + 1
		}
		
		return 0
	})

	return {
      	user: user,
		rank: userRank
    }
}

export default connect(mapStateToProps)(User)