import React, { Component } from 'react'
import { Pie } from 'react-chartjs-2'
import { FormGroup } from 'reactstrap'

class QuestionStatistics extends Component {

  	calculateTotalVotes() {
    	const question = this.props.question
      	const totalVotes = question.optionOne.votes.concat(question.optionTwo.votes)
		
		return totalVotes.length
    }

	calculateOptionVote(option) {
    	return option.votes.length
    }
	
	calculateOptionTotalVoteRatio(option) {
    	return (this.calculateOptionVote(option) / this.calculateTotalVotes() * 100).toFixed(2)
    }
  
  	render() {
      	const { optionOne, optionTwo } = this.props.question
      	
      	const option = {
			legend: {
		    	position: 'left'
             },
			tooltips: {
			callbacks: {
				label: function(tooltipItem, data) {
				      const dataset = data.datasets[0];
                      const meta = dataset._meta[Object.keys(dataset._meta)[0]];
                      const total = meta.total;
                      const currentValue = dataset.data[tooltipItem.index];
                      const percentage = parseFloat((currentValue/total*100).toFixed(2));
                      return percentage + '% (total: ' +  currentValue + ')';
                    },
                    title: function(tooltipItem, data) {
                      return data.labels[tooltipItem[0].index];
                    }
                  }
                }
              }

        	const pieData = [this.calculateOptionVote(optionOne), this.calculateOptionVote(optionTwo)]
        	const pieLabels = [optionOne.text, optionTwo.text]
        	
    	return (
        	<FormGroup>
				<br />
				<h4>Statistics</h4>
				<Pie width={60} height={10} data={{
					labels: pieLabels,
                    datasets: [{
						data: pieData,
	                    backgroundColor: ['red', 'blue']
					}]
                }} options={option} />
			</FormGroup>
        )
	}

}

export default QuestionStatistics