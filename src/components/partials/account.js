import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../actions/helper_action'
import userAction from '../../actions/user_action'

class WelcomeComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentDidMount() {
		
	}
	_onChangeRoute(name = '/') {
		this.context.router.push(name);
	}
	_onClickLogOut() {
		this.props.logout();
	}
    render(){
    	let { userAccountInfo, user, defaultBetSetting } = this.props;
    	if(!Helper.checkObj(userAccountInfo)) userAccountInfo = {}

    	let isShow = false;
    	return (
			<article className="article">
				<div className="portlet container-min">
					<div className="portlet__header">
						<h4 className="title"><img src="/assets/images/icon-p1.png" alt=""/>
							{userAccountInfo.title || ' Account Info'}
						</h4>
					</div>
					<div className="portlet__body">
						<div>
							<table className="table-account">
								<tbody>
									<tr>
										<td>{userAccountInfo.username || 'User Name'}:</td>
										<td>{user.username || ''}</td>
									</tr>
									<tr>
										<td>{userAccountInfo.totalBalance || 'Total Balance'}:</td>
										<td 
											className={
												user.balance < 0 ? 
												"text-red" : 
												"text-black"
											}
										>
											{user.balance}
										</td>
									</tr>
									{
										isShow == true ?
										<tr>
											<td>{userAccountInfo.sportBookBalance || 'Sportsbook Balance'}:</td>
											<td className="text-red">-1,992.58</td>
										</tr> : <tr></tr>
									}
									{
										isShow == true ?
										<tr>
											<td>{userAccountInfo.eGameBalance || 'E-Games Balance'}:</td>
											<td>0.00</td>
										</tr> : <tr></tr>
									}
									<tr>
										<td>{userAccountInfo.currency || 'Currency'}:</td>
										<td>THB</td>
									</tr>
									{
										isShow == true ?
										<tr>
											<td>{userAccountInfo.sportBookCreditLimit || 'Sportsbook Credit Limit'}:</td>
											<td>2,000</td>
										</tr>: <tr></tr>
									}
									{
										isShow == true ?
										<tr>
											<td>{userAccountInfo.remainingSportBookCreditLimit || 'Remaining Sportsbook Credit Limit'}:</td>
											<td>	7.42</td>
										</tr> : <tr></tr>
									}
									{
										isShow == true ? 
										<tr>
											<td>{userAccountInfo.eGamesCreditLimit || 'E-Games Credit Limit'}:</td>
											<td>0</td>
										</tr> : <tr></tr>
									}
									<tr>
										<td>{userAccountInfo.minMaxBet || 'Min/Max Bet'}:</td>
										{
											Helper.checkObj(defaultBetSetting) ? 
											<td>
												{`${defaultBetSetting.minbet} / ${defaultBetSetting.maxbet}`}
											</td> : <td></td>
										}
									</tr>
									<tr>
										<td>{userAccountInfo.totalOutStanding ||'Total Outstanding'}:</td>
										<td>{user.outstanding}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</article>
		)
    }
}

WelcomeComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
	return {
		user: state.auth.user, 
		userAccountInfo: state.helper.language.userAccountInfo, 
		defaultBetSetting: state.auth.defaultBetSetting, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...helperAction,
			...userAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeComponent)