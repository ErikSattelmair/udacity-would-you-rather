import React, { Component } from 'react'
import { Container, Row, Col, ButtonToggle } from "reactstrap";
import { connect } from 'react-redux'
import Category from './Category'
import User from './User'

class Home extends Component {
	state = {
    	show: 'unanswered'
    }
  	
	handleToggle(evt) {
    	const show = evt.target.value
      
      	this.setState({
    		show: show
    	})
    }

  	render() {
    	return (
        	<div>
      			<h3 className='text-center'>Home</h3>
				<Container>
             		<Row>
             			<Col>
                            <ButtonToggle color='secondary' value='unanswered' onClick={(evt) => this.handleToggle(evt)}>Unanswered Questions</ButtonToggle>{' '}
                            <ButtonToggle color='secondary' value='answered' onClick={(evt) => this.handleToggle(evt)}>Answered Questions</ButtonToggle>
                            <Category category={this.state.show} />
						</Col>
						<Col>
							<User userId={this.props.authedUser} />
						</Col>
					</Row>
				</Container>
			</div>
        )
    }
}

function mapStateToProps({ authedUser }) {
	return { authedUser }
}

export default connect(mapStateToProps)(Home) 