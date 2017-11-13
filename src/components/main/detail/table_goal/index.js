import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TableGoalLeague from './table_goal'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

import { sortGoalLeague } from '../../selector'

let { expireCookies } = config

class TableGoal extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.autoGetDataOdd = ''
        this.autoChangeOdd = ''
    }
	componentWillMount() {
	}
    _openBetItem(Name, keyBet, teamNumber, obj, teamObj, matchString, matchKey) {
        let data = {
            keyBet: keyBet, 
            teamNumber: teamNumber, 
            period: obj, 
            teamObj: teamObj, 
            Name: Name,
            matchString: matchString, 
            matchKey: matchKey, 
        }
        // this.props.changeShowBetPanel(true);
        this.props.getLine(data, 'goal');
        // this.props.setdataBet(data);
    }
    componentDidMount() {
        this.autoGetDataOdd = setInterval(() => {
            this.props.getGoalOdd();
        }, config.timeRefresh * 1000);
        if(!Helper.checkData(Cookies.get('token'))) {
            clearInterval(this.autoGetDataOdd)
        }
    }
    componentWillUnmount() {
        clearInterval(this.autoGetDataOdd)
    }
    componentDidUpdate() {
        let listElem = $('.link-a')
        let dataChange = $('.data-change')
        clearInterval(this.autoChangeOdd)
        if(dataChange.length > 0) {
            this.autoChangeOdd = setInterval(() => {
                listElem.each((index, el) => {
                    let elem = $(el)
                    if(elem.hasClass('data-change')) {
                        if(elem.hasClass('odds-change')) {
                            elem.removeClass('odds-change')
                        }
                        else {
                            elem.addClass('odds-change')
                        }
                        if(elem.hasClass('odds-change-simple')) {
                            elem.removeClass('odds-change-simple')
                        } 
                    }
                    else {
                        elem.removeClass('odds-change')
                        elem.removeClass('odds-change-simple')
                    }
                })
            }, config.oddChangeTime)
        }
    }
    render(){ 
        let { goalOdd, tableDouble, tabLinkActive, isSortByLeague, resultSports } = this.props;
        if(!Helper.checkObj(tableDouble)) tableDouble = {}
        let list_item = [];
        list_item = goalOdd.map((item, index) => {
            let key = `${item.Name}-${index}`;
            return (
                <TableGoalLeague 
                    _openBetItem={this._openBetItem.bind(this, item.Name)} 
                    item={item}
                    key={key}
                />
            )
        })

    	return (
    		<div className="margin-top-5 container-min">
                <table className="table-today-normal">
                    <thead>
                        <tr>
                            <th>Time</th>
                            <th>Event</th>
                            <th>First Goal</th>
                            <th>Last Goal</th>
                            <th>No Goal</th>
                        </tr>
                    </thead>
                    {list_item}
                </table>
            </div>
    	)
    }
}

TableGoal.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
        tableDouble: state.helper.language.tableDouble, 
        goalOdd: sortGoalLeague(state), 
        tabLinkActive: state.helper.tabLinkActive, 
        isSortByLeague: state.odd.isSortByLeague, 
        resultSports: state.auth.resultSports, 
        isShowFavorite: state.helper.isShowFavorite, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...helperAction,
            ...oddAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableGoal)
