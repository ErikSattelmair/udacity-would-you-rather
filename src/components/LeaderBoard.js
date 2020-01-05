import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Col, Row, Container } from 'reactstrap';
import User from './User'
import { getUsersSortedByRank } from '../utils/userUtils'

class LeaderBoard extends Component {
  	
  	createLeaderBoardCards() {
      	const users = this.props.users
        
        return getUsersSortedByRank(users).map((userId, rank) => {
            return <Col sm={4} key={userId} className='mt-3'><User key={userId} userId={userId}/></Col>
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