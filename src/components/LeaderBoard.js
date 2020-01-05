import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Row, Container } from 'reactstrap';
import User from './User'
import { getUsersSortedByRank } from '../utils/UserUtils'

class LeaderBoard extends Component {
  	
  	createLeaderBoardCards() {
      	const users = this.props.users
        
        return getUsersSortedByRank(users).map((userId, rank) => {
            return <User key={userId} userId={userId}/>
		})
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