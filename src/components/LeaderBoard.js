import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Container } from 'reactstrap';
import User from './User'

class LeaderBoard extends Component {
  	
  	createLeaderBoardCards() {
      	const users = this.props.users
    	
        return Object.keys(users).sort(this.sortUsersByQuestionAnsweredAskedCount).map((userId, rank) => {
			const user = users[userId]
            
            return <User key={userId} user={user} rank={rank + 1}/>
		})
    }

  	sortUsersByQuestionAnsweredAskedCount = (user1Id, user2Id) => {
    	const { users } = this.props

        return this.calculateTotalRankingNumber(users[user2Id]) - this.calculateTotalRankingNumber(users[user1Id])
	}
        
	calculateTotalRankingNumber = (user) => {
    	return user.questions.length + user.answers === undefined ? 0 : Object.keys(user.answers).length
    }
  	
  	render() {
    	return (
        	<div>
      			<h3 className='text-center'>LeaderBoard</h3>
				<Container>
             		<Row>
               			{ this.createLeaderBoardCards() }
            		</Row>
				</Container>
      		</div>
        )
    }
}

function mapStateToProps({ users }) {
	return { users }
}

export default connect(mapStateToProps)(LeaderBoard) 