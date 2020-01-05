import React, { Component, Fragment } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap';
import Question from './Question'

class QuestionList extends Component {
    render() {
  		return (
          	<Fragment>
      			<ListGroup>
                    {this.props.relevantQuestions.length === 0 ? (
                        <ListGroupItem>No { this.props.questionCategory } available </ListGroupItem>
                    ) : (
                      this.props.relevantQuestions.map((question) => {
						return <ListGroupItem key={question.id}><Question questionId={question.id}/></ListGroupItem>
					  })
                    )}
				</ListGroup>
      		</Fragment>
        )
    }
}

export default (QuestionList)