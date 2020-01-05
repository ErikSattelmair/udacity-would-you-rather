import React, { Component } from 'react'
import {
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Input,
  Form,
  FormGroup
} from 'reactstrap';
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

class Search extends Component {
	state = {
      	searchTerm: ''
    }
  
  	handleSearchTermInput(evt) {
    	const input = evt.target.value
      
      	this.setState({
    		searchTerm: input
    	})
    }

	handleSearchRequest(querySelector) {
		const { searchTerm } = this.state
	    const { history } = this.props
		
		history.push('/search/' + searchTerm + '?selector=' + querySelector)
	}
  	
  	render() {
		const searchPossible = this.props.authedUser && this.state.searchTerm.length > 0

    	return (
			<NavItem>
				<Form inline>
					<FormGroup>
						<Input className='mr-2' type="text" name="search" id="search" placeholder="input search term here..." onChange={(e) => this.handleSearchTermInput(e)}/>
						<UncontrolledDropdown disabled={!searchPossible}>
                            <DropdownToggle caret size='sm' outline>{searchPossible ? 'Search by' : <s>Search by</s>}</DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem key='user' onClick={() => this.handleSearchRequest('user')}>User Id</DropdownItem>
								<DropdownItem key='question' onClick={() => this.handleSearchRequest('question')}>Question Id</DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
					</FormGroup>
				</Form>
			</NavItem>
        )
    }
}

function mapStateToProps({ authedUser }) {
	return { authedUser }
}

export default withRouter(connect(mapStateToProps)(Search))