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
        this.listKeyChange;
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
        // let {
        //     firstTime, 
        //     fullTime
        // } = nextProps.period
        for(let key in nextProps.period) {
            if(Helper.checkObj(nextProps.period[key]) && previousPeriod[key]) {
                let stringId = `${key}-${keyObj}`
                if($(`#${stringId}`).length) {
                    if(nextProps.period[key] != previousPeriod[key]) {
                        // $(stringId).addClass('data-change')
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
                <td id={`odds-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkData(match.odds) ? 
                                Helper._parseOddsEntry({
                                    value: match.odds, 
                                    type: match.Type,
                                }, oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `odds-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            } 
                            onClick={this._onBetItem.bind(this, 'oddEvent', 1, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkData(match.odds) ? 
                                Helper._parseOddsEntry({
                                    value: match.odds, 
                                    type: match.Type,
                                }, oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`events-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkData(match.events) ? 
                                Helper._parseOddsEntry({
                                    value: match.events, 
                                    type: match.Type,
                                }, oddType, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `events-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, 'oddEvent', 2, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkData(match.events) ? 
                                Helper._parseOddsEntry({
                                    value: match.events, 
                                    type: match.Type,
                                }, oddType, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>

                <td id={`zeroOne-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkData(match.zeroOne) ? 
                                Helper._parseOddsEntry({
                                    value: match.zeroOne, 
                                    type: match.OtherType,
                                }, 2, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `zeroOne-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, 'oddEvent', 4, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkData(match.zeroOne) ? 
                                Helper._parseOddsEntry({
                                    value: match.zeroOne, 
                                    type: match.OtherType,
                                }, 2, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`twoThree-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkData(match.twoThree) ? 
                                Helper._parseOddsEntry({
                                    value: match.twoThree, 
                                    type: match.OtherType,
                                }, 2, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `twoThree-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, 'oddEvent', 5, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkData(match.twoThree) ? 
                                Helper._parseOddsEntry({
                                    value: match.twoThree, 
                                    type: match.OtherType,
                                }, 2, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`fourSix-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkData(match.fourSix) ? 
                                Helper._parseOddsEntry({
                                    value: match.fourSix, 
                                    type: match.OtherType,
                                }, 2, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `fourSix-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, 'oddEvent', 6, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkData(match.fourSix) ? 
                                Helper._parseOddsEntry({
                                    value: match.fourSix, 
                                    type: match.OtherType,
                                }, 2, tweakOdd) : ''
                            }
                        </span>
                    </div>
                </td>
                <td id={`sevenOver-${keyObj}`}>
                    <div>
                        <span 
                            className={ 
                                `${Helper.checkData(match.sevenOver) ? 
                                Helper._parseOddsEntry({
                                    value: match.sevenOver, 
                                    type: match.OtherType,
                                }, 2, tweakOdd) < 0 ? 
                                'text-red link-a' : 'text-black link-a' : 'text-black'} 
                                ${
                                    Helper.isExistedDataInArray(this.stringUpdate, `sevenOver-${keyObj}`) ? 
                                    'data-change' : ''
                                }`
                            }
                            onClick={this._onBetItem.bind(this, 'oddEvent', 7, match, match.Team1, match.Team2, '')}
                        >
                            {
                                Helper.checkData(match.sevenOver) ? 
                                Helper._parseOddsEntry({
                                    value: match.sevenOver, 
                                    type: match.OtherType,
                                }, 2, tweakOdd) : ''
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
