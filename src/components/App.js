import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import NavigationBar from './NavigationBar'
import LeaderBoard from './LeaderBoard'
import CreateQuestion from './CreateQuestion'
import Question from './Question'
import User from './User'

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData())
  }
  
  render() {
    return (
		<Router>
			<Fragment>
				<LoadingBar />
      			<NavigationBar />
      			{this.props.loggedOut 
      				? <p>Please log in first!</p>
                	: <div>
						<Route path='/' exact component={Home} />
                    	<Route path='/leaderboard' component={LeaderBoard} />
                    	<Route path='/add' component={CreateQuestion} />
						<Route path='/questions/:question_id' component={Question} />
						<Route path='/users/:user_id' component={User} />
					  </div>
					}
      		</Fragment>
      	</Router>
    );
  }
}

function mapStateToProps({ authedUser }) {
    return {
        loggedOut: authedUser === null
    }
}

export default connect(mapStateToProps)(App)