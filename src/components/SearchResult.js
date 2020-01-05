import React, { Component } from 'react'
import { connect } from 'react-redux'
import queryString from 'query-string'
import { Container } from 'reactstrap'
import User from './User'
import Question from './Question'

class Search extends Component {
	
	sortUsersByQuestionAnsweredAskedCount = (user1Id, user2Id) => {
    	const { users } = this.props

		return this.calculateTotalRankingNumber(users[user2Id]) - this.calculateTotalRankingNumber(users[user1Id])
	}
        
	calculateTotalRankingNumber = (user) => {
    	return user.questions.length + user.answers === undefined ? 0 : Object.keys(user.answers).length
    }
  	
  	createUserSearchResults(searchTerm, users) {
      return Object.keys(users).sort(this.sortUsersByQuestionAnsweredAskedCount).filter((userId) => searchTerm === userId).map((userId, rank) => {
            return <User key={userId} userId={userId} />
		})
    }

	createQuestionSearchResults(searchTerm, questions) {
    	return Object.keys(questions).filter((questionId) => questionId === searchTerm).map((questionId) => <Question key={questionId} questionId={questionId} />)
    }
  	
  	render() {
      	const { searchTerm, selector, users, questions } = this.props
      	const results = selector === 'user' ? this.createUserSearchResults(searchTerm, users) : this.createQuestionSearchResults(searchTerm, questions)

		
    	return (
          	<div>
				<h3 className='text-center'>Search Results</h3>
				<Container>
          			{results.length > 0 
          				? ({results}) 
						: (<h4 className='text-center mt-5'>No results found</h4>)} 
          		</Container>
          	</div>
        )
    }
}

function mapStateToProps({ users, questions }, props) {
	const { search_term } = props.match.params
    const selector = queryString.parse(props.location.search).selector
    
  	return { 
    	searchTerm: search_term,
      	selector,
      	questions,
      	users    
    }
}

export default connect(mapStateToProps)(Search)