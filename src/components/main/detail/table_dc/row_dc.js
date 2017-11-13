import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

let { expireCookies } = config

class RowDoubleComponent extends Component{
    constructor(props, context) {
        super(props)
        context.router
        this.isCreated = false;
        this.listKeyChange1;
        this.listKeyChange2;
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
            let dataPeriod = {}
            if(keyBet == '1x2') {
                if(matchString == 'firstTime') {
                    dataPeriod = obj.MoneyLine['firstTime']
                }
                else {
                    dataPeriod = obj.MoneyLine['fullTime']
                }
            }
            else if(keyBet == 'doubleChance') {
                dataPeriod = obj['DoubleChance']
            }
            this.props.betItem(keyBet, keyTeam, dataPeriod, teamObj, matchString)
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
            DoubleChance, 
            MoneyLine,
        } = nextProps.period
        for(let key in MoneyLine) {
            if(Helper.checkObj(MoneyLine[key]) && Helper.checkObj(previousPeriod.MoneyLine) && Helper.checkObj(previousPeriod.MoneyLine[key])) {
                for(let k in MoneyLine[key]) {
                    let stringId = `MoneyLine-${key}-${k}-${keyObj}`
                    if($(stringId).length) {
                        if(MoneyLine[key][k] != previousPeriod.MoneyLine[key][k]) {
                            // $(`#${stringId}`).addClass('data-change')
                            this.stringUpdate.push(stringId)
                        }
                        else {
                            let findIndex = _.findIndex(this.stringUpdate, (i) => {
                                return i == stringId
                            })
                            if(findIndex != -1)
                                this.stringUpdate.splice(findIndex, 1)
                            // $(stringId).removeClass('data-change')
                            // $(stringId).removeClass('odds-change-simple')
                        }
                    }
                }
            }
        }
        if(Helper.checkObj(previousPeriod.DoubleChance)) {
            for(let key in DoubleChance) {
                let stringId = `DoubleChance-${key}-${keyObj}`
                if($(stringId).length) {
                    if(DoubleChance[key] != previousPeriod.DoubleChance[key]) {
                        // $(`#${stringId}`).addClass('data-change')
                        this.stringUpdate.push(stringId)
                    }
                    else {
                        let findIndex = _.findIndex(this.stringUpdate, (i) => {
                            return i == stringId
                        })
                        if(findIndex != -1)
                            this.stringUpdate.splice(findIndex, 1)
                        // $(stringId).removeClass('data-change')
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
        let { 
            periodIndex, 
            match, 
            keyObj, 
            oddType, 
            resultSports, 
            leagueName, 
            tweakOdd, 
        } = this.props;
        let {
            MoneyLine: {
                fullTime, 
                firstTime, 
            }, 
            DoubleChance, 
        } = match
        let isLive = moment(match.Start).isSame(moment(), 'day');
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
                    if(parseInt(item) == match.Id) 
                        isFavoriteMatch = true;
                })
            }
        }

        oddType = 2;
        return (
            <tr className="points" style={this.props.style || {}}>
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
                </td>
                <td className="event">
                    <div>
                        <span 
                            className={'text-black'}
                        >
                            {match.Team1}
                        </span>
                    </div>
                    <div>
                        <span 
                            className={'text-black'}
                        >
                            {match.Team2}
                        </span>
                    </div>
                </td>
                <td className="mark">
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
                    </div>
                </td>
                <td id={`MoneyLine-fullTime-Team1-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkObj(fullTime) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Team1, 
                                    type: fullTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `MoneyLine-fullTime-Team1-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, '1x2', 1, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkObj(fullTime) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Team1, 
                                    type: fullTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`MoneyLine-fullTime-Draw-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkObj(fullTime) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Draw, 
                                    type: fullTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `MoneyLine-fullTime-Draw-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, '1x2', 3, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkObj(fullTime) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Draw, 
                                    type: fullTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`MoneyLine-fullTime-Team2-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkObj(fullTime) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Team2, 
                                    type: fullTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `MoneyLine-fullTime-Team2-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, '1x2', 2, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkObj(fullTime) ? 
                                Helper._parseOddsEntry({
                                    value: fullTime.Team2, 
                                    type: fullTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>

                <td id={`MoneyLine-firstTime-Team1-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkObj(firstTime) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Team1, 
                                    type: firstTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `MoneyLine-firstTime-Team1-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, '1x2', 1, match, match.Team1, match.Team2, 'firstTime')}
                        >
                            {
                                Helper.checkObj(firstTime) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Team1, 
                                    type: firstTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`MoneyLine-firstTime-Draw-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkObj(firstTime) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Draw, 
                                    type: firstTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `MoneyLine-firstTime-Draw-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, '1x2', 1, match, match.Team1, match.Team2, 'firstTime')}
                        >
                            {
                                Helper.checkObj(firstTime) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Draw, 
                                    type: firstTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`MoneyLine-firstTime-Team2-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkObj(firstTime) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Team2, 
                                    type: firstTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `MoneyLine-firstTime-Team2-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, '1x2', 1, match, match.Team1, match.Team2, 'firstTime')}
                        >
                            {
                                Helper.checkObj(firstTime) ? 
                                Helper._parseOddsEntry({
                                    value: firstTime.Team2, 
                                    type: firstTime.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`DoubleChance-1x-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkObj(DoubleChance) ? 
                                Helper._parseOddsEntry({
                                    value: DoubleChance['1x'], 
                                    type: DoubleChance.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `DoubleChance-1x-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, 'doubleChance', 1, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkObj(DoubleChance) ? 
                                Helper._parseOddsEntry({
                                    value: DoubleChance['1x'], 
                                    type: DoubleChance.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`DoubleChance-12-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkObj(DoubleChance) ? 
                                Helper._parseOddsEntry({
                                    value: DoubleChance['12'], 
                                    type: DoubleChance.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `DoubleChance-12-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, 'doubleChance', 3, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkObj(DoubleChance) ? 
                                Helper._parseOddsEntry({
                                    value: DoubleChance['12'], 
                                    type: DoubleChance.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`DoubleChance-2x-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkObj(DoubleChance) ? 
                                Helper._parseOddsEntry({
                                    value: DoubleChance['2x'], 
                                    type: DoubleChance.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `DoubleChance-2x-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, 'doubleChance', 2, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkObj(DoubleChance) ? 
                                Helper._parseOddsEntry({
                                    value: DoubleChance['2x'], 
                                    type: DoubleChance.Type,
                                }, oddType != 0 ? 2 : oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
            </tr>
                
        )
    }
}

RowDoubleComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(RowDoubleComponent)
