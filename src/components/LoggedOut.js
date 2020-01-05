import React from 'react'

const LoggedOut = (props) => {

	return (
    	<div>
      		<h3>Welcome to the game "Would You Rather"</h3>
      		<p>Unfortunately you are logged out currently!</p> 
      		<p>To play the game, please log in as an existing user via the drop down button in the navigation bar or create a new account.</p>
      	
      		<h4>But wait, how does the game work?</h4>
      		<p>It's basically very simple! Just answer a question that starts with the words "Would you rather..." and has two options provided to choose from.</p>
      		<p>To see your question answers and who else voted for your option, just toggle the question list on the home page or use the dropdown button in the navigation bar.</p>
			<p>You can further more see on the leaderboard how you rank in comparison to ohters and learch for a specific question or user, each by their respective id.</p>
      		<p>To log out, use the button in the navbar on the right hand side.</p>
      		
      		<p>Enough said, let the fun begin! Happy playing :)</p>
      	</div>
    )
  
}

export default LoggedOut