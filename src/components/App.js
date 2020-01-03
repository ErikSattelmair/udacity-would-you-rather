import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { handleInitialData } from '../actions/shared'
import LoadingBar from 'react-redux-loading'
import Home from './Home'
import NavigationBar from './NavigationBar'
import LeaderBoard from './LeaderBoard'
import CreateQuestion from './CreateQuestion'
import Question from './Question'
import QuestionList from './QuestionList'
import NotFound from './NotFound'
import LoggedOut from './LoggedOut'
import CreateUser from './CreateUser'

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
      				? 	<Switch>
                 			<Route path='/add_user' exact component={CreateUser} />
							<Route component={LoggedOut} />
						</Switch>
                	: <div className='ml-5 mr-5 mt-1'>
						<Switch>
                            <Route path='/' exact component={Home} />
                            <Route path='/leaderboard' exact component={LeaderBoard} />
                            <Route path='/add' exact component={CreateQuestion} />
                            <Route path='/question/:question_id' exact component={Question} />
                            <Route path='/questions/:question_selector' exact component={QuestionList} />
							<Route path='/404' exact component={NotFound} />
							<Route component={NotFound} />
						</Switch>
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