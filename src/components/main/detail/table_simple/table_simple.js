import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RowSimple from './row_simple'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

import { getOddDataByTabLink, sortLeague } from '../../selector'

let { expireCookies } = config

class TableSimpleLeagueComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
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
    render(){ 
    	let  { resultSports, item, key } = this.props;
    	let list_matches = []
        item.matches.forEach((match, matchIndex) => {
            let {
                firstTime, 
                fullTime
            } = match;
            let maxLengthOddFullTime = Math.max(
                Helper.checkObj(fullTime.MoneyLine) ? fullTime.MoneyLine.lengthOdd : 0, 
                Helper.checkObj(fullTime.Spread) ? fullTime.Spread.lengthOdd: 0, 
                Helper.checkObj(fullTime.Total) ? fullTime.Total.lengthOdd: 0, 
                Helper.checkObj(fullTime.oddEvent) ? fullTime.oddEvent.lengthOdd: 0
                
            );

            let maxLengthOddFirstTime = Math.max(
                Helper.checkObj(firstTime.MoneyLine) ? firstTime.MoneyLine.lengthOdd : 0, 
                Helper.checkObj(firstTime.Spread) ? firstTime.Spread.lengthOdd : 0, 
                Helper.checkObj(firstTime.Total) ? firstTime.Total.lengthOdd : 0, 
                Helper.checkObj(firstTime.oddEvent) ? firstTime.oddEvent.lengthOdd: 0
            );

            let maxLengthOdd = Math.max(maxLengthOddFullTime, maxLengthOddFirstTime)
            for(let i = 0; i < maxLengthOdd; i++) {
                let obj = {
                    firstTime: {}, 
                    fullTime: {}, 
                }
                for(let keyOdd in firstTime) {
                    obj.firstTime[keyOdd] = Helper.checkObj(firstTime[keyOdd]) && Helper.checkObj(firstTime[keyOdd].lines[i]) ?  
                                            firstTime[keyOdd].lines[i] : {}
                }
                for(let keyOdd in fullTime) {
                    obj.fullTime[keyOdd] = Helper.checkObj(fullTime[keyOdd]) && Helper.checkObj(fullTime[keyOdd].lines[i]) ?  
                                            fullTime[keyOdd].lines[i] : {}
                }
                let matchKey = `${match.Id}-${item.Id}-${i}`
                list_matches.push(
                    <RowSimple 
                        style={matchIndex%2 === 0 ? {background: 'white'}: {}}
                        key={matchKey} 
                        match={match} 
                        period={obj} 
                        periodIndex={i} 
                        keyObj={matchKey}
                        betItem={this.props._openBetItem.bind(this, item.Name, matchKey)} 
                        maxLengthOdd={maxLengthOdd}
                        _onCheckIsFavoriteLeague={this._onCheckIsFavoriteLeague.bind(this, item, resultSports)}
                    />
                )

            }
            
        })
        let favoriteLeague = {}
        if(Helper.checkData(Cookies.get('favoriteLeague'))) {
            favoriteLeague = JSON.parse(Cookies.get('favoriteLeague'))
        }
        let isFavoriteLeague = false;

        if(Helper.checkObj(favoriteLeague)) {
            if(Helper.checkArray(favoriteLeague[resultSports])) {
                favoriteLeague[resultSports].forEach((i) => {
                    if(i == item.Id) 
                        isFavoriteLeague = true;
                })
            }
        }
        return (
            <tbody key={key}>
                <tr className="league">
                    <td colSpan="17">
                        <div>
                            <span>{item.Name}</span>
                            <a className="favAdd" onClick={this._onAddToFavoriteMenu.bind(this, item)}>
                                {
                                    isFavoriteLeague == true ? 
                                    <img src="/assets/images/FavAdd.gif" alt=""/> : 
                                    <img src="/assets/images/FavOri.gif" alt=""/>
                                }
                            </a>
                            <a href="#" className="or"><img src="/assets/images/or.gif" alt=""/></a>
                        </div>
                    </td>
                </tr>
                {list_matches}
            </tbody>
        )
    }
}

TableSimpleLeagueComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
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

export default connect(mapStateToProps, mapDispatchToProps)(TableSimpleLeagueComponent)