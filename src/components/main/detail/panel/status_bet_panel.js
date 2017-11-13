import React, { Component } from 'react'
import { connect } from 'react-redux'

import PanelComponent from '../../helper/panel'

import userAction from '../../../../actions/user_action'

import { getDataForStatusBetPanel } from '../../selector'

class StatusBetPanelComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
	}
	getBetSide(id){
		switch(id) {
			case 0:
				// return 'TEAM1_SPREAD';
				return 'team1';
			break;
			case 1:
				// return 'TEAM2_SPREAD';
				return 'team2';
			break;
			case 2:
				// return 'OVER';
				return 'over';
			break;
			case 3:
				// return 'UNDER';
				return 'under';
			break;
			case 4:
				// return 'TEAM1_MONEY';
				return 'team1';
			break;
			case 5:
				// return 'TEAM2_MONEY';
				return 'team2';
			break;
			case 6:
				// return 'DRAW_MONEY';
				return 'draw';
			break;
			case 7:
				// return 'NO_DRAW_MONEY';
				return '';
			break;
			case 8:
				// return 'ODD';
				return 'odd';
			break;
			case 9:
				// return 'EVEN';
				return 'even';
			break;
			case 10:
				// return 'OUTRIGHT';
				return 'team1';
			break;
			case 11:
				// return 'ZERO_ONE';
				return 'zeroOne';
			break;
			case 12:
				// return 'TWO_THREE';
				return 'twoThree';
			break;
			case 13: 
				// return 'FOUR_SIX';
				return 'fourSix';
			break;
			case 14:
				// return 'SEVEN_OVER';
				return 'sevenOver';
			break;
		}
	}
	_renderItemInList(betListData, betList, oddTypeList, betListMiniStatus, sportMenuPanel, user, tweakOdd) {
		let data_template = [];
		if(betListData.length > 0) {
			for(let i = 0; i < 5; i++) {
				let key = `bet-list-mini-item-${i}`
				let item = betListData[i]
	    		let ticketid = '';
	    		if(item.id.toString().length < 8) {
	    			for(let i = 0; i < 8 - item.id.toString().length; i ++) {
	    				ticketid+='0';
	    			}
	    			ticketid+= item.id;
	    		}
	    		else {
	    			ticketid = item.id;
	    		}
	    		let oddType = betList.sides[item.details[0].betside];
	    		let teamChoose = ''
	    		let stringBetSide = this.getBetSide(item.details[0].betside)
	    		if(Helper.checkData(item.details[0][stringBetSide])) {
	    			teamChoose = item.details[0][stringBetSide]
	    		}
	    		else {
	    			teamChoose = betList[stringBetSide]
	    		}
	    		let dateString = `${oddType.label} ${ticketid} (${moment(item.bettime).format('DD/MM HH:mm:ss a')})`;
	    		let ticketStatus = ''
	    		if(betListMiniStatus == 1) {
	    			ticketStatus = betList.runningStatus
	    		}
	    		else if(betListMiniStatus == 2) {
	    			ticketStatus = betList.waitingStatus;
	    		}
	    		else if (betListMiniStatus == 14) {
	    			ticketStatus = betList.rejectStatus;
	    		}
	    		let oddString = _.find(oddTypeList, (i) => {
	    			return i.value == item.details[0].oddtype;
	    		})
	    		let percent = tweakOdd/100;
	    		let value = (item.details[0].odd < 0 ? item.details[0].odd*(1 + percent) : item.details[0].odd*(1 - percent)).toFixed(2);
	    		let data = {
	    			dateString: `${oddType.label} ${ticketid}`, 
	    			ticketStatus: ticketStatus, 
	    			// dateTime: moment(item.bettime).format('DD/MM HH:mm:ss A'), 
	    			dateTime: item.bettime, 
	    			username: user.username, 
	    			oddString: oddString, 
	    			teamChoose: teamChoose, 
	    			team1: item.details[0].team1, 
	    			team2: item.details[0].team2, 
	    			line: item.details[0].line, 
	    			odd: value, 
	    			leaguename: item.details[0].leaguename, 
	    			sport: sportMenuPanel[item.details[0].sport.toLowerCase()], 
	    			finalstake: item.finalstake, 
	    			typeOdd: oddType.label, 
	    		}
	    		Cookies.set(ticketid, data, {expires: config.expireCookies})
	    		data_template.push(
	    			<div key={key} 
	    				style={ 
	    					i%2 == 0 ? 
	    					{border: '0.2px solid gray', padding: '3px'} : 
	    					{background: '#d5e8ff', border: '0.2px solid gray', padding: '3px'}
	    				}
	    			>
	    				<div>{dateString}</div>
	    				<div>
	    					{
								item.details[0].team2 !== undefined ? 
								`${item.details[0].team1} -vs- ${item.details[0].team2}` :
								''
							}
	    				</div>
	    				<div>
	    					<strong 
	    						className={
	    							teamChoose == item.details[0].team1 || teamChoose == item.details[0].team2 ? 
	    							'text-blue' : 
	    							'text-red'
	    						}
	    					>
	    						{teamChoose}
	    					</strong>
	    					<strong>{` (${item.details[0].line}) @ ${value} (${oddString.label})`}</strong>
	    				</div>
	    				<div>{item.details[0].leaguename}</div>
	    				<div>{sportMenuPanel[item.details[0].sport.toLowerCase()]}</div>
	    				<div>{oddType.string}</div>
	    				<div style={{height: '20px'}}>
	    					<span style={{background: 'green', color:'white'}}>{ticketStatus}</span>
	    					<div style={{float:'right', marginRight: '-5px'}}>
	    						<strong>{item.finalstake}</strong>
	    						<div 
	    							style={{
	    								width: '25px',
									    height: '25px', 
									    background: 'url(assets/images/print.gif)', 
									    float: 'right', 
									    backgroundRepeat: 'no-repeat', 
									    marginLeft: '3px', 
									    paddingBottom: '5px',
	    							}}
	    							onClick={(e) => {
	    								window.open(`/betslip/${ticketid}`, '_blank')
	    							}}
	    						></div>
	    					</div>
	    				</div>
	    			</div>
	    		)
			}
		}
		return data_template;
	}
    render(){
    	let { 
    		statusBetPanel, 
    		statusBet: {
    			isActive
    		}, 
    		betList,
    		betListData, 
    		sportMenuPanel, 
    		oddTypeList, 
    		betListMiniStatus, 
    		user, 
    		tweakOdd, 
    	} = this.props;
    	if(!Helper.checkObj(statusBetPanel)) statusBetPanel = {}
    	if(!Helper.checkObj(betList)) betList = {}


    	let betListMini = [];
    	betListMini = this._renderItemInList(betListData, betList, oddTypeList, betListMiniStatus, sportMenuPanel, user, tweakOdd)
    	return (
			<PanelComponent 
				iconClass="fa fa-bars" 
				title={
					betListMiniStatus == 1 ? 
					betList.betListMiniTitle : 
					betListMiniStatus == 2 ? 
					betList.waitingBetTitle : 
					betListMiniStatus == 14 ? 
					betList.voidTitle : 
					statusBetPanel.title
				}
				active={isActive || false}
			>
				<div className="waiting">
					{
						betListMiniStatus != 2 ?
						<a 
							onClick={this.props.updateBetListMiniStatus.bind(this, 2)} 
							className="btn btn-block">
							{statusBetPanel.waitingBet || 'Waiting Bet'}
						</a> : ''
					}
					{
						betListMiniStatus != 14 ?
						<a 
							onClick={this.props.updateBetListMiniStatus.bind(this, 14)} 
							className="btn btn-block">
							{statusBetPanel.void || 'Void'}
						</a> : ''
					}
					{
						betListMiniStatus != null && betListMiniStatus != 1 ?
						<a 
							onClick={this.props.updateBetListMiniStatus.bind(this, 1)} 
							className="btn btn-block">
							{'BetList(mini)'}
						</a> : ''
					}
				</div>
				{
					betListMini.length > 0 ? 
					betListMini : 
					<span className="waiting" style={{justifyContent: 'center'}}>{statusBetPanel.noBet}</span>
				}
			</PanelComponent>
    	)
    }
}

StatusBetPanelComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		statusBetPanel: state.helper.language.statusBetPanel, 
		statusBet: state.helper.mainMenuActive.statusBet, 
		betList: state.helper.language.betList, 
		betListData: getDataForStatusBetPanel(state), 
		sportMenuPanel: state.helper.language.sportMenuPanel, 
		oddTypeList: state.helper.oddTypeList, 
		betListMiniStatus: state.auth.betListMiniStatus, 
		user: state.auth.user, 
		tweakOdd: state.auth.tweakOdd,
	}
}

export default connect(mapStateToProps, userAction)(StatusBetPanelComponent)