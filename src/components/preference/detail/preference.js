import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../../actions/helper_action'
import userAction from '../../../actions/user_action'

let { expireCookies } = config

class PreferenceDetailComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
    componentWillMount() {
    	this.getDataFromLocalStorage();
    }
    getDataFromLocalStorage() {
    	this.setState({
    		username: Cookies.get('username') || '', 
    		countryKey: Cookies.get('countryKey') || '', 
    		OddType: Cookies.get('OddType') || '', 
    		oddView: Cookies.get('oddView') || '', 
    		defaultStake: Cookies.get('defaultStake') || '', 
    		thb: Cookies.get('thb') || '', 
    		acceptBetterOdds: Cookies.get('acceptBetterOdds') || '', 
    		sortBy: Cookies.get('sortBy') || '', 
    		isRender: true, 
    	})
    }
    _onSaveData() {
    	for(let key in this.state) {
    		if(key != 'isRender') {
    			Cookies.set(key, this.state[key], {expires: expireCookies})
    		}
    		if(key == 'countryKey') {
    			this.props.changeTransLate(this.state[key])
    		}
    	}
    	alert('Success!!!')
    	this.props.initChange();
    }
	componentDidMount() {
		
	}
	componentWillReceiveProps(nextProps) {
		if(nextProps.keyTranslate != this.props.keyTranslate) {
			this.setState({
				countryKey: nextProps.keyTranslate, 
			})
		}
	}
	_onSetData(key, e) {
		let value = e.target.value;
		if(Helper.checkData(value)) {
			let obj = {}
			obj[key] = value
			this.setState({...obj})
		}
	}
    render(){    	

    	let {
    		props: {
	    		oddTypeList, 
				listTranslateLanguage, 
				isSortByLeague, 
				menuFilterActive, 
				user, 
				oddViewList, 
				keyTranslate, 
				oddType, 
				preferenceDetail
			}, 
			state: {
				username, 
				countryKey, 
				OddType, 
				oddView, 
				defaultStake, 
				thb, 
				acceptBetterOdds, 
				sortBy, 
			}
    	} = this;
    	if(!Helper.checkObj(preferenceDetail)) preferenceDetail = {}
    	let list_language = listTranslateLanguage.map((item) => {
    		return (
    			<option key={`option-language-${item.key}`} value={item.key}>
    				{item.label}
    			</option>
    		)
    	})

    	let list_oddType = oddTypeList.map((item) => {
    		return (
    			<option key={`option-oddtype-${item.value}`} value={item.value}>
    				{item.label}
    			</option>
    		)
    	})

    	let list_oddViewList = oddViewList.map((item) => {
    		return (
    			<option key={`option-oddview-${item.value}`} value={item.value}>
    				{preferenceDetail[item.label] || item.label}
    			</option>
    		)
    	})

    	let sortValue = 'league'

    	if(isSortByLeague == true) {
    		sortValue = 'league'
    	}
    	else {
    		sortValue = 'time'
    	}

    	return (
    		<table className="table-settings">
				<tbody>
					<tr>
						<td className="bold">{preferenceDetail.nickName || 'Nick Name:'}</td>
						<td>
							<input 
								type="text" 
								className="form-control width-200"  
								value={username || (user.username || '')}
								disabled/>
						</td>
					</tr>
					<tr>
						<td className="bold">{preferenceDetail.language || 'Language:'}</td>
						<td>
							<select 
								className="form-control width-200" 
								value={countryKey || (keyTranslate || '')}
								onChange={this._onSetData.bind(this, 'countryKey')} 
							>
								{list_language}
							</select>
						</td>
					</tr>
					<tr>
						<td className="bold">{preferenceDetail.oddType || 'Odds Type:'}</td>
						<td>
							<select 
								className="form-control width-200"
								value={OddType || (oddType || '')} 
								onChange={this._onSetData.bind(this, 'OddType')}
							>
								{list_oddType}
							</select>
						</td>
					</tr>
					<tr>
						<td className="bold">{preferenceDetail.oddView || 'Odds View:'}</td>
						<td>
							<select 
								className="form-control width-200"
								value={oddView || (menuFilterActive.tableType || '')}
								onChange={this._onSetData.bind(this, 'oddView')}
							>
								{list_oddViewList}
							</select>
						</td>
					</tr>
					<tr>
						<td className="bold">{preferenceDetail.defaultStake || 'Default Stake:'}</td>
						<td>
							<select 
								className="form-control width-200" 
								style={{display: 'inline-block'}} 
								onChange={this._onSetData.bind(this, 'defaultStake')}
							>
								<option value="disable">{preferenceDetail['disable']}</option>
								<option value="enable">{preferenceDetail['enable']}</option>
							</select>

							<label>{preferenceDetail.thb || 'THB'}</label>
							<input 
								type="text" 
								className="form-control width-100" 
								style={{display: 'inline-block'}} 
								value={thb || ''}
								onChange={(e) => {
									if(!isNaN(e.target.value)) {
										this._onSetData('thb', e)
									}
								}}
							/>
						</td>
					</tr>
					<tr>
						<td className="bold">{preferenceDetail.acceptOdds || 'Accept better odds:'}</td>
						<td>
							<select 
								className="form-control width-200"
								value={acceptBetterOdds || ''}
								onChange={this._onSetData.bind(this, 'acceptBetterOdds')}
							>
								<option value="1">{preferenceDetail['yes']}</option>
								<option value="0">{preferenceDetail['no']}</option>
							</select>
						</td>
					</tr>
					<tr>
						<td className="bold">{preferenceDetail.sortBy || 'Sort by:'}</td>
						<td>
							<select 
								className="form-control width-200"
								value={sortBy || (sortValue || '')}
								onChange={this._onSetData.bind(this, 'sortBy')}
							>
								<option value="time">{preferenceDetail['time']}</option>
								<option value="league">{preferenceDetail['league']}</option>
							</select>
						</td>
					</tr>
					<tr>
						<td>
							<a 
								className="btn bold" 
								onClick={this._onSaveData.bind(this)}
							>
								{preferenceDetail.saveBtn || 'Save'}
							</a>
						</td>
						<td>
							<a className="btn">{preferenceDetail.closeBtn || 'Close'}</a>
						</td>
					</tr>
				</tbody>
			</table>
		)
    }
}

PreferenceDetailComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
	return {
		oddTypeList: state.helper.oddTypeList, 
		listTranslateLanguage: state.helper.listTranslateLanguage, 
		isSortByLeague: state.odd.isSortByLeague, 
		menuFilterActive: state.helper.menuFilterActive, 
		user: state.auth.user, 
		oddViewList: state.helper.oddViewList, 
		keyTranslate: state.helper.keyTranslate, 
		oddType: state.odd.oddType, 
		preferenceDetail: state.helper.language.preferenceDetail, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...helperAction,
			...userAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceDetailComponent)