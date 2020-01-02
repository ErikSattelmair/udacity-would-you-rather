import React, { Component } from 'react'
import { Nav, NavItem, Dropdown, DropdownItem, DropdownToggle, DropdownMenu, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom'

class NavigationBar extends Component {
	
  	state = {
    	dropdownOpen: false
    }

	toggle = () => {
    	this.setState({
    		dropdownOpen: !this.state.dropdownOpen
    	})
    }
  	
  	render() {
    	return (
        	<div>
          		<Nav pills>
        			<NavItem>
          				<NavLink tag={Link} to="/">Home</NavLink>
        			</NavItem>
					<Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
          				<DropdownToggle nav caret>Categories</DropdownToggle>
          				<DropdownMenu>
            				<DropdownItem><NavLink tag={Link} to="/questions/unanswered">Unanswered Questions</NavLink></DropdownItem>
            				<DropdownItem><NavLink tag={Link} to="/questions/answered">Answered Questions</NavLink></DropdownItem>
          				</DropdownMenu>
        			</Dropdown>
					<NavItem>
						<NavLink tag={Link} to="/leaderboard">Leaderboard</NavLink>
        			</NavItem>
					<NavItem>
						<NavLink tag={Link} to="/add">Create Question</NavLink>
        			</NavItem>
          		</Nav>
          	</div>
        )
    }
}

export default NavigationBar