import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import RowCorrect from './row_correct'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

let { expireCookies } = config

class TableDCLeagueComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
	}
    _openBetItem(keyBet, keyTeam, obj, Team1, Team2, matchString, matchKey) {
        if(typeof this.props._openBetItem === 'function') {
            let teamObj ={
                Team1: Team1, 
                Team2: Team2, 
            }
            this.props._openBetItem(keyBet, keyTeam, obj, teamObj, matchString, matchKey)
        }
    }
     _renderRowCorrect (matchKey, match, matchIndex, tweakOdd, onBetFunction) {
        function getMinutesString(timeLive) {
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
        let arrayElement = []
        let isLive = moment(match.Start).isSame(moment(), 'day');
        let minutes = '';
        let liveString = '';
        if(Helper.checkObj(match.TimeLive)) {
            minutes = getMinutesString(match.TimeLive)
            liveString = `${match.Team1Score || 0} - ${match.Team2Score || 0}`
        }
        else { 
            minutes = moment(match.Start).format('HH:mm');
            if(isLive == true) {
                liveString = moment(match.Start).format('HH:mm')
            }
            else {
                liveString = moment(match.Start).format('MM/DD HH:mm')
            }
        }
        let percent = 1 - tweakOdd/100;

        arrayElement.push(
            <tr className="team bold">
                <td>
                    {match.market == 1 ? <img src="/assets/images/1h_icon.jpg" /> : ''}&nbsp;
                    {`${match.Team1} -vs- ${match.Team2}`}
                </td>
                <td className="text-center">
                    {isLive == true ? <span className="text-red">LIVE&nbsp;</span> : ''}
                    <span>{liveString}</span>
                </td>
            </tr>
        )
        arrayElement.push(
            <tr className="points">
                <td>
                    <div>
                        {Helper.checkData(match.CS_1_0) ? <span>1-0</span> : ''}
                        {Helper.checkData(match.CS_2_0) ? <span>2-0</span> : ''}
                        {Helper.checkData(match.CS_2_1) ? <span>2-1</span> : ''}
                        {Helper.checkData(match.CS_3_0) ? <span>3-0</span> : ''}
                        {Helper.checkData(match.CS_3_1) ? <span>3-1</span> : ''}
                        {Helper.checkData(match.CS_3_2) ? <span>3-2</span> : ''}
                        {Helper.checkData(match.CS_4_0) ? <span>4-0</span> : ''}
                        {Helper.checkData(match.CS_4_1) ? <span>4-1</span> : ''}
                        {Helper.checkData(match.CS_4_2) ? <span>4-2</span> : ''}
                        {Helper.checkData(match.CS_4_3) ? <span>4-3</span> : ''}
                    </div>
                </td>
                <td>
                    <div>
                        {Helper.checkData(match.CS_0_0) ? <span>0-0</span> : ''}
                        {Helper.checkData(match.CS_1_1) ? <span>1-1</span> : ''}
                        {Helper.checkData(match.CS_2_2) ? <span>2-2</span> : ''}
                        {Helper.checkData(match.CS_3_3) ? <span>3-3</span> : ''}
                        {Helper.checkData(match.CS_4_4) ? <span>4-4</span> : ''}
                        {Helper.checkData(match.CS_AOS) ? <span>AOS</span> : ''}
                    </div>
                </td>
            </tr>
        )
        arrayElement.push(
            <tr className="points points-odd">
                <td>
                    <div>
                        {
                            Helper.checkData(match.CS_1_0) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 5, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_1_0*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_2_0) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 9, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_2_0*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_2_1) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 10, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_2_1*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_3_0) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 13, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_3_0*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_3_1) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 14, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_3_1*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_3_2) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 15, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_3_2*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_4_0) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 17, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_4_0*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_4_1) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 18, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_4_1*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_4_2) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 19, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_4_2*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_4_3) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 20, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_4_3*percent).toFixed(2)}
                            </span> : ''
                        }
                    </div>
                </td>
                <td>
                    <div>
                        {
                            Helper.checkData(match.CS_0_0) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 1, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_0_0*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_1_1) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 6, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_1_1*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_2_2) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 11, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_2_2*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_3_3) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 16, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_3_3*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_4_4) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 25, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_4_4*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_AOS) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 0, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_AOS*percent).toFixed(2)}
                            </span> : ''
                        }
                    </div>
                </td>
            </tr>
        )
        arrayElement.push(
            <tr className="points">
                <td>
                    <div>
                        {Helper.checkData(match.CS_0_1) ? <span>0-1</span> : ''}
                        {Helper.checkData(match.CS_0_2) ? <span>0-2</span> : ''}
                        {Helper.checkData(match.CS_1_2) ? <span>1-2</span> : ''}
                        {Helper.checkData(match.CS_0_3) ? <span>0-3</span> : ''}
                        {Helper.checkData(match.CS_1_3) ? <span>1-3</span> : ''}
                        {Helper.checkData(match.CS_2_3) ? <span>2-3</span> : ''}
                        {Helper.checkData(match.CS_0_4) ? <span>0-4</span> : ''}
                        {Helper.checkData(match.CS_1_4) ? <span>1-4</span> : ''}
                        {Helper.checkData(match.CS_2_4) ? <span>2-4</span> : ''}
                        {Helper.checkData(match.CS_3_4) ? <span>3-4</span> : ''}
                    </div>
                </td>
                <td></td>
            </tr>
        )
        arrayElement.push(
            <tr className="points points-odd">
                <td>
                    <div>
                        {
                            Helper.checkData(match.CS_0_1) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 2, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_0_1*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_0_2) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 3, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_0_2*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_1_2) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 7, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_1_2*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_0_3) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 4, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_0_3*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_1_3) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 8, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_1_3*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_2_3) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 12, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_2_3*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_0_4) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 21, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_0_4*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_1_4) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 22, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_1_4*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_2_4) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 23, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_2_4*percent).toFixed(2)}
                            </span> : ''
                        }
                        {
                            Helper.checkData(match.CS_3_4) ? 
                            <span onClick={(e) => {
                                if(typeof onBetFunction === 'function') {
                                    let stringMatch = ''
                                    if(match.market == 1)
                                        stringMatch = 'firstTime'
                                    onBetFunction('correctScore', 24, match, match.Team1, match.Team2, stringMatch, matchKey)
                                }
                            }}>
                                {(match.CS_3_4*percent).toFixed(2)}
                            </span> : ''
                        }
                    </div>
                </td>
                <td></td>
            </tr>
        )
        return arrayElement
    }
    render(){ 
    	let  { resultSports, item, key, tweakOdd } = this.props;
    	let list_matches = [];
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
        item.matches.forEach((match, matchIndex) => {
            let matchKey = `${match.Id}-${item.Id}`
            list_matches.push(
                this._renderRowCorrect(
                    matchKey, 
                    match, 
                    matchIndex, 
                    tweakOdd, 
                    this._openBetItem.bind(this)
                )
            )
        })
        return (
            <tbody key={key}>
                <tr className="league">
                    <td colSpan="2">
                        <a className="or right"><img src="/assets/images/or.gif" alt=""/></a>
                        {item.Name}
                    </td>
                </tr>
                {list_matches}
            </tbody>
        )
    }
}

TableDCLeagueComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
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

export default connect(mapStateToProps, mapDispatchToProps)(TableDCLeagueComponent)