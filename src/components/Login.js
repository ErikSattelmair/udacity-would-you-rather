import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Button, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link } from 'react-router-dom'

class Login extends Component {
  	
	handleUserLogin = (userId) => {
    	const { dispatch } = this.props
        
        dispatch(setAuthedUser(userId))
    }
	
	createDopdownEntries() {
    	const { users } = this.props
		
		return Object.keys(users).map((key) => <DropdownItem key={key} onClick={() => this.handleUserLogin(key)}>{key}</DropdownItem>)
    }

	handleUserLogout() {
		const { dispatch, history } = this.props
		
        dispatch(setAuthedUser(null))
		
		history.push('/')
    }
	
	createLoggedOutView() {
		return <Fragment>
      				<UncontrolledDropdown>
						<DropdownToggle caret size='sm'>Login as</DropdownToggle>
						<DropdownMenu>
							{ this.createDopdownEntries() }
						</DropdownMenu>
              		</UncontrolledDropdown>
              		<Link to={'/add_user'}><Button size='sm'>Create New Account</Button></Link>
			</Fragment>
    }

	createLoggedInView(loggedInUserId) {
      	const loggedInUser = this.props.users[loggedInUserId]

      	return <UncontrolledDropdown>
            <DropdownToggle caret size='sm'>Welcome, { loggedInUserId } <img src={loggedInUser.avatarURL} alt={`(avatar of ${loggedInUserId})`} /></DropdownToggle>
            <DropdownMenu>
				<DropdownItem onClick={() => this.handleUserLogout()}>Logout</DropdownItem>
            </DropdownMenu>
		</UncontrolledDropdown>
    }

  	render() {
		const { authedUser } = this.props
      	
    	return (
            <Nav>
              { authedUser === null ? this.createLoggedOutView() : this.createLoggedInView(authedUser) }
            </Nav>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
	return { users, authedUser }
}

export default connect(mapStateToProps)(Login)