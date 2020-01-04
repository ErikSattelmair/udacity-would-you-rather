import React, { Component } from 'react'
import { connect } from 'react-redux'
import { FormFeedback, Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Redirect } from 'react-router-dom'
import { handleAddUser } from '../actions/users'

class CreateUser extends Component {
	
  	state = {
    	username: '',
      	name: '',
      	avatar: '',
      	toHome: false
    }
  	
	handleFileUpload(evt) {
      	evt.preventDefault()
				
		new Promise(function(resolve, reject) { 
            const reader = new FileReader()

          	reader.onloadend = function () {
                const b64 = reader.result
            	resolve(b64)
            };
          	
          	reader.readAsDataURL(evt.target.files[0])
        }).then((res) => {
        	this.setState({
        		avatar: res
			})
        }).catch(() => {
			this.setState({
        		avatar: ''
			})
        })
	}

	handleUsernameChange(evt) {
    	const username = evt.target.value
      
      	this.setState({
    		username: username
    	})
    }
	
	handleRealNameChange(evt) {
    	const name = evt.target.value
      
      	this.setState({
    		name: name
    	})
    }
	
	isUsernameAvailable() {
      	const { username } = this.state
		const { users } = this.props

		return !Object.keys(users).includes(username)
    }
	
	isAvatarFileUploaded() {
    	const { avatar } = this.state
		return avatar.length > 0
    }
	
	isAvatarValid() {
      return this.isAvatarFileUploaded()  && this.isAvatarFileTypeValid() 
    }

	isAvatarFileTypeValid() {
		const { avatar } = this.state
      	const validContentTypes = ['data:image/png', 'data:image/jpg', 'data:image/jpeg']
		const avatarContentType = avatar.substr(0, avatar.indexOf(';')); 
    	
		return validContentTypes.includes(avatarContentType)
	}
	
	isFormValid() {
		const { username, name } = this.state
		
		return this.isUsernameAvailable() && username.length > 0 && name.length > 0 && this.isAvatarValid()
    }

	handleSubmit() {
		const { username, name, avatar } = this.state
		const { dispatch } = this.props
		
		dispatch(handleAddUser(username, name, avatar))

		this.setState({
        	username: '',
          	name: '',
          	avatar: '',
          	toHome: true
        })
    }
	
  	render() {
      	if(this.state.toHome) {
        	return <Redirect to={'/'} />
        }
      	
      	const formValid = this.isFormValid()
      	const userNameAlreadyTaken = !this.isUsernameAvailable()
        const avatarFileTypeInvalid = this.isAvatarFileUploaded() && !this.isAvatarFileTypeValid()
        
    	return (
          	<div>
				<h3 className='text-center'>Create a New Account</h3>
                <Form>
          			<FormGroup>
                        <FormText className='font-weight-bold h4'>Acount Details</FormText>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="username" sm={1}>Username</Label>
                        <Col sm={5}>
                            <Input type="text" name="username" id="username" placeholder="Enter your username..." onChange={(e) => this.handleUsernameChange(e)} invalid={userNameAlreadyTaken} />
                            <FormFeedback>Oh no! That username is already taken</FormFeedback>
                            </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="name" sm={1}>Name</Label>
                        <Col sm={5}>
                            <Input type="text" name="name" id="name" placeholder="Enter your real name" onChange={(e) => this.handleRealNameChange(e)} />
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                          <Label for="avatar" sm={1}>Avatar</Label>
                          <Col sm={10}>
                                <Input type="file" name="avatar" id="avatar" onChange={(e) => this.handleFileUpload(e)} invalid={avatarFileTypeInvalid} />
								<FormFeedback>Oh no! Content type of avatar picture invalid</FormFeedback>
								<FormText color="muted">
                                    Upload avatar picture. Allowed file types: png, jpg, jpeg
                                </FormText>
                          </Col>
                    </FormGroup>
                    <FormGroup>
                        <Button onClick={() => this.handleSubmit()} disabled={!formValid} >Create Account</Button>
                    </FormGroup>
                </Form>
			</div>
        )
    }
}

function mapStateToProps({ users }) {
	return { users }
}

export default connect(mapStateToProps)(CreateUser)