import React, { Component } from 'react'
import { connect } from 'react-redux'

import userAction from '../../actions/user_action'
import oddAction from '../../actions/odd_action'
import helperAction from '../../actions/helper_action'

import { bindActionCreators } from 'redux'

import { sortBetList } from './selector'

class BetListComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
		this.props.getBetList();
	}
	componentDidMount() {
		
	}
	
	getBetStatus(id) {
		switch(id) {
			case 1:
				return 'text-blue';
			break;
			case 3: 
				return 'text-won';
			break;
			default:
				return 'text-red';
			break;
		}
	}
    render(){
    	let { 
    		betList,
    		betListData, 
    		sportMenuPanel, 
    		oddTypeList, 
    		tweakOdd, 
    	} = this.props;
    	if(!Helper.checkObj(betList)) betList = {}

    	let percent = 1 + (tweakOdd/100)
    	let betData = []
    	betData = betListData.map((item, index) => {
    		let key = `bet-list-item-${index}`
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
    		let oddType = {}
    		let oddParlay = 0
    		if(item.details.length > 1) {
    			oddType = betList.sides[betList.sides.length - 1]
    			for(let i = 0; i < item.details.length; i++) {
    				oddParlay+= item.details[i].odd < 0 ? item.details[i].odd * (1 + tweakOdd/100) : item.details[i].odd * (1 - tweakOdd/100)
    			}
    		}
    		else {
    			oddType = betList.sides[item.details[0].betside];
    		}
    		let teamChoose = ''
    		let stringBetSide = ''
    		if(item.details.length > 1) {
    			stringBetSide = 'PAR'
    		}
    		else {
    			stringBetSide = Helper.getBetSide(item.details[0].betside)
    		}
    		if(Helper.checkData(item.details[0][stringBetSide]) && isNaN(item.details[0][stringBetSide])) {
    			teamChoose = `${item.details[0][stringBetSide]} ${Helper.checkData(betList[oddType.status]) ? betList[oddType.status]: ''}`
    		}
    		else {
    			teamChoose = betList[stringBetSide]
    		}
    		let dateString = `${oddType.label} ${ticketid}`;
    		let ticketStatus = betList.statusTicket[item.details[0].status]
    		let oddString = _.find(oddTypeList, (i) => {
    			return i.value == item.details[0].oddtype;
    		})
    		if(stringBetSide == 'PAR') {
    			item.dateString = dateString
    			Cookies.set(`par-${item.id}`, item, {expires: config.expireCookies})
    		}
    		return (
    			<tr key={key}>
					<td className="text-center">{index + 1}</td>
					<td>
						<span>{sportMenuPanel[item.details[0].sport.toLowerCase()]}</span><br/>
					</td>
					<td>
						<span>{dateString}</span><br/>
						<span>
							{moment(item.bettime).format('DD/MM HH:mm:ss A')}
						</span>
					</td>
					<td>
						<strong>{item.details[0].leaguename}</strong><br/>
						<span>
							{
								item.details[0].team2 !== undefined ? 
								`${item.details[0].team1} -vs- ${item.details[0].team2}` :
								''
							}
						</span>{item.details[0].team2 !== undefined ? <br/> : ''}
						<span>
							{moment(item.bettime).format('DD/MM')}&nbsp;
							{
								oddType.status != 'TEAM1_OUTRIGHT' && item.details[0].matchmarket == 1 ? 
								`(${betList.firstHalf})` : ''
							}
						</span><br/>
					</td>
					<td>
						<strong 
							className={stringBetSide != 'PAR' ? 'text-red' : 'text-green link-a'} 
							onClick={(e) => {
								if(stringBetSide == 'PAR') {
									window.open(`/parlay/${item.id}`, 'parlay', 'location=yes,height=434,width=300,scrollbars=yes,status=yes, top=100, left=300')
								}
							}}
						>
							{teamChoose}
						</strong><br/>
						<span>
							{
								stringBetSide != 'PAR' ?
								`${item.details[0].line} @ ${(item.details[0].odd < 0 ? item.details[0].odd * (1 + tweakOdd/100) : item.details[0].odd * (1 - tweakOdd/100)).toFixed(2)} (${oddString.label})` : 
								` @ ${oddParlay.toFixed(2)} (${oddString.label})`
							}
						</span>
					</td>
					<td>
						<span>
							{item.finalstake}
						</span>
					</td>
					<td>
						<strong 
							className={this.getBetStatus(item.details[0].status)}
						>
							{ticketStatus}
						</strong>
					</td>
				</tr>
    		)
    	})
    	return (
			<article className="article container-min">
				<div className="portlet">
					<div className="portlet__header">
						<h4 className="title"><img src="/assets/images/icon-p1.png" alt=""/> {betList.title || 'Bet List'}</h4>
					</div>
					<div className="portlet__body">
						<div>
							<table className="table-betlist">
								<thead>
									<tr>
										<th className="text-center" width="30px">{betList.stt || 'No'}</th>
										<th width="60px">{betList.type || 'Type'}</th>
										<th>{betList.date || 'Date'}</th>
										<th>{betList.event || 'Event'}</th>
										<th>{betList.detail || 'Detail'}</th>
										<th>{betList.stake || 'Stake'}</th>
										<th>{betList.status || 'Status'}</th>
									</tr>
								</thead>
								<tbody>
									{betData}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</article>
		)
    }
}

BetListComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...userAction,
			...helperAction, 
    }, dispatch)
}

const mapStateToProps = (state) => {
	return {
		betList: state.helper.language.betList, 
		betListData: sortBetList(state), 
		sportMenuPanel: state.helper.language.sportMenuPanel, 
		oddTypeList: state.helper.oddTypeList, 
		tweakOdd: state.auth.tweakOdd, 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BetListComponent)
