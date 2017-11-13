import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

let { expireCookies } = config

class RowSimpleComponent extends Component{
    constructor(props, context) {
        super(props)
        context.router
        this.isCreated = false;
        this.listKeyChange = []
        this.stringUpdate = [];
    }
    componentWillMount() {
    }
    componentDidMount() {
        let {
            keyObj, 
            period, 
        } = this.props;
        // this.props.updateRowData(keyObj, period)
        this.setState({
            previousPeriod: period 
        })
    }
    _onBetItem(keyBet, keyTeam, obj, Team1, Team2, matchString) {
        if(typeof this.props.betItem === 'function') {
            let teamObj ={
                Team1: Team1, 
                Team2: Team2, 
            }
            this.props.betItem(keyBet, keyTeam, obj, teamObj, matchString)
        }
    }
    componentWillReceiveProps(nextProps) {
        let {
            props: {
                keyObj,
            }, 
            state: {
                previousPeriod
            }
        } = this;
        let {
            firstTime, 
            fullTime
        } = nextProps.period
        for(let key in nextProps.period) {
            if(Helper.checkObj(nextProps.period[key]) && previousPeriod[key]) {
                let united = nextProps.period[key];
                for(let oddsSide in united) {
                    if(Helper.checkObj(united[oddsSide]) && previousPeriod[key][oddsSide]) {
                        let side = united[oddsSide];
                        for(let value in side) {
                            let stringId = `${key}-${oddsSide}-${value}-${keyObj}`
                            if($(`#${stringId}`).length) {
                                if(side[value] != previousPeriod[key][oddsSide][value]) {
                                    // $(stringId).addClass('data-change')
                                    this.stringUpdate.push(stringId)

                                }
                                else {
                                    let findIndex = _.findIndex(this.stringUpdate, (i) => {
                                        return i == stringId
                                    })
                                    if(findIndex != -1)
                                        this.stringUpdate.splice(findIndex, 1)
                                    // $(`#${stringId}`).removeClass('data-change')
                                    // $(`#${stringId}`).removeClass('odds-change-simple')
                                }
                            }
                        }
                    }
                }
            }
        }
        this.setState({previousPeriod: nextProps.period})

    }
    getMinutesString(timeLive) {
        // 1: '1H',
        // 2: 'HT',
        // 3: '2H',
        // 4: 'END OF REGULAR TIME',
        // 5: 'FIRST HALF EXTRA TIME',
        // 6: 'EXTRA TIME HALF TIME',
        // 7: 'SECOND HALF EXTRA TIME',
        // 8: 'END OF EXTRA TIME',
        // 9: 'END OF GAME',
        // 10: 'GAME IS TEMPORARY SUSPENDED',
        // 11: 'PENALTIES',

        switch(timeLive.Status) {
            case 1:
                return `1H ${timeLive.Time}'`
            break;
            case 2:
                return 'HT'
            break;
            case 3:
                return `2H ${timeLive.Time}'`
            break;
            default: 
                return;
            break;
        }
    }
    _onAddToFavoriteMenu(match) {
        let { resultSports } = this.props;
        let favoriteMatch = Cookies.get('favoriteMatch');
        if(favoriteMatch == null) {
            let obj = {}
            obj[resultSports] = [];
            obj[resultSports].push(match.Id);
            Cookies.set('favoriteMatch', JSON.stringify(obj), {expires: expireCookies})
            this.props._onCheckIsFavoriteLeague();
        }
        else {
            let obj = JSON.parse(favoriteMatch)
            if(Helper.checkArray(obj[resultSports])) {
                let findItem = _.findIndex(obj[resultSports], (i) => {
                    return i == match.Id
                });
                if(findItem == -1) {
                    obj[resultSports].push(match.Id);
                }
                else {
                    obj[resultSports].splice(findItem, 1)

                }
            }
            else {
                obj[resultSports] = [];
                obj[resultSports].push(match.Id)
            }
            Cookies.set('favoriteMatch', JSON.stringify(obj), {expires: expireCookies})
            // this.props._onCheckIsFavoriteLeague();
            if(this.props.isShowFavorite == true) {
                this.props.updateIsShowFavorite(true, Math.random());
            }
        }
        // this.forceUpdate();
        this.props._onCheckIsFavoriteLeague();
    }
    render(){
        let fullTimeSpreadPoints = '';
        let firstTimeSpreadPoints = '';
        let isFullTimeSpreadPointsForTeam1 = true;
        let isFirstTimeSpreadPointsForTeam1 = true;
        let {
            period: {
                firstTime, 
                fullTime, 
            }, 
            periodIndex, 
            match, 
            keyObj, 
            oddType,
            resultSports,  
            tweakOdd, 
        } = this.props;

        let isLive = moment(match.Start).isSame(moment(), 'day');
        if(Helper.checkObj(fullTime)) {
            if(Helper.checkObj(fullTime.Spread)) {
                if(fullTime.Spread.Point % 0.5 == 0)
                    fullTimeSpreadPoints = Math.abs(fullTime.Spread.Point)
                else
                    fullTimeSpreadPoints = `${Math.abs(fullTime.Spread.Point)-0.25} - ${Math.abs(fullTime.Spread.Point)+0.25}`
                
                if(fullTime.Spread.Point < 0) 
                    isFullTimeSpreadPointsForTeam1 = true
                else 
                    isFullTimeSpreadPointsForTeam1 = false;
            }
        }

        if(Helper.checkObj(firstTime)) {
            if(Helper.checkObj(firstTime.Spread)) {
                if(firstTime.Spread.Point % 0.5 == 0)
                    firstTimeSpreadPoints = Math.abs(firstTime.Spread.Point)
                else 
                    firstTimeSpreadPoints = `${Math.abs(firstTime.Spread.Point)-0.25} - ${Math.abs(firstTime.Spread.Point)+0.25}`
                
                if(firstTime.Spread.Point < 0) 
                    isFirstTimeSpreadPointsForTeam1 = true
                else 
                    isFirstTimeSpreadPointsForTeam1 = false;
            }
        }
        let minutes = '';
        let liveString = '';
        if(Helper.checkObj(match.TimeLive)) {
            minutes = this.getMinutesString(match.TimeLive)
            liveString = `${match.Team1Score || 0} - ${match.Team2Score || 0}`
        }
        else { 
            minutes = moment(match.Start).format('HH:mm');
            if(isLive == true) {
                liveString = 'LIVE'
            }
            else {
                liveString = moment(match.Start).format('MM/DD')
            }
        }

        let favoriteMatch = {}
        if(Helper.checkData(Cookies.get('favoriteMatch'))) {
            favoriteMatch = JSON.parse(Cookies.get('favoriteMatch'))
        }
        let isFavoriteMatch = false;

        if(Helper.checkObj(favoriteMatch)) {
            if(Helper.checkArray(favoriteMatch[resultSports])) {
                favoriteMatch[resultSports].forEach((item) => {
                    if(item == match.Id) 
                        isFavoriteMatch = true;
                })
            }
        }
    
        return (
            <tr className="points" style={this.props.style || {}}>
                {
                    periodIndex == 0 ? 
                    <td className="time">
                        <div>
                            <span className={`${isLive == true ? 'text-red' : 'text-black'}`}>
                                {liveString}
                            </span>
                        </div>
                        <div>
                            <span className="text-black">
                                {minutes}
                            </span>
                        </div>
                    </td> : 
                    <td className="time"></td>
                }
                {
                    periodIndex == 0 ? 
                    <td className="event">
                        <div>
                            <span 
                                className={
                                    isFirstTimeSpreadPointsForTeam1 == true ? 
                                    "text-red" : "text-black"
                                }
                            >
                                {match.Team1}
                            </span>
                        </div>
                        <div>
                            <span 
                                className={
                                    isFirstTimeSpreadPointsForTeam1 != true ? 
                                    "text-red" : "text-black"
                                }
                            >
                                {match.Team2}
                            </span>
                        </div>
                    </td> : 
                    <td className="event"></td>
                }
                <td className="mark">
                    {
                        periodIndex == 0 ? 
                        <div>
                            <span>
                                {
                                    1 == 2 ?
                                    <img src="/assets/images/tv.gif" alt=""/> : ''
                                }
                            </span>
                            <span><img src="/assets/images/LiveCast.gif" alt=""/></span>
                            <span onClick={this._onAddToFavoriteMenu.bind(this, match)}>
                                {
                                    isFavoriteMatch == false ? 
                                    <img src="/assets/images/FavOri.gif" alt=""/> : 
                                    <img src="/assets/images/FavAdd.gif" alt=""/>
                                }
                            </span>
                        </div> : ''
                    }
                </td>
                <td className="hdp">
                    <div>
                        <span>{fullTimeSpreadPoints}</span>
                    </div>
                </td>
                <td 
                    className={ 
                        `link-a H ${Helper.checkObj(fullTime.Spread) ? 
                        Helper._parseOddsEntry({
                                    value: fullTime.Spread.Team1, 
                                    type: fullTime.Spread.Type, 
                                }, oddType, tweakOdd) < 0 ? 
                        'text-red' : 'text-black' : 'text-black'} 
                        ${
                            Helper.isExistedDataInArray(this.stringUpdate, `fullTime-Spread-Team1-${keyObj}`) ? 
                            'data-change' : ''
                        }`
                    }
                    id={`fullTime-Spread-Team1-${keyObj}`}
                    onClick={this._onBetItem.bind(this, 'HDP', 1, fullTime.Spread, match.Team1, match.Team2, '')}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(fullTime.Spread) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Spread.Team1, 
                                    type: fullTime.Spread.Type, 
                                }, oddType, tweakOdd) : 
                                ''
                            }
                        </span>
                    </div>
                </td>
                <td 
                    className={ 
                        `link-a A ${Helper.checkObj(fullTime.Spread) ? 
                        Helper._parseOddsEntry({
                                    value: fullTime.Spread.Team2, 
                                    type: fullTime.Spread.Type, 
                                }, oddType, tweakOdd) < 0 ? 
                        'text-red' : 'text-black' : 'text-black'} 
                        ${
                            Helper.isExistedDataInArray(this.stringUpdate, `fullTime-Spread-Team2-${keyObj}`) ? 
                            'data-change' : ''
                        }`
                    }
                    id={`fullTime-Spread-Team2-${keyObj}`}
                    onClick={this._onBetItem.bind(this, 'HDP', 2, fullTime.Spread, match.Team1, match.Team2, '')}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(fullTime.Spread) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Spread.Team2, 
                                    type: fullTime.Spread.Type,
                                }, oddType, tweakOdd) : 
                                ''
                            }
                        </span>
                    </div>
                </td>
                <td 
                    className={'goal'}
                    id={`fullTime-Totlas-Points-${keyObj}`}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(fullTime.Total) ? 
                                fullTime.Total.Point : ''
                            }
                        </span>
                    </div>
                </td>
                <td 
                    className={ 
                        `link-a over ${Helper.checkObj(fullTime.Total) ? 
                        Helper._parseOddsEntry({
                                    value: fullTime.Total.Team1, 
                                    type: fullTime.Total.Type,
                                }, oddType, tweakOdd) < 0 ? 
                        'text-red' : 'text-black' : 'text-black'} 
                        ${
                            Helper.isExistedDataInArray(this.stringUpdate, `fullTime-Total-Team1-${keyObj}`) ? 
                            'data-change' : ''
                        }`
                    }
                    id={`fullTime-Total-Team1-${keyObj}`}
                    onClick={this._onBetItem.bind(this, 'O/U', 1, fullTime.Total, match.Team1, match.Team2, '')}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(fullTime.Total) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Total.Team1, 
                                    type: fullTime.Total.Type, 
                                }, oddType, tweakOdd) : 
                                ''
                            }
                        </span>
                    </div>
                </td>
                <td 
                    className={ 
                        `link-a under ${Helper.checkObj(fullTime.Total) ? 
                        Helper._parseOddsEntry({
                                    value: fullTime.Total.Team2, 
                                    type: fullTime.Total.Type,
                                }, oddType, tweakOdd) < 0 ? 
                        'text-red' : 'text-black' : 'text-black'} 
                        ${
                            Helper.isExistedDataInArray(this.stringUpdate, `fullTime-Total-Team2-${keyObj}`) ? 
                            'data-change' : ''
                        }`
                    }
                    id={`fullTime-Total-Team2-${keyObj}`}
                    onClick={this._onBetItem.bind(this, 'O/U', 2, fullTime.Total, match.Team1, match.Team2, '')}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(fullTime.Total) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Total.Team2, 
                                    type: fullTime.Total.Type, 
                                }, oddType, tweakOdd) : 
                                ''
                            }
                        </span>
                    </div>
                </td>

                <td className="hdp">
                    <div>
                        <span>
                            {firstTimeSpreadPoints}
                        </span>
                    </div>
                </td>
                <td 
                    className={ 
                        `link-a H ${Helper.checkObj(firstTime.Spread) ? 
                        Helper._parseOddsEntry({
                                    value: firstTime.Spread.Team1, 
                                    type: firstTime.Spread.Type,
                                }, oddType, tweakOdd) < 0 ? 
                        'text-red' : 'text-black' : 'text-black'} 
                        ${
                            Helper.isExistedDataInArray(this.stringUpdate, `firstTime-Spread-Team1-${keyObj}`) ? 
                            'data-change' : ''
                        }`
                    }
                    id={`firstTime-Spread-Team1-${keyObj}`}
                    onClick={this._onBetItem.bind(this, 'HDP', 1, firstTime.Spread, match.Team1, match.Team2, 'firstTime')}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(firstTime.Spread) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Spread.Team1, 
                                    type: firstTime.Spread.Type, 
                                }, oddType, tweakOdd) : 
                                ''
                            }
                        </span>
                    </div>
                </td>
                <td 
                    className={ 
                        `link-a A ${Helper.checkObj(firstTime.Spread) ? 
                        Helper._parseOddsEntry({
                                    value: firstTime.Spread.Team2, 
                                    type: firstTime.Spread.Type, 
                                }, oddType, tweakOdd) < 0 ? 
                        'text-red' : 'text-black' : 'text-black'} 
                        ${
                            Helper.isExistedDataInArray(this.stringUpdate, `firstTime-Spread-Team2-${keyObj}`) ? 
                            'data-change' : ''
                        }`
                    }
                    id={`firstTime-Spread-Team2-${keyObj}`}
                    onClick={this._onBetItem.bind(this, 'HDP', 2, firstTime.Spread, match.Team1, match.Team2, 'firstTime')}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(firstTime.Spread) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Spread.Team2, 
                                    type: firstTime.Spread.Type, 
                                }, oddType, tweakOdd) : 
                                ''
                            }
                        </span>
                    </div>
                </td>
                <td 
                    className={'goal'}
                    id={`firstTime-Totlas-Points-${keyObj}`}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(firstTime.Total) ? 
                                firstTime.Total.Point : ''
                            }
                        </span>
                    </div>
                </td>
                <td 
                    className={ 
                        `link-a over ${Helper.checkObj(firstTime.Total) ? 
                        Helper._parseOddsEntry({
                                    value: firstTime.Total.Team1, 
                                    type: firstTime.Total.Type, 
                                }, oddType, tweakOdd) < 0 ? 
                        'text-red' : 'text-black' : 'text-black'} 
                        ${
                            Helper.isExistedDataInArray(this.stringUpdate, `firstTime-Total-Team1-${keyObj}`) ? 
                            'data-change' : ''
                        }`
                    }
                    id={`firstTime-Total-Team1-${keyObj}`}
                    onClick={this._onBetItem.bind(this, 'O/U', 1, firstTime.Total, match.Team1, match.Team2, 'firstTime')}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(firstTime.Total) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Total.Team1, 
                                    type: firstTime.Total.Type, 
                                }, oddType, tweakOdd) : 
                                ''
                            }
                        </span>
                    </div>
                </td>
                <td 
                    className={ 
                        `link-a under ${Helper.checkObj(firstTime.Total) ? 
                        Helper._parseOddsEntry({
                                    value: firstTime.Total.Team2, 
                                    type: firstTime.Total.Type, 
                                }, oddType, tweakOdd) < 0 ? 
                        'text-red' : 'text-black' : 'text-black'} 
                        ${
                            Helper.isExistedDataInArray(this.stringUpdate, `firstTime-Total-Team2-${keyObj}`) ? 
                            'data-change' : ''
                        }`
                    }
                    id={`firstTime-Total-Team2-${keyObj}`}
                    onClick={this._onBetItem.bind(this, 'O/U', 2, firstTime.Total, match.Team1, match.Team2, 'firstTime')}
                >
                    <div>
                        <span>
                            {
                                Helper.checkObj(firstTime.Total) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Total.Team2, 
                                    type: firstTime.Total.Type, 
                                }, oddType, tweakOdd) : 
                                ''
                            }
                        </span>
                    </div>
                </td>
                <td className="final">
                    <div><span><img src="/assets/images/Info.gif" alt=""/></span></div>
                    <div>
                        <span className="dropdown-bets">
                            <img src="/assets/images/MoreBets.gif" alt=""/>
                            <div className="bets-content">
                                <div className="bet-header">
                                    <h4 className="title">
                                        <img src="/assets/images/mbModIcon.png" alt=""/> 
                                        {`${match.Team1} -vs- ${match.Team2}`}
                                    </h4>
                                    <a href="#" className="close"><img src="/assets/images/ft_close.gif" alt=""/></a>
                                </div>
                                <div className="bet-body">
                                    <div>
                                        <table className="table-small">
                                            <thead>
                                                <tr>
                                                    <th colSpan="3">1x2</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>x</td>
                                                    <td>2</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {
                                                            Helper.checkObj(fullTime) && Helper.checkObj(fullTime.MoneyLine) ? 
                                                            Helper._parseOddsEntry({
                                                                value: fullTime.MoneyLine.Team1, 
                                                                type: fullTime.MoneyLine.Type, 
                                                            }, oddType != 0 ? 2 : oddType, tweakOdd) : 
                                                            ''
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            Helper.checkObj(fullTime) && Helper.checkObj(fullTime.MoneyLine) ? 
                                                            Helper._parseOddsEntry({
                                                                value: fullTime.MoneyLine.Draw, 
                                                                type: fullTime.MoneyLine.Type, 
                                                            }, oddType != 0 ? 2 : oddType, tweakOdd) : 
                                                            ''
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            Helper.checkObj(fullTime) && Helper.checkObj(fullTime.MoneyLine) ? 
                                                            Helper._parseOddsEntry({
                                                                value: fullTime.MoneyLine.Team2, 
                                                                type: fullTime.MoneyLine.Type, 
                                                            }, oddType != 0 ? 2 : oddType, tweakOdd) : 
                                                            ''
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <table className="table-small">
                                            <thead>
                                                <tr>
                                                    <th colSpan="3">FH 1x2</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1</td>
                                                    <td>x</td>
                                                    <td>2</td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        {
                                                            Helper.checkObj(firstTime) && Helper.checkObj(firstTime.MoneyLine) ? 
                                                            Helper._parseOddsEntry({
                                                                value: firstTime.MoneyLine.Team1, 
                                                                type: firstTime.MoneyLine.Type, 
                                                            }, oddType, tweakOdd) : 
                                                            ''
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            Helper.checkObj(firstTime) && Helper.checkObj(firstTime.MoneyLine) ? 
                                                            Helper._parseOddsEntry({
                                                                value: firstTime.MoneyLine.Draw, 
                                                                type: firstTime.MoneyLine.Draw.Type, 
                                                            }, oddType, tweakOdd) : 
                                                            ''
                                                        }
                                                    </td>
                                                    <td>
                                                        {
                                                            Helper.checkObj(firstTime) && Helper.checkObj(firstTime.MoneyLine) ? 
                                                            Helper._parseOddsEntry({
                                                                value: firstTime.MoneyLine.Team2, 
                                                                type: firstTime.MoneyLine.Type, 
                                                            }, oddType, tweakOdd) : 
                                                            ''
                                                        }
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <table className="table-small">
                                            <thead>
                                                <tr>
                                                    <th colSpan="3">Double Chance</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>1x</td><td>12</td><td>2x</td></tr>
                                                <tr><td>?</td><td>?</td><td>?</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div>
                                        <table className="table-small">
                                            <thead>
                                                <tr>
                                                    <th colSpan="3">Odd/Even</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr><td>Odd</td><td>Even</td></tr>
                                                <tr><td>?</td><td>?</td></tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </span>
                    </div>
                </td>
            </tr>
        )
    }
}

RowSimpleComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        // oddRowData: state.odd.oddRowData, 
        oddType: state.odd.oddType, 
        resultSports: state.auth.resultSports, 
        isShowFavorite: state.helper.isShowFavorite, 
        tweakOdd: state.auth.tweakOdd, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...helperAction, 
            ...oddAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(RowSimpleComponent)
