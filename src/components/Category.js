import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import QuestionList from './QuestionList'
import { getRelevantQuestionsByCategory } from '../utils/QuestionUtils'

class Category extends Component {
	render() {
      	if(this.props.showNotFoudPage) {
        	return <Redirect to={'/404'} />
        }
        
		const headingText =  (this.props.category === 'answered' ? 'Answered' : 'Unanswered') + ' Questions'

		return (
        	<div>
				<h3 className='text-center'>{ headingText }</h3>
      			<QuestionList relevantQuestions={this.props.relevantQuestions} questionCategory={headingText} />
      		</div>
      )
	}
}
  
function mapStateToProps({ questions, authedUser }, props) {
  	const category = props.category !== undefined ? props.category : props.match.params.category
	const categoryValid = category === 'answered' || category === 'unanswered'
    
    if(!categoryValid) {
    	return {
        	showNotFoudPage: true
        }
    }

    const relevantQuestions = getRelevantQuestionsByCategory(questions, category, authedUser)
          
    return {
		relevantQuestions,
      	category
    }
}

export default connect(mapStateToProps)(Category)