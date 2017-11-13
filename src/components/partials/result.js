import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../actions/helper_action'
import userAction from '../../actions/user_action'

import { getResultsSports } from './selector'

class ResultComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.list_date = []
    }
    componentWillMount() {
    	this.props.getResultSports();
    	this.list_date.push(new Date());
    	for(let i = 1; i <= 7; i++) {
    		let yesterday = new Date();
			yesterday.setDate(yesterday.getDate() - i);
			this.list_date.push(yesterday);
    	}

    }
    componentWillUnmount() {
    	this.props.resetResultSportsFilter();
    }
	componentDidMount() {
		$('#date').datepicker({
			onSelect: (dateText) => {
				this.props.getResultSports(new Date(dateText));
			}
		}).datepicker("setDate", new Date());
		
	}
	_onChangeSports(e) {
		let value = e.target.value;
		this.props.updateResultSports(value)
	}
	_onChangeLeague(e) {
		let value = e.target.value;
		this.props.filterLeagueSports(value);
	}
	_onGetResultByDay(key = 'today') {
		let dayString = ''
		if(key == 'today') {
			if(!$('#btn-today').hasClass('active')) {
				$('#btn-today').addClass('active')
				$('#btn-yesterday').removeClass('active')
				// $('#date').datepicker("setDate", new Date());
				$('#dateChoose').val(moment(new Date()).format('MM/DD/YYYY'))
				dayString = new Date();
				this.props.getResultSports(dayString);
			}
		}
		else if(key == 'yesterday') {
			if(!$('#btn-yesterday').hasClass('active')) {
				let yesterday = new Date();
				yesterday.setDate(yesterday.getDate()-1)
				$('#btn-yesterday').addClass('active')
				$('#btn-today').removeClass('active')
				// $('#date').datepicker("setDate", yesterday);
				$('#dateChoose').val(moment(yesterday).format('MM/DD/YYYY'))
				dayString = yesterday;
				this.props.getResultSports(dayString);
			}
		}
		
	}
	_onSort(e) {
		let value = e.target.value;
		this.props.updateSort(value)
	}
	_onChangeDate(e) {
		let value = e.target.value;
		let today = moment(new Date()).format('MM/DD/YYYY');
		if(value != today) {
			$('#btn-today').removeClass('active')
			$('#btn-yesterday').removeClass('active')
		}
		this.props.getResultSports(new Date(value));
	}
    render(){
    	let { 
    		result, 
    		sportItemMenu, 
    		resultData: {
    			league, 
    			matches
    		}, 
    		sort, 
    		filterLeague, 
    		sportMenuPanel
    	} = this.props;
    	if(!Helper.checkObj(result)) result = {}

    	let list_sports = []
    	let list_leagues = []
    	let list_matches = []
    	for(let key in sportItemMenu) {
    		list_sports.push(
    			<option key={`result-${key}`} value={sportItemMenu[key].id}>{sportMenuPanel[key]}</option>
    		)
    	}

    	if(Helper.checkArray(league)) {
    		list_leagues = league.map((item) => {
    			return (
    				<option key={`league-${item.leagueName}`} value={item.leagueName}>{item.leagueName}</option>
    			)
    		})
    	
	    	if(sort == '') {
		    	league.forEach((item) => {
		    		let matches_league = [];
		    		if(filterLeague == '' || filterLeague == item.leagueName) {
			    		matches_league = matches.map((match) => {
			    			if(match.league == item.leagueName) {
				    			return (
				    				<tr key={`match-${match.id}`}>
										<td className="text-center">{moment(match.date).format('MM/DD HH:mm')}</td>
										<td>
											<div>{match.team1}</div>
											<div>{match.team2}</div>
										</td>
										<td className="text-center">
											{
												match.results[0] === undefined ? 
												' - ' : 
												`${match.results[0].team1Score} - ${match.results[0].team2Score}`
											}
										</td>
										<td className="text-center">
											{
												match.fullTime.team1Score == null && 
												match.fullTime.team2Score == null ? 
												' - ' : 
												`${match.fullTime.team1Score} - ${match.fullTime.team2Score}`
											}
										</td>
									</tr>
				    			)
				    		}
			    		})
			    		list_matches.push(
			    			<tbody key={`match-${item.leagueName}`}>
								<tr className="league">
									<td colSpan="4">{item.leagueName}</td>
								</tr>
								{matches_league}
							</tbody>
		    			)
		    		}
		    	})
	    	}
	    	else {
	    		list_matches = matches.map((match) => {
	    			return (
	    				<tbody key={`match-${match.id}`}>
							<tr className="league">
								<td colSpan="4">{match.league}</td>
							</tr>
							<tr key={`match-${match.id}`}>
								<td className="text-center">{moment(match.date).format('MM/DD HH:mm')}</td>
								<td>
									<div>{match.team1}</div>
									<div>{match.team2}</div>
								</td>
								<td className="text-center">
									{
										match.results[0] === undefined ? 
										' - ' : 
										`${match.results[0].team1Score} - ${match.results[0].team2Score}`
									}
								</td>
								<td className="text-center">
									{
										match.fullTime.team1Score == null && 
										match.fullTime.team2Score == null ? 
										' - ' : 
										`${match.fullTime.team1Score} - ${match.fullTime.team2Score}`
									}
								</td>
							</tr>
						</tbody>
	    			)
	    		})
	    	}
    	}

    	let list_date_option = this.list_date.map((item, index) => {
    		let key = `date-result-${index}`;
    		let date = moment(item).format('MM/DD/YYYY')
    		return (
    			<option value={date} key={key}>
    				{date}
    			</option>
    		)
    	})
    	return (
			<article className="article container-min">
				<div className="">
					<div>
						<div className="form-group form-inline margin-right-10">
							<label className="control-label">{result.sortBy || 'Sort By'}:</label>
							<select className="form-control width-100" onChange={this._onSort.bind(this)}>
								<option value="">{result.league || 'League'}</option>
								<option value="time">{result.time || 'Time'}</option>
							</select>
						</div>
						<div className="form-group form-inline">
							<label className="control-label">{result.date || 'Date'}:</label>
							<select 
								className="form-control width-100 margin-right-5" 
								id="dateChoose"
								onChange={this._onChangeDate.bind(this)}
							>
								{list_date_option}
							</select>
							{
								1 == 2 ?
								<input type="text" id="date" className="form-control width-100" placeholder="dd/mm/yyyy"/> : ''
							}
						</div>
						<a 
							className="btn active margin-right-5" 
							id="btn-today"
							onClick={this._onGetResultByDay.bind(this, 'today')}
						>
							{result.today || 'Today'}
						</a>
						<a 
							className="btn margin-right-5"
							id="btn-yesterday"
							onClick={this._onGetResultByDay.bind(this, 'yesterday')}
						>
							{result.yesterday || 'Yesterday'}
						</a>
					</div>
					<div className="margin-top-10">
						<div className="form-group form-inline">
							<label className="control-label margin-right-5">{result.select || 'Select'}:</label>
							<select className="form-control width-200 margin-right-5" onChange={this._onChangeSports.bind(this)}>
								{list_sports}
							</select>
						</div>
						<div className="form-group form-inline">
							<select className="form-control width-400" onChange={this._onChangeLeague.bind(this)}>
								<option value="">All</option>
								{list_leagues}
							</select>
						</div>
					</div>
				</div>
				<div className="portlet margin-top-5">
					<div className="portlet__header">
						<h4 className="title"><img src="/assets/images/icon-p1.png" alt=""/> {result.title || 'Result'}</h4>
					</div>
					<div className="portlet__body">
						<div>
							<table className="table-result">
								<thead>
									<tr>
										<th className="center">{result.kickOffTime || 'Kickoff Time'}</th>
										<th>{result.match || 'Match'}</th>
										<th className="text-center" width="180px" className="number">
											{result.firstHalfScore || 'First Half Score'}
										</th>
										<th className="text-center" width="180px" className="number">
											{result.fullTimeScore || 'Full Time Scrore'}
										</th>
									</tr>
								</thead>
								{list_matches}
							</table>
						</div>
					</div>
				</div>
			</article>
		)
    }
}

ResultComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
	return {
		sportItemMenu: state.helper.sportItemMenu, 
		result: state.helper.language.result, 
		resultData: getResultsSports(state), 
		sort: state.auth.sort, 
		filterLeague: state.auth.filterLeague, 
		sportMenuPanel: state.helper.language.sportMenuPanel, 

	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...helperAction,
			...userAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultComponent)