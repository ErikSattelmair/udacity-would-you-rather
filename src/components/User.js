import React, { Component, Fragment } from 'react'
import { Container, Row, Col, Card, CardImg, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { getUsersSortedByRank } from '../utils/userUtils'

class User extends Component {
  
  	createUserInfo() {
      	const { user, rank } = this.props
		const numberOfQuestionsAsked = user.questions.length
		const numberOfQuestionsAnswered = user.answers === undefined ? 0 : Object.keys(user.answers).length
        
    	return 	<Card>
            	<CardImg top width="100%" src={user.avatarURL} alt={`Avatar of ${user.id}`} />
                <CardBody>
                	<CardTitle><b>{user.id}</b></CardTitle>
                    <CardSubtitle>Leaderboard rank: {rank}</CardSubtitle>
          			<br />
                    <CardText>Questions answered: {numberOfQuestionsAnswered}<br />Questions asked: {numberOfQuestionsAsked}</CardText>
				</CardBody>
			</Card>
    }
  	
	render() {
      	if(this.props.showNotFoudPage) {
			return <Redirect to={'/404'} />
        }
      	
		const userSearchedDirectly =  this.props.userId === undefined
        const userInfo = this.createUserInfo()
		
    	return (
			<Fragment>
                {userSearchedDirectly ? (
                    <Container><Row><Col sm="12" md={{ size: 6, offset: 3 }}>{userInfo}</Col></Row></Container>
                ) : (
                    userInfo
                )}
			</Fragment>
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