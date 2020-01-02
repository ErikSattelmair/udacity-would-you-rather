import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { setAuthedUser } from '../actions/authedUser'

class Login extends Component {
	
  	state = {
    	chosenUserId: '',
    	toHome: false
    }
  	
	createUserDropDownList = (users) => {
    	users.map((user) => <option value={user.id}>{user.id}</option>)
    }
	
    handleSelectionEvent = (evt) => {
		const authedUserId = evt.target.value
        
        this.setState({
        	chosenUserId: authedUserId
        })
	}
	
  	handleSubmit = (evt) => {
    	evt.preventDefault()
      	
      	const { chosenUser } = this.state
        const { dispatch } = this.props
        
        dispatch(setAuthedUser(chosenUser))
    	
      	this.setState({
        	chosenUserId: '',
          	toHome: true
        })
    }
  
  	render() {
		const { chosenUser, toHome } = this.state

      	if(toHome) {
			return <Redirect to='/' />
		}
                
    	return (
        	<div>
          		<form onSubmit={this.handleSubmit}>
					<label for="authedUser">Male</label>
					<select id='authedUser' onChange={this.handleSelectionEvent}>
						{
                        	this.createUserDropDownList(this.props.users)
                        }
					</select>
					<button type='submit' disabled={chosenUser === {}}>
                        Login
                    </button>
				</form>
          	</div>
        )
    }
}

function mapStateToPros({ users }) {
	return { users }
}

export default connect(mapStateToPros)(Login)