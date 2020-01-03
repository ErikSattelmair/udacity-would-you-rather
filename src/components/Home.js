import React, { Component } from 'react'
import { Container, Row, Col, ButtonToggle } from "reactstrap";
import { connect } from 'react-redux'
import QuestionList from './QuestionList'

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
				<ButtonToggle color='secondary' value='unanswered' onClick={(evt) => this.handleToggle(evt)} >Unanswered Questions</ButtonToggle>{' '}
				<ButtonToggle color='secondary' value='answered' onClick={(evt) => this.handleToggle(evt)}>Answered Questions</ButtonToggle>
				<QuestionList questionSelector={this.state.show} />
			</div>
        )
    }
}

export default connect()(Home) 