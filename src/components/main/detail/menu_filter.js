import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../../actions/helper_action'
import oddAction from '../../../actions/odd_action'
import userAction from '../../../actions/user_action'

import { getLeagueNameList } from '../selector'

class MenuFilterComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.selectLeague = []
    }
	componentWillMount() {
	}
    _onClickRefresh(typeOdd) {
        if(typeOdd == 'outright') {
            this.props.getOutRightOdd();
        }
        else if(typeOdd == 'oddEvenTotalGoal') {
            this.props.getOEventOdd();
        }
        else if(typeOdd == 'doubleChange') {
            this.props.getDoubleChanceOdd();
        }
        else if(typeOdd == 'mixParlay') {
            this.props.getParlayOdd();
        }
        else if(typeOdd == 'correctScore') {
            this.props.getCorrectScoreOdd();
        }
        else if(typeOdd == 'htft') {
            this.props.getHTFTOdd();
        }
        else if(typeOdd == 'goal') {
            this.props.getGoalOdd();
        }
        else {
            this.props.getDataOdd(2);
        }
        
    }
    _onSortByLeague() {
        // this.props.getDataOdd(true)
        let newVal = !this.props.isSortByLeague;
        this.props.updateSortLeague(newVal)
    }
    _onSelectLeague() {
        this.props.updateSelectLeague(this.selectLeague)
    }
    _onDeSelectLeagueAll() {
        let { leagueName } = this.props;
        leagueName.forEach((item) => {
            this.selectLeague.push(item.Id)
        })
        this.forceUpdate()
    }
    _onSelectLeagueAll() {
        this.selectLeague = []
        this.forceUpdate()
    }
    _updateSelectLeague(id, e) {        
        let index = _.findIndex(this.selectLeague, (i) => {
            return i == id;
        })
        if(index == -1) {
            this.selectLeague.push(id)
        }
        else {
            this.selectLeague.splice(index, 1)
        }
        this.forceUpdate();
    }
    componentDidMount() {
        $("#selectLeague").click(function(){
            $(this).next(".modal-content").toggle();
        });
    }
    _renderMenuFilter(menuFilter, menuFilterActive, oddTypeList, oddType, leagueName, tabLinkActive, isSortByLeague) {
        let {
            resultSports, 
            sportItemMenu, 
            sportMenuPanel, 
        } = this.props;
        if(Helper.isExistedDataInArray(
            config.sameTypeBet, 
            menuFilterActive.typeOdd)
        ) {
            var title = ''
            var sport = ''
            for(let key in sportItemMenu) {
                if(sportItemMenu[key].id == resultSports) {
                    sport = key;
                }
            }
            var sportString = sportMenuPanel[sport.toLowerCase()];
            if(menuFilterActive.typeOdd == 'oddEvenTotalGoal') 
                title = `${sportString} - ${menuFilter.titleOddEvenTotalGoal}`
            else if(menuFilterActive.typeOdd == 'mixParlay')
                title = `${sportString} - ${menuFilter.titleMixParlay}`
            else if(menuFilterActive.typeOdd == 'correctScore')
                title = `${sportString} - ${menuFilter.titleCorrectScore}`
            else if(menuFilterActive.typeOdd == 'htft')
                title = `${sportString} - ${menuFilter.titleHTFT}`
            else if(menuFilterActive.typeOdd == 'goal')
                title = `${sportString} - ${menuFilter.titleGoal}`
            else
                title = `${sportString} - ${menuFilter.titleOutright}`

            var sortTitle = ''
            switch(isSortByLeague) {
                case false:
                    sortTitle = menuFilter.sortByLeague;
                break;
                default:
                    sortTitle = menuFilter.sortByTime;
                break;
            }
            var list_leagueName = leagueName.map((league, index) => {
                let findItem = _.findIndex(this.selectLeague, (i) => {
                    return i == league.Id
                });

                return (
                    <label className="checkbox" key={`league-${league.Id}`}>
                        <input 
                            type="checkbox" 
                            checked={findItem == -1 ? true : false} 
                            onClick={this._updateSelectLeague.bind(this, league.Id)}
                            onChange={(e)=> {}} />
                        <span></span>
                        <span>{league.Name}</span>
                    </label>
                )
            })
            return (
                <div className="flex">
                    <div className="flex-1 flex-v-end">
                        <h6 className="title-page">
                            <i className="fa fa-caret-square-o-right"></i> 
                            &nbsp;{title}
                        </h6>
                    </div>
                    <div className="flex-3 text-right">
                        <a 
                            className="btn" 
                            style={{marginRight: '3px'}}
                            onClick={this._onSortByLeague.bind(this)}
                        >
                                {sortTitle}
                        </a>
                        <div className="dropdown-modal">
                            <a className="btn" id="selectLeague" style={{marginRight: '3px'}}>{menuFilter.selectLeague ||  'Select League'}</a>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="title">
                                        <img src="/assets/images/mbModIcon.png" alt=""/>
                                        &nbsp;
                                        {menuFilter.selectLeagueTitle || 'SELECT LEAGUE'}
                                    </h4>
                                    <a className="close" onClick={(e)=> {
                                        $("#selectLeague").click();
                                    }}>
                                        <img src="/assets/images/ft_close.gif" alt=""/>
                                    </a>
                                </div>
                                <div className="modal-body">
                                    <div className="text-right margin-bottom-10">
                                        <button 
                                            className="btn btn-blue margin-right-5" 
                                            onClick={this._onSelectLeagueAll.bind(this)} 
                                        >
                                            {menuFilter.selectAllBtn || 'Select All'}
                                        </button>
                                        <a 
                                            className="btn btn-blue margin-right-5" 
                                            onClick={this._onDeSelectLeagueAll.bind(this)} 
                                        >
                                            {menuFilter.deSelectAllBtn || 'DeSelect All'}
                                        </a>
                                        <a 
                                            className="btn btn-blue" 
                                            onClick={this._onSelectLeague.bind(this)} 
                                        >
                                            {menuFilter.okBtn || 'OK'}
                                        </a>
                                    </div>
                                    <div className="checkbox-list-column">
                                        {list_leagueName}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a 
                            className="btn" 
                            onClick={this._onClickRefresh.bind(this, menuFilterActive.typeOdd)}>
                                {menuFilter.refresh || 'Refresh'}
                        </a>
                    </div>
                </div>
            )
        }
        if(menuFilterActive.typeOdd == 'doubleChange'){
            var sport = ''
            for(let key in sportItemMenu) {
                if(sportItemMenu[key].id == resultSports) {
                    sport = key;
                }
            }
            var sportString = sportMenuPanel[sport.toLowerCase()];
            var  title = `${sportString} - ${menuFilter.titleDoubleChance}`
            var sportString = sportMenuPanel[sport.toLowerCase()];

            var sortTitle = ''
            switch(isSortByLeague) {
                case false:
                    sortTitle = menuFilter.sortByLeague;
                break;
                default:
                    sortTitle = menuFilter.sortByTime;
                break;
            }

            var list_leagueName = leagueName.map((league, index) => {
                let findItem = _.findIndex(this.selectLeague, (i) => {
                    return i == league.Id
                });

                return (
                    <label className="checkbox" key={`league-${league.Id}`}>
                        <input 
                            type="checkbox" 
                            checked={findItem == -1 ? true : false} 
                            onClick={this._updateSelectLeague.bind(this, league.Id)}
                            onChange={(e)=> {}} />
                        <span></span>
                        <span>{league.Name}</span>
                    </label>
                )
            })
            return (
                <div className="flex container-min">
                    <div className="flex-1 flex-v-end">
                        <h6 className="title-page"><i className="fa fa-caret-square-o-right"></i> {title}</h6>
                    </div>
                    <div className="flex-3 text-right">
                        <a 
                            className="btn" 
                            style={{marginRight: '3px'}}
                            onClick={this._onSortByLeague.bind(this)}
                        >
                                {sortTitle}
                        </a>
                        <div className="dropdown-modal">
                            <a className="btn" id="selectLeague" style={{marginRight: '3px'}}>{menuFilter.selectLeague ||  'Select League'}</a>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="title">
                                        <img src="/assets/images/mbModIcon.png" alt=""/>
                                        &nbsp;
                                        {menuFilter.selectLeagueTitle || 'SELECT LEAGUE'}
                                    </h4>
                                    <a className="close" onClick={(e)=> {
                                        $("#selectLeague").click();
                                    }}>
                                        <img src="/assets/images/ft_close.gif" alt=""/>
                                    </a>
                                </div>
                                <div className="modal-body">
                                    <div className="text-right margin-bottom-10">
                                        <button 
                                            className="btn btn-blue margin-right-5" 
                                            onClick={this._onSelectLeagueAll.bind(this)} 
                                        >
                                            {menuFilter.selectAllBtn || 'Select All'}
                                        </button>
                                        <a 
                                            className="btn btn-blue margin-right-5" 
                                            onClick={this._onDeSelectLeagueAll.bind(this)} 
                                        >
                                            {menuFilter.deSelectAllBtn || 'DeSelect All'}
                                        </a>
                                        <a 
                                            className="btn btn-blue" 
                                            onClick={this._onSelectLeague.bind(this)} 
                                        >
                                            {menuFilter.okBtn || 'OK'}
                                        </a>
                                    </div>
                                    <div className="checkbox-list-column">
                                        {list_leagueName}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a className="btn" onClick={this._onClickRefresh.bind(this, menuFilterActive.typeOdd)}>{menuFilter.refresh || 'Refresh'}</a>
                    </div>
                </div>
            )
        }
        else {
            let tableType = []
            let currency = []
            if(Helper.checkObj(menuFilter.tableType)) {
                tableType = SupportComponent._renderListDropDown(
                    'tableType', 
                    menuFilter.tableType, 
                    menuFilterActive['tableType'], 
                    this.props.changeDropDownValueMenuFilter)
            }

            if(Helper.checkObj(menuFilter.currency)) {
                currency = SupportComponent._renderListDropDown(
                    'currency', 
                    oddTypeList, 
                    oddType, 
                    this.props.changeOddType)
            }
            var list_leagueName = leagueName.map((league, index) => {
                let findItem = _.findIndex(this.selectLeague, (i) => {
                    return i == league.Id
                });

                return (
                    <label className="checkbox" key={`league-${league.Id}`}>
                        <input 
                            type="checkbox" 
                            checked={findItem == -1 ? true : false} 
                            onClick={this._updateSelectLeague.bind(this, league.Id)}
                            onChange={(e)=> {}} />
                        <span></span>
                        <span>{league.Name}</span>
                    </label>
                )
            })

            var title = ''
            var sport = ''
            for(let key in sportItemMenu) {
                if(sportItemMenu[key].id == resultSports) {
                    sport = key;
                }
            }
            var sportString = sportMenuPanel[sport.toLowerCase()];

            // if(menuFilterActive.typeOdd == 'doubleChange') {
            //     title = `${sportString} - ${menuFilter.doubleChangeTitle}`
            // }
            // else if(menuFilterActive.typeOdd == 'oddEvenTotalGoal') {
            //     title = `${sportString} - ${menuFilter.titleOddEvenTotalGoal}`
            // }
            //else {
                switch(tabLinkActive) {
                    case 'tab_live':
                        title = menuFilter.titleLive;
                    break;
                    case 'tab_early':
                        title = menuFilter.titleEarly;
                    break;
                    default:
                        title = menuFilter.titleToDay;
                    break;
                }
            // }

            var sortTitle = ''
            switch(isSortByLeague) {
                case false:
                    sortTitle = menuFilter.sortByLeague;
                break;
                default:
                    sortTitle = menuFilter.sortByTime;
                break;
            }

            return (
                <div className="flex container-min">
                    <div className="flex-1 flex-v-end">
                        <h6 className="title-page"><i className="fa fa-caret-square-o-right"></i> {title}</h6>
                    </div>
                    <div className="flex-3 text-right">
                        <a 
                            className="btn" 
                            style={{marginRight: '3px'}}
                            onClick={this._onSortByLeague.bind(this)}
                        >
                                {sortTitle}
                        </a>
                        <div className="dropdown-modal">
                            <a className="btn" id="selectLeague" style={{marginRight: '3px'}}>{menuFilter.selectLeague ||  'Select League'}</a>
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h4 className="title">
                                        <img src="/assets/images/mbModIcon.png" alt=""/>
                                        &nbsp;
                                        {menuFilter.selectLeagueTitle || 'SELECT LEAGUE'}
                                    </h4>
                                    <a className="close" onClick={(e)=> {
                                        $("#selectLeague").click();
                                    }}>
                                        <img src="/assets/images/ft_close.gif" alt=""/>
                                    </a>
                                </div>
                                <div className="modal-body">
                                    <div className="text-right margin-bottom-10">
                                        <button 
                                            className="btn btn-blue margin-right-5" 
                                            onClick={this._onSelectLeagueAll.bind(this)} 
                                        >
                                            {menuFilter.selectAllBtn || 'Select All'}
                                        </button>
                                        <a 
                                            className="btn btn-blue margin-right-5" 
                                            onClick={this._onDeSelectLeagueAll.bind(this)} 
                                        >
                                            {menuFilter.deSelectAllBtn || 'DeSelect All'}
                                        </a>
                                        <a 
                                            className="btn btn-blue" 
                                            onClick={this._onSelectLeague.bind(this)} 
                                        >
                                            {menuFilter.okBtn || 'OK'}
                                        </a>
                                    </div>
                                    <div className="checkbox-list-column">
                                        {list_leagueName}
                                    </div>
                                </div>
                            </div>
                        </div>
                        {tableType}
                        {currency}
                        <a className="btn" onClick={this._onClickRefresh.bind(this, menuFilterActive.typeOdd)}>{menuFilter.refresh || 'Refresh'}</a>
                    </div>
                </div>
            )
        }
    }
    render(){
    	let { 
    		menuFilter, 
            menuFilterActive, 
            oddType, 
            oddTypeList, 
            leagueName, 
            tabLinkActive, 
            isSortByLeague,
            resultSports,  
            sportItemMenu, 
            sportMenuPanel, 
    	} = this.props;
    	if(!Helper.checkObj(menuFilter)) menuFilter = {}
        if(!Helper.checkObj(sportMenuPanel)) sportMenuPanel = {}

        return this._renderMenuFilter(menuFilter, menuFilterActive, oddTypeList, oddType, leagueName, tabLinkActive, isSortByLeague)

    }
}

MenuFilterComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		menuFilter: state.helper.language.menuFilter, 
        menuFilterActive: state.helper.menuFilterActive, 
        oddTypeList: state.helper.oddTypeList, 
        oddType: state.odd.oddType, 
        leagueName: getLeagueNameList(state), 
        tabLinkActive: state.helper.tabLinkActive, 
        isSortByLeague: state.odd.isSortByLeague, 
        resultSports: state.auth.resultSports, 
        sportItemMenu: state.helper.sportItemMenu, 
        sportMenuPanel: state.helper.language.sportMenuPanel, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...helperAction,
            ...oddAction, 
            ...userAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuFilterComponent)