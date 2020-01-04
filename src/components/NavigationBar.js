import React, { Component } from 'react'
import {
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  DropdownToggle,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { Link, withRouter } from 'react-router-dom'
import Login from './Login'
import Search from './Search'

class NavigationBar extends Component {
	
  	state = {
    	dropdownOpen: false,
    }
	
	toggle = () => {
    	this.setState({
    		dropdownOpen: !this.state.dropdownOpen
    	})
    }
  	
  	render() {      	
    	return (
        	<div>
				<Navbar color="light" light expand="md">
                  <NavbarBrand>Would You Rather</NavbarBrand>
                  <NavbarToggler onClick={this.toggle} />
                      <Nav pills>
                          <NavItem>
                              <NavLink tag={Link} to="/">Home</NavLink>
                          </NavItem>
                          <Dropdown nav isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                              <DropdownToggle nav caret>Categories</DropdownToggle>
                              <DropdownMenu>
                                  <DropdownItem><NavLink tag={Link} to="/category/unanswered">Unanswered Questions</NavLink></DropdownItem>
                                  <DropdownItem><NavLink tag={Link} to="/category/answered">Answered Questions</NavLink></DropdownItem>
                              </DropdownMenu>
                          </Dropdown>
                          <NavItem>
                              <NavLink tag={Link} to="/leaderboard">Leaderboard</NavLink>
                          </NavItem>
                          <NavItem>
                              <NavLink tag={Link} to="/add">Create Question</NavLink>
                          </NavItem>
						  <Search />
						  <Login />
                      </Nav>
				</Navbar>
          	</div>
        )
    }
}

export default withRouter(NavigationBar)