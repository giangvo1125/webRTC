import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TableDouble from './table_double'
import RowDouble from './row_double'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

import { getOddDataByTabLink, filterLeague, sortLeague } from '../../selector'

let { expireCookies } = config

class TableDoubleComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.autoGetDataOdd = ''
        this.autoChangeOdd = ''
    }
	componentWillMount() {
	}
    _openBetItem(Name, matchKey, keyBet, teamNumber, obj, teamObj, matchString) {
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
        let BetType = 'hdp';
        if(keyBet == 'oddEvent')
            BetType = 'oddEvent'
        this.props.getLine(data, BetType);
        // this.props.setdataBet(data);
    }
    componentDidMount() {
        let { menuFilterActive: { typeOdd } } = this.props;
        this.autoGetDataOdd = setInterval(() => {
            if(typeOdd != 'mixParlay')
                this.props.getDataOdd();
            else 
                this.props.getParlayOdd();
        }, config.timeRefresh * 1000);
        if(!Helper.checkData(Cookies.get('token'))) {
            clearInterval(this.autoGetDataOdd)
        }
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
    componentWillUnmount() {
        clearInterval(this.autoGetDataOdd)
    }
    _onAddToFavoriteMenu(league) {
        let { resultSports } = this.props;
        let favoriteLeague = Cookies.get('favoriteLeague');
        let favoriteMatch = Cookies.get('favoriteMatch');
        
        if(favoriteLeague == null) {
            let obj = {}
            obj[resultSports] = [];
            obj[resultSports].push(league.Id);
            Cookies.set('favoriteLeague', JSON.stringify(obj), {expires: expireCookies})
            if(favoriteMatch == null) {
                let obj = {}
                obj[resultSports] = [];
                league.matches.forEach((match) => {
                    obj[resultSports].push(match.Id)
                })
                Cookies.set('favoriteMatch', JSON.stringify(obj), {expires: expireCookies})
            }
            else {
                let obj = JSON.parse(favoriteMatch)
                league.matches.forEach((match) => {
                    let findIndex = _.findIndex(obj[resultSports], (i) => {
                        return i == match.Id;
                    })
                    if(findIndex == -1)
                        obj[resultSports].push(match.Id)
                })
                Cookies.set('favoriteMatch', JSON.stringify(obj), {expires: expireCookies})
            }
        }
        else {
            let obj = JSON.parse(favoriteLeague)
            if(Array.isArray(obj[resultSports])) {
                let findItem = _.findIndex(obj[resultSports], (i) => {
                    return i == league.Id
                });
                if(findItem == -1) {
                    obj[resultSports].push(league.Id);
                    if(favoriteMatch == null) {
                        let obj = {}
                        obj[resultSports] = [];
                        league.matches.forEach((match) => {
                            obj[resultSports].push(match.Id)
                        })
                        Cookies.set('favoriteMatch', JSON.stringify(obj), {expires: expireCookies})
                    }
                    else {
                        let obj = JSON.parse(favoriteMatch)
                        league.matches.forEach((match) => {
                            let findIndex = _.findIndex(obj[resultSports], (i) => {
                                return i == match.Id;
                            })
                            if(findIndex == -1)
                                obj[resultSports].push(match.Id)
                        })
                        Cookies.set('favoriteMatch', JSON.stringify(obj), {expires: expireCookies})
                    }

                }
                else {
                    obj[resultSports].splice(findItem, 1)
                    if(favoriteMatch != null)  {
                        let obj = JSON.parse(favoriteMatch)
                        league.matches.forEach((match) => {
                            let findIndex = _.findIndex(obj[resultSports], (i) => {
                                return i == match.Id;
                            })
                            if(findIndex != -1)
                                obj[resultSports].splice(findIndex, 1)
                        })
                        Cookies.set('favoriteMatch', JSON.stringify(obj), {expires: expireCookies})
                    }
                }
            }
            else {
                obj[resultSports] = [];
                obj[resultSports].push(league.Id)
            }
            Cookies.set('favoriteLeague', JSON.stringify(obj), {expires: expireCookies})
        }
        if(this.props.isShowFavorite == true) {
            this.props.updateIsShowFavorite(true, Math.random());
        }
        this.forceUpdate();
    }
    _onForceUpdate() {
        this.forceUpdate()
    }
    _onCheckIsFavoriteLeague(league, sportId) {
        let favoriteLeague = Cookies.get('favoriteLeague');
        let favoriteMatch = Cookies.get('favoriteMatch');
        let objLeague = {};
        if(Helper.checkData(favoriteLeague)) {
            objLeague = JSON.parse(favoriteLeague);
        }
        else {
            objLeague[sportId] = []
        }
        let findLeague = _.findIndex(objLeague[sportId], (i) => {
            return i == league.Id;
        })
        if(findLeague == -1) {
            if(Helper.checkData(favoriteMatch)) {
                let objMatch = JSON.parse(favoriteMatch);
                let count = 0;
                league.matches.forEach((i) => {
                    objMatch[sportId].forEach((matchId) => {
                        if(i.Id == matchId) {
                            count++;
                        }
                    })
                })
                if(count == league.matches.length) {
                    objLeague[sportId].push(league.Id)
                    Cookies.set('favoriteLeague', objLeague, {expires: expireCookies})
                }
                this.forceUpdate();
            }
        }
        else {
            objLeague[sportId].splice(findLeague, 1)
            Cookies.set('favoriteLeague', objLeague, {expires: expireCookies})
            this.forceUpdate();
        }
        
    }
    render(){ 
        let { oddData, tableDouble, tabLinkActive, isSortByLeague, resultSports } = this.props;
        if(!Helper.checkObj(tableDouble)) tableDouble = {}
        let list_item = [];
        list_item = oddData.map((item, index) => {
            let key = `${item.Name}-${index}`;
            return (
                <TableDouble 
                    _openBetItem={this._openBetItem.bind(this)} 
                    item={item}
                    key={key}
                />
            )
        })
    	return (
    		<div className="margin-top-5 container-min">
                <table className={tabLinkActive == 'tab_live' ? 'table-live' : 'table-today'}>
                    <thead>
                        <tr>
                            <th>{tableDouble.time || 'Time'}</th>
                            <th colSpan="2">{tableDouble.event || 'Event'}</th>
                            <th>{tableDouble.ftHdp || 'FT.HDP'}</th>
                            <th>{tableDouble.ftOu || 'FT.O/U'}</th>
                            <th>{tableDouble.ft1x2 || 'FT.1x2'}</th>
                            <th className="oe">{tableDouble.oe || 'O/E'}</th>
                            <th>{tableDouble.fhHdp || '1H.HDP'}</th>
                            <th>{tableDouble.fhOu || '1H.O/U'}</th>
                            <th colSpan="2">{tableDouble.fh1x2 || '1H.1x2'}</th>
                        </tr>
                    </thead>
                    {list_item}
                </table>
            </div>
    	)
    }
}

TableDoubleComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
        tableDouble: state.helper.language.tableDouble, 
        oddData: sortLeague(state), 
        tabLinkActive: state.helper.tabLinkActive, 
        isSortByLeague: state.odd.isSortByLeague, 
        resultSports: state.auth.resultSports, 
        isShowFavorite: state.helper.isShowFavorite, 
        menuFilterActive: state.helper.menuFilterActive, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...helperAction,
            ...oddAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableDoubleComponent)
