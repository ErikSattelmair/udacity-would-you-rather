import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Label, Input, FormText, Button } from 'reactstrap';
import { handleAddQuestion } from '../actions/questions'
import { Redirect } from 'react-router-dom'

class CreateQuestion extends Component {
	
  	state = {
    	optionOne: '',
      	optionTwo: '',
      	toHome: false
    }
  	
	inputValid() {
    	return this.state.optionOne.length > 0 && this.state.optionTwo.length > 0
    }
	
	handleChangeOptionOne(input) {      	
      	this.setState({
    		optionOne: input
    	})
    }

	handleChangeOptionTwo(input) {      	
      	this.setState({
    		optionTwo: input
    	})
    }

	handleSubmit(evt) {
		evt.preventDefault()

		const { optionOne, optionTwo } = this.state
		const { dispatch } = this.props
		
		dispatch(handleAddQuestion(optionOne, optionTwo))

		this.setState({
        	optionOne: '',
      		optionTwo: '',
          	toHome: true
        })
    }

  	render() {
		if(this.state.toHome) {
        	return <Redirect to='/' />
		}
            
        const submitButtonDisabled = !this.inputValid()
                
    	return (
          	<div>
      			<h3 className='text-center'>Create a Question</h3>
                <Form>
                    <FormGroup>
                        <FormText className='font-weight-bold h4'>Would you rather:</FormText>
                    </FormGroup>
                    <FormGroup>
                        <Label for="optionOne">Option One</Label>
                        <Input type="text" name="optionOne" id="optionOne" placeholder="Enter text for option one here..." onChange={(e) => this.handleChangeOptionOne(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Label for="optionTwo">Option Two</Label>
                        <Input type="text" name="optionTwo" id="optionTwo" placeholder="Enter text for option two here..." onChange={(e) => this.handleChangeOptionTwo(e.target.value)} />
                    </FormGroup>
                    <FormGroup>
                        <Button disabled={submitButtonDisabled} onClick={(e) => this.handleSubmit(e)}>Submit Question</Button>
                    </FormGroup>
                </Form>
			</div>
        )
    }
}

export default connect()(CreateQuestion) 