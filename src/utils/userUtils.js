export function getUsersSortedByRank(users) {
  	return Object.keys(users).sort(sortUsersByQuestionAnsweredAskedCount(users))
}

function sortUsersByQuestionAnsweredAskedCount (users) {
  	return function(user1Id, user2Id) {
		return calculateTotalRankingNumber(users[user2Id]) - calculateTotalRankingNumber(users[user1Id])
    }
}
        
function calculateTotalRankingNumber(user) {
	return user.questions.length + (user.answers === undefined ? 0 : Object.keys(user.answers).length)
}