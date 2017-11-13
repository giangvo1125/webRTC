import React, { Component } from 'react'

import { connect } from 'react-redux'

class BetSlipComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.state = {
        	data: {}, 
        }
    }
	componentDidMount() {
		
	}
	componentWillMount() {
		$('body').css('background','white')
		let parlayId = this.props.params.parlayId;
		let data = Cookies.get(`par-${parlayId}`)
		if(Helper.checkData(data)) {
			this.setState({
				data: JSON.parse(data)
			})
		}
	}
	componentWillUnmount() {
		$('body').removeCss('background')
	}
    render(){
    	let {
    		state: {
    			data
    		}, 
    		props: {
    			betList, 
    			tweakOdd
    		}
    	} = this;
    	let list_details = []
    	let percent = 1 + (tweakOdd/100)
    	let odds = 0;
    	list_details = data.details.map((item, index) => {
    		let oddType = {}
    		oddType = betList.sides[item.betside];
    		let stringBetSide = Helper.getBetSide(item.betside)
    		let ticketStatus = betList.statusTicket[item.status]
    		let teamChoose = ''
    		if(Helper.checkData(item[stringBetSide])) {
    			teamChoose = `${item[stringBetSide]} ${Helper.checkData(betList[oddType.status]) ? betList[oddType.status]: ''}`
    		}
    		else {
    			teamChoose = betList[stringBetSide]
    		}
    		odds+= item.odd
    		return (
    			<tr key={`parlay-${index}`} style={{borderBottom: '1px solid black'}}>
					<td style={{
						width: '20px', 
						whiteSpace: 'nowrap', 
						borderCollapse: 'collapse', 
						borderRight: '1px solid black', 
						textAlign: 'center', 
						verticalAlign: 'top', 
					}}>
						<b>{index + 1}</b>
					</td>
					<td>
						<table style={{margin: '3px'}}>
							<tbody>
								<tr>
									<td>
										{item.leaguename}
									</td>
								</tr>
								<tr>
									<td>
										{`${item.team1} -vs- ${item.team2}`}
									</td>
								</tr>
								<tr>
									<td>
										{moment(data.bettime).format('HH:mm')}
									</td>
								</tr>
								<tr>
									<td>Result: {item.status == 1 ? '-' : `${item.team1score} - ${item.team2score}`}</td>
								</tr>
								<tr>
									<td>
										<span>
											Type: {oddType.label}
										</span>
										<span className="margin-left-20">
											Odds: {(item.odd < 0 ? item.odd*(1 + tweakOdd/100) : item.odd*(1 - tweakOdd/100)).toFixed(2)}
										</span>
									</td>
								</tr>
								<tr>
									<td>
										Bet: <b className="text-red">{teamChoose}</b>
									</td>
								</tr>
								<tr>
									<td>{`${item.line} @  ${(item.odd < 0 ? item.odd*(1 + tweakOdd/100) : item.odd*(1 - tweakOdd/100)).toFixed(2)}`}</td>
								</tr>
							</tbody>
						</table>
					</td>
				</tr>
    		)
    	})
    	return (
			<div>
				<table>
					<tbody>
						<tr className="bold">
							<td>Ref no: </td>
							<td>{data.dateString}</td>
						</tr>
						<tr className="bold">
							<td>Date/Time : </td>
							<td>{moment(data.bettime).format('DD/MM HH:mm:ss A')}</td>
						</tr>
						<tr className="bold">
							<td>Game Type : </td>
							<td>Parlay</td>
						</tr>
						<tr><td>&nbsp;</td></tr>
						<tr>
							<td colSpan="2">
								<table
									style={{
									    width: '250px', 
									    border: '1px solid black', 
									    borderCollapse: 'collapse', 
									}}
								>
									<tbody>
										{list_details}
									</tbody>
								</table>
							</td>
						</tr>
						<tr><td>&nbsp;</td></tr>
						<tr>
							<td><b>Bet Amount: </b></td>
							<td><b className="">{parseFloat(data.finalstake).toFixed(2)}</b></td>
						</tr>
						<tr>
							<td><b>Odds: </b></td>
							<td><b className="">{(odds*percent).toFixed(2)}</b></td>
						</tr>
						<tr>
							<td><b>Est. /Payout : </b></td>
							<td><b className="">{((odds*percent).toFixed(2))*data.finalstake}</b></td>
						</tr>
					</tbody>
				</table>
			</div>
		)
    }
}

BetSlipComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps =(state) => {
	return {
		betList: state.helper.language.betList, 
		tweakOdd: state.auth.tweakOdd, 
	}
}

export default connect(mapStateToProps)(BetSlipComponent)