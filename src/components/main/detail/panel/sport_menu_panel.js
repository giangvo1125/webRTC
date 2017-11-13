import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PanelComponent from '../../helper/panel'

import { getObjListSportMenu } from '../../selector'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'
import userAction from '../../../../actions/user_action'

class SportMenuPanelComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.state = {
        	isLoad: true, 
        	newSport: false
        }
    }

	componentWillMount() {
	}

	componentDidMount() {
	}

	_onShowListItem(item) {
		this.props.changeShowListItemBetMenu(item.key, item.isActive);
		if(this.props.resultSports != item.id) {
			this.setState({
				newSport: true
			})
			this.props.updateResultSports(item.id, false)
		}
	}

	_onClickItemList(oddData, outRightOdd, oEventOdd, DCOdd, parlayOdd, correctScoreOdd, HTFTOdd, goalOdd, item) {
		let newSport = false;
		if(window.location.pathname.length > 1) {
			this.context.router.push('/')
		}
		if(this.props.typeOdd != item.key) {
			this.props.updateTypeOdd(item.key)
		}
		// this._onChangePanelActive();
		switch(item.key) {
			case 'hdpOu':
				if(oddData.length == 0 || this.state.isLoad == true || this.state.newSport == true) {
					this.props.getDataOdd()
					this.setState({
						isLoad: false, 
						newSport: false, 
					})
				}
			break;
			case 'oddEvenTotalGoal':
				if(oEventOdd.length == 0 || this.state.isLoad == true || this.state.newSport == true) {
					this.props.getOEventOdd()
					this.setState({
						isLoad: false, 
						newSport: false, 
					})
				}
			break;
			case 'doubleChange':
				if(DCOdd.length == 0 || this.state.isLoad == true || this.state.newSport == true) {
					this.props.getDoubleChanceOdd()
					this.setState({
						isLoad: false, 
						newSport: false, 
					})
				}
			break;
			case 'correctScore':
				if(correctScoreOdd.length == 0 || this.state.isLoad == true || this.state.newSport == true) {
					this.props.getCorrectScoreOdd()
					this.setState({
						isLoad: false, 
						newSport: false, 
					})
				}
			break;
			case 'htft':
				if(HTFTOdd.length == 0 || this.state.isLoad == true || this.state.newSport == true) {
					this.props.getHTFTOdd()
					this.setState({
						isLoad: false, 
						newSport: false, 
					})
				}
			break;
			case 'goal':
				if(goalOdd.length == 0 || this.state.isLoad == true || this.state.newSport == true) {
					this.props.getGoalOdd()
					this.setState({
						isLoad: false, 
						newSport: false, 
					})
				}
			break;
			case 'mixParlay':
				if(parlayOdd.length == 0 || this.state.isLoad == true && this.state.newSport == true) {
					this.props.getParlayOdd()
					this.setState({
						isLoad: false, 
						newSport: false, 
					})
				}
			break;
			case 'outright':
				if(outRightOdd.length == 0 || this.state.isLoad == true && this.state.newSport == true) {
					this.props.getOutRightOdd()
					this.setState({
						isLoad: false, 
						newSport: false, 
					})
				}
			break;
		}
	}

	_onChangeTabLink(tab) {
		this.props.changeTabLink(tab)
		this.props.getDataOdd()
		this.props.updateTypeOdd("hdpOu")
		if(window.location.pathname.length > 1) {
			this.context.router.push('/')
		}
		if(this.props.isShowFavorite == true) {
			this.props.updateIsShowFavorite(false);
		}
	}

	componentWillReceiveProps(nextProps){
		let {
			resultSports
		} = this.props;
		if(nextProps.resultSports != this.props.resultSports) {
			this.setState({
				isLoad: true
			})
		}
	}

	_onChangePanelActive() {
		this.props.updateIsShowFavorite(false);
	}

    render(){
    	let { 
    		sportMenuPanel, 
    		sportMenu: {
    			isActive
    		}, 
    		listSportMenu, 
    		tabLinkActive, 
    		oddData, 
			outRightOdd, 
			oEventOdd, 
			DCOdd, 
			parlayOdd, 
			correctScoreOdd, 
			HTFTOdd, 
			goalOdd, 
    	} = this.props;
    	if(!Helper.checkObj(sportMenuPanel)) sportMenuPanel = {}
    	let listMenuSport = SupportComponent._renderListItemBet(
    			listSportMenu, 
    			tabLinkActive, 
    			this._onShowListItem.bind(this), 
    			this._onClickItemList.bind(
    				this,
    				oddData, 
					outRightOdd, 
					oEventOdd, 
					DCOdd, 
					parlayOdd, 
					correctScoreOdd, 
					HTFTOdd, 
					goalOdd
    			)
    	)
    	return (
    		<PanelComponent 
				iconClass="fa fa-bars" 
				title={sportMenuPanel.title || 'Sports Menu'}
				active={isActive || false}
			>
				<div className="tab-aside">
					<div className="tab-header">
						<a 
							className={`tab-link${tabLinkActive == 'tab_early' ? ' active' : ''}`} 
							data-tab="tab_early"
							onClick={this._onChangeTabLink.bind(this, 'tab_early')}
						>
							{sportMenuPanel.early || 'Early'}
						</a>
						<a 
							className={`tab-link${tabLinkActive == 'tab_today' ? ' active' : ''}`} 
							data-tab="tab_today"
							onClick={this._onChangeTabLink.bind(this, 'tab_today')}
						>
							{sportMenuPanel.today || 'Today'}
						</a>
						<a 
							className={`tab-link${tabLinkActive == 'tab_live' ? ' active' : ''}`} 
							data-tab="tab_live"
							onClick={this._onChangeTabLink.bind(this, 'tab_live')}
						>
							{sportMenuPanel.live || 'Live'}
						</a>
					</div>
					<div className="tab-body">
						{listMenuSport}
					</div>
				</div>
			</PanelComponent>
    		
    	)
    }
}

SportMenuPanelComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		sportMenuPanel: state.helper.language.sportMenuPanel, 
		sportMenu: state.helper.mainMenuActive.sportMenu, 
		listSportMenu: getObjListSportMenu(state), 
		tabLinkActive: state.helper.tabLinkActive, 
		resultSports: state.auth.resultSports, 
		typeOdd: state.helper.menuFilterActive.typeOdd, 
		isShowFavorite: state.helper.isShowFavorite, 
		oddData: state.odd.oddData, 
		outRightOdd: state.odd.outRightOdd, 
		oEventOdd: state.odd.oEventOdd, 
		DCOdd: state.odd.DCOdd, 
		parlayOdd: state.odd.parlayOdd, 
		correctScoreOdd: state.odd.correctScoreOdd, 
		HTFTOdd: state.odd.HTFTOdd, 
		goalOdd: state.odd.goalOdd, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...helperAction,
			...oddAction, 
			...userAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SportMenuPanelComponent)