import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import { setAuthedUser } from '../actions/authedUser'
import { Form, FormGroup, Button, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'

class Login extends Component {
  	
  	state = {
    	prevPath: ''
    }
  	
  	componentWillReceiveProps(nextProps) {
		this.setState({ prevPath: this.props.location })
  	}
  	
	handleUserLogin = (userId) => {
    	const { dispatch, history } = this.props
        const { prevPath } = this.state
        
        dispatch(setAuthedUser(userId))
      
      	const prevPathname = prevPath.pathname
        if(prevPathname === '/add_user') {
        	history.push('/')
        } else {
        	history.push(prevPathname)
        }
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
      			<UncontrolledDropdown className='mr-1'>
                        <DropdownToggle caret size='sm' outline >Login as</DropdownToggle>
                        <DropdownMenu>
                            { this.createDopdownEntries() }
                        </DropdownMenu>
                    </UncontrolledDropdown><Link to={'/add_user'}>
                    <Button size='sm' outline >Create New Account</Button></Link>
				</Fragment>
    }

	createLoggedInView(loggedInUserId) {
      	const loggedInUser = this.props.users[loggedInUserId]

      	return <UncontrolledDropdown>
            <DropdownToggle caret size='sm' outline>Welcome, { loggedInUserId } <img src={loggedInUser.avatarURL} alt={`(avatar of ${loggedInUserId})`} /></DropdownToggle>
            <DropdownMenu>
				<DropdownItem onClick={() => this.handleUserLogout()}>Logout</DropdownItem>
            </DropdownMenu>
		</UncontrolledDropdown>
    }

  	render() {
		const { authedUser } = this.props
      	
    	return (
            <NavItem>
				<Form inline className='mt-1'>
      				<FormGroup>
              			{ authedUser === null ? this.createLoggedOutView() : this.createLoggedInView(authedUser) }
	      			</FormGroup>
				</Form>
            </NavItem>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
	return { users, authedUser }
}

export default withRouter(connect(mapStateToProps)(Login))