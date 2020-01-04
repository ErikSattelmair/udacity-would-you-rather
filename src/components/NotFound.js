import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class NotFound extends Component {
	
  	render() {
        return (
            <div className='ml-5 mr-5 mt-1'>
          		<h3>Oh no!! Page not found :(</h3>
          		<Link to={'/'}>
					<p>Go back to Home</p>
				</Link>
          	</div>
        )
    }
}

export default NotFound