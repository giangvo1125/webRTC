import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import TableSimple from './table_simple'
import RowSimple from './row_simple'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

import { getOddDataByTabLink, sortLeague } from '../../selector'

let { expireCookies } = config

class TableSimpleComponent extends Component{
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
        this.props.getLine(data);
        // this.props.setdataBet(data);
    }
    componentDidMount() {
        this.autoGetDataOdd = setInterval(() => {
            this.props.getDataOdd();
        }, config.timeRefresh * 1000);
        if(!Helper.checkData(Cookies.get('token'))) {
            clearInterval(this.autoGetDataOdd)
        }
    }
    componentWillUnmount() {
        clearInterval(this.autoGetDataOdd)
        clearInterval(this.autoChangeOdd)
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
    componentDidUpdate() {
        let listElem = $('.link-a')
        let dataChange = $('.data-change')
        clearInterval(this.autoChangeOdd)
        if(dataChange.length > 0) {
            this.autoChangeOdd = setInterval(() => {
                listElem.each((index, el) => {
                    let elem = $(el)
                    if(elem.hasClass('data-change')) {
                        if(elem.hasClass('odds-change-simple')) {
                            elem.removeClass('odds-change-simple')
                        }
                        else {
                            elem.addClass('odds-change-simple')
                        }
                        if(elem.hasClass('odds-change')) {
                            elem.removeClass('odds-change')
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
        let { oddData, tableSimple, tabLinkActive, resultSports } = this.props;
        if(!Helper.checkObj(tableSimple)) tableSimple = {}
        let list_item = [];
        list_item = oddData.map((item, index) => {
            let key = `${item.Name}-${index}`;
            return (
                <TableSimple 
                    _openBetItem={this._openBetItem.bind(this)} 
                    item={item}
                    key={key}
                />
            )
            // let list_matches = []
            // item.matches.forEach((match, matchIndex) => {
            //     let {
            //         firstTime, 
            //         fullTime
            //     } = match;
            //     let maxLengthOddFullTime = Math.max(
            //         Helper.checkObj(fullTime.MoneyLine) ? fullTime.MoneyLine.lengthOdd : 0, 
            //         Helper.checkObj(fullTime.Spread) ? fullTime.Spread.lengthOdd: 0, 
            //         Helper.checkObj(fullTime.Total) ? fullTime.Total.lengthOdd: 0, 
            //         Helper.checkObj(fullTime.oddEvent) ? fullTime.oddEvent.lengthOdd: 0
                    
            //     );

            //     let maxLengthOddFirstTime = Math.max(
            //         Helper.checkObj(firstTime.MoneyLine) ? firstTime.MoneyLine.lengthOdd : 0, 
            //         Helper.checkObj(firstTime.Spread) ? firstTime.Spread.lengthOdd : 0, 
            //         Helper.checkObj(firstTime.Total) ? firstTime.Total.lengthOdd : 0, 
            //         Helper.checkObj(firstTime.oddEvent) ? firstTime.oddEvent.lengthOdd: 0
            //     );

            //     let maxLengthOdd = Math.max(maxLengthOddFullTime, maxLengthOddFirstTime)
            //     for(let i = 0; i < maxLengthOdd; i++) {
            //         let obj = {
            //             firstTime: {}, 
            //             fullTime: {}, 
            //         }
            //         for(let keyOdd in firstTime) {
            //             obj.firstTime[keyOdd] = Helper.checkObj(firstTime[keyOdd]) && Helper.checkObj(firstTime[keyOdd].lines[i]) ?  
            //                                     firstTime[keyOdd].lines[i] : {}
            //         }
            //         for(let keyOdd in fullTime) {
            //             obj.fullTime[keyOdd] = Helper.checkObj(fullTime[keyOdd]) && Helper.checkObj(fullTime[keyOdd].lines[i]) ?  
            //                                     fullTime[keyOdd].lines[i] : {}
            //         }
            //         let matchKey = `${match.Id}-${item.Id}-${i}`
            //         list_matches.push(
            //             <RowSimple 
            //                 style={matchIndex%2 === 0 ? {background: 'white'}: {}}
            //                 key={matchKey} 
            //                 match={match} 
            //                 period={obj} 
            //                 periodIndex={i} 
            //                 keyObj={matchKey}
            //                 betItem={this._openBetItem.bind(this, item.Name, matchKey)} 
            //                 maxLengthOdd={maxLengthOdd}
            //                 _onCheckIsFavoriteLeague={this._onCheckIsFavoriteLeague.bind(this, item, resultSports)}
            //             />
            //         )

            //     }
                
            // })
            // let favoriteLeague = {}
            // if(Helper.checkData(Cookies.get('favoriteLeague'))) {
            //     favoriteLeague = JSON.parse(Cookies.get('favoriteLeague'))
            // }
            // let isFavoriteLeague = false;

            // if(Helper.checkObj(favoriteLeague)) {
            //     if(Helper.checkArray(favoriteLeague[resultSports])) {
            //         favoriteLeague[resultSports].forEach((i) => {
            //             if(i == item.Id) 
            //                 isFavoriteLeague = true;
            //         })
            //     }
            // }
            // return (
            //     <tbody key={key}>
            //         <tr className="league">
            //             <td colSpan="17">
            //                 <div>
            //                     <span>{item.Name}</span>
            //                     <a className="favAdd" onClick={this._onAddToFavoriteMenu.bind(this, item)}>
            //                         {
            //                             isFavoriteLeague == true ? 
            //                             <img src="/assets/images/FavAdd.gif" alt=""/> : 
            //                             <img src="/assets/images/FavOri.gif" alt=""/>
            //                         }
            //                     </a>
            //                     <a href="#" className="or"><img src="/assets/images/or.gif" alt=""/></a>
            //                 </div>
            //             </td>
            //         </tr>
            //         {list_matches}
            //     </tbody>
            // )
        })
    	return (
    		<div className="margin-top-5 container-min">
                <table className={tabLinkActive == 'tab_live' ? 'table-live-single' : 'table-today-single'}>
                    <thead>
                        <tr>
                            <th rowSpan="2">{tableSimple.time || 'Time'}</th>
                            <th rowSpan="2" colSpan="2">{tableSimple.event || 'Event'}</th>
                            <th colSpan="6">{tableSimple.fullTime || 'Full time'}</th>
                            <th colSpan="7">{tableSimple.firstHalf || 'First Half'}</th>
                        </tr>
                        <tr>
                            <th>{tableSimple.hdp || 'HDP'}</th>
                            <th>{tableSimple.home || 'H'}</th>
                            <th>{tableSimple.away || 'A'}</th>
                            <th>{tableSimple.goal || 'GOAL'}</th>
                            <th>{tableSimple.over || 'Over'}</th>
                            <th>{tableSimple.under || 'Under'}</th>
                            <th>{tableSimple.hdp || 'HDP'}</th>
                            <th>{tableSimple.home || 'H'}</th>
                            <th>{tableSimple.away || 'A'}</th>
                            <th>{tableSimple.goal || 'GOAL'}</th>
                            <th>{tableSimple.over || 'Over'}</th>
                            <th colSpan="2">{tableSimple.under || 'Under'}</th>
                        </tr>
                    </thead>
                    {list_item}
                </table>
            </div>
    	)
    }
}

TableSimpleComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
        tableSimple: state.helper.language.tableSimple, 
        oddData: sortLeague(state), 
        tabLinkActive: state.helper.tabLinkActive, 
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

export default connect(mapStateToProps, mapDispatchToProps)(TableSimpleComponent)