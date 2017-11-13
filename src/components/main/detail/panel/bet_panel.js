import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import oddAction from '../../../../actions/odd_action'
import helperAction from '../../../../actions/helper_action'
import userAction from '../../../../actions/user_action'
import { getMinMaxBet } from '../../selector'

class BetPanelComponent extends Component{
    constructor(props, context) {
        super(props)
        context.router
        this.parlayObj = []
        this.Wanger = ''
    }
    componentWillMount() {
    }
    _onCancelBet() {
        this.props.setdataBet({});
        this.props.changeShowBetPanel(false);
    }
    getSportString(id) {
        let string = ''
        let { sportMenuPanel } = this.props;
        switch(id) {
            case 3:
                string = sportMenuPanel['baseball'] || '';
                return string;
            break;
            case 4:
                string = sportMenuPanel['basketball'] || '';
                return string;
            break;
            case 12:
                string = sportMenuPanel['e sports'] || '';
                return string;
            break;
            case 15:
                string = sportMenuPanel['football'] || '';
                return string;
            break;
            case 19:
                string = sportMenuPanel['hockey'] || '';
                return string;
            break;
            case 33:
                string = sportMenuPanel['tennis'] || '';
                return string;
            break;
            case 34:
                string = sportMenuPanel['volleyball'] || '';
                return string;
            break;
            default:
                string = sportMenuPanel['soccer'] || '';
                return string;
            break;

        }
    }
    getString(key, betPanel, period, teamNumber, teamObj, matchString, dataBet, menuFilterActive, oddType, tweakOdd) {
        let obj = {};
        let { resultSports } = this.props;
        switch (key) {
            case 'HDP':
                obj.titlePanel = this.getSportString(resultSports) + betPanel.titleHDP;
                obj.isOver = false;
                obj.stringOu = '';
                obj.stringMatch = matchString == 'firstTime' ? betPanel.firstHalf : '';
                if(Helper.checkData(teamNumber) && Helper.checkObj(teamObj)) {
                    if(teamNumber == 1) {
                        obj.teamName = `${teamObj.Team1} (w)`;
                        obj.odd = period.Team1;
                        if(period.Point  >= 0) {
                            obj.isChangeColorStringTeam = true;
                        }
                    }
                    else if(teamNumber == 2) {
                        obj.teamName = `${teamObj.Team2} (w)`;
                        obj.odd = period.Team2;
                        if(period.Point  < 0) {
                            obj.isChangeColorStringTeam = true;
                        }
                    }
                }
                obj.Point = period.Point
                obj.Type = period.Type;
                if(menuFilterActive.typeOdd == 'mixParlay') {
                    dataBet.teamName = obj.teamName
                    dataBet.OddType = period.Type;
                    dataBet.oddShow = Helper._parseOddsEntry({
                        value: dataBet.OddValue, 
                        type: period.Type,
                    }, 2, tweakOdd)
                    obj.titlePanel = this.getSportString(resultSports) + betPanel.titleParlay;
                    let findIndex = _.findIndex(this.parlayObj, (item) => {
                        return item.EventId == dataBet.EventId
                    })
                    if(findIndex == -1) {
                        this.parlayObj.push(dataBet)
                    }
                    else {
                        this.parlayObj[findIndex] = dataBet
                    }
                }
                return obj;
            break;
            case 'O/U':
                obj.titlePanel = this.getSportString(resultSports) + betPanel.titleOu;
                obj.isOver = false;
                obj.stringMatch = matchString == 'firstTime' ? betPanel.firstHalf : '';
                if(Helper.checkData(teamNumber) && Helper.checkObj(teamObj)) {
                    if(teamNumber == 1) {
                        obj.teamName = '';
                        obj.stringOu = betPanel.over;
                        obj.odd = period.Team1;
                        obj.isOver = true;
                    }
                    else if(teamNumber == 2) {
                        obj.teamName = '';
                        obj.stringOu = betPanel.under;
                        obj.odd = period.Team2;
                    }
                }
                obj.Point = period.Point
                obj.Type = period.Type
                if(menuFilterActive.typeOdd == 'mixParlay') {
                    dataBet.teamName = obj.teamName
                    dataBet.OddType = period.Type;
                    dataBet.oddShow = Helper._parseOddsEntry({
                        value: dataBet.OddValue, 
                        type: period.Type,
                    }, 2, tweakOdd)
                    if(teamNumber == 1) {
                        dataBet.teamName = `${teamObj.Team1} ${obj.stringOu}`
                    }
                    else if(teamNumber == 2) {
                        dataBet.teamName = `${teamObj.Team2} ${obj.stringOu}`
                    }
                    dataBet.stringOU = obj.stringOu
                    obj.titlePanel = this.getSportString(resultSports) + betPanel.titleParlay;
                    let findIndex = _.findIndex(this.parlayObj, (item) => {
                        return item.EventId == dataBet.EventId
                    })
                    if(findIndex == -1) {
                        this.parlayObj.push(dataBet)
                    }
                    else {
                        this.parlayObj[findIndex] = dataBet
                    }
                }
                return obj;
            break;
            case '1x2':
                obj.titlePanel = this.getSportString(resultSports) + betPanel.title1x2;
                obj.isOver = false;
                obj.stringOu = '';
                obj.isChangeColorStringTeam = false
                obj.Type = period.Type
                obj.stringMatch = matchString == 'firstTime' ? betPanel.firstHalf : '';
                if(Helper.checkData(teamNumber) && Helper.checkObj(teamObj)) {
                    if(teamNumber == 1) {
                        obj.teamName = `${teamObj.Team1} (Win)`;
                        obj.odd = period.Team1;
                    }
                    else if(teamNumber == 2) {
                        obj.teamName = `${teamObj.Team2} (Win)`;
                        obj.odd = period.Team2;
                    }
                    else if(teamNumber == 3) {
                        obj.teamName = `${teamObj.Team1} (Draw)`;
                        obj.odd = period.Draw;
                    }
                }
                if(menuFilterActive.typeOdd == 'mixParlay') {
                    dataBet.teamName = obj.teamName
                    dataBet.OddType = period.Type;
                    dataBet.oddShow = Helper._parseOddsEntry({
                        value: dataBet.OddValue, 
                        type: period.Type,
                    }, 2, tweakOdd)
                    obj.titlePanel = this.getSportString(resultSports) + betPanel.titleParlay;
                    let findIndex = _.findIndex(this.parlayObj, (item) => {
                        return item.EventId == dataBet.EventId
                    })
                    if(findIndex == -1) {
                        this.parlayObj.push(dataBet)
                    }
                    else {
                        this.parlayObj[findIndex] = dataBet
                    }
                }
                // obj.Points = period.Points
                return obj;
            break;
            case 'outright':
                obj.titlePanel = this.getSportString(resultSports) + betPanel.titleOutRight;
                obj.isOver = false;
                obj.stringOu = '';
                obj.isChangeColorStringTeam = false
                obj.stringMatch = matchString == 'firstTime' ? betPanel.firstHalf : '';
                obj.teamName = `${dataBet.Team1} (Win)`;
                obj.odd = dataBet.OddValue;
                obj.Type = dataBet.OddType;
                return obj;
            break;
            case 'oddEvent': 
                function getTeamName(number, self) {
                    if(Helper.isExistedDataInArray([1,2], number)) {
                        obj.titlePanel = self.getSportString(resultSports) + betPanel.titleOddEven;
                        obj.isOver = false;
                        obj.stringOu = '';
                        obj.isChangeColorStringTeam = false
                        obj.stringMatch = '';
                        obj.teamName = betPanel.oddEven[number - 1];
                        obj.odd = dataBet.OddValue;
                        obj.Type = dataBet.OddType;
                        obj.totalGoalType = '';
                    }
                    else if (Helper.isExistedDataInArray([4,5,6,7], number)) {
                        obj.titlePanel = self.getSportString(resultSports) + betPanel.titleTotalGoal;
                        obj.isOver = false;
                        obj.stringOu = '';
                        obj.isChangeColorStringTeam = false
                        obj.stringMatch = '';
                        obj.teamName = `${dataBet.teamObj.Team1} ${betPanel.totalGoal}`;
                        obj.odd = dataBet.OddValue;
                        obj.Type = dataBet.OddType;
                        obj.totalGoalType = betPanel.totalGoalType[number - 4]
                        obj.typeBet = 'totalGoal'
                    }
                }
                let self = this
                getTeamName(teamNumber, self)
                return obj;
            break;
            case 'doubleChance':
                obj.titlePanel = this.getSportString(resultSports) + betPanel.titleDoubleChance;
                obj.isOver = false;
                obj.stringOu = '';
                obj.isChangeColorStringTeam = false
                obj.stringMatch = '';
                obj.teamName = `${dataBet.teamObj.Team1} ${betPanel.doubleChance}`;
                obj.odd = dataBet.OddValue;
                obj.Type = dataBet.OddType;
                obj.totalGoalType = betPanel.doubleChanceType[teamNumber - 1];
                obj.Type = dataBet.OddType;
                return obj;
            break;
            case 'correctScore':
                obj.titlePanel = this.getSportString(resultSports) + betPanel.titleCorrectScore;
                obj.isOver = false;
                obj.stringOu = '';
                obj.isChangeColorStringTeam = false
                obj.stringMatch = '';
                if(Helper.isExistedDataInArray([23, 27, 28, 31, 32, 33, 35, 36, 37, 38], dataBet.Side)) {
                    obj.teamName = `${dataBet.teamObj.Team1} (WIN)`;
                    obj.isChangeColorStringTeam = true
                }
                else if(Helper.isExistedDataInArray([19, 24, 29, 34, 43], dataBet.Side)) {
                    obj.teamName = `${dataBet.teamObj.Team1} (DRAW)`;
                    obj.isChangeColorStringTeam = true
                }
                else if(dataBet.Side == 18) {
                    obj.teamName = ''
                }
                else {
                    obj.teamName = `${dataBet.teamObj.Team2} (WIN)`;
                }
                obj.odd = dataBet.OddValue;
                obj.Type = dataBet.OddType;
                obj.totalGoalType = betPanel.correctScoreType[teamNumber];
                obj.Type = dataBet.OddType;
                return obj;
            break;
            case 'htft':
                obj.titlePanel = this.getSportString(resultSports) + betPanel.titleHTFT;
                obj.isOver = false;
                obj.stringOu = '';
                obj.isChangeColorStringTeam = false
                obj.stringMatch = '';
                obj.teamName = `${dataBet.teamObj.Team1} ${betPanel.halfTimeFullTime}`;
                obj.isChangeColorStringTeam = true
                obj.odd = dataBet.OddValue;
                obj.Type = dataBet.OddType;
                obj.totalGoalType = betPanel.HTFT[teamNumber];
                obj.Type = dataBet.OddType;
                return obj;
            break;
            case 'goal':
                obj.titlePanel = this.getSportString(resultSports) + betPanel.titleGoal;
                obj.isOver = false;
                obj.stringOu = '';
                obj.isChangeColorStringTeam = false
                obj.stringMatch = '';
                if(Helper.isExistedDataInArray([44, 45], dataBet.Side)) {
                    obj.teamName = `${dataBet.teamObj.Team1} ${betPanel.goalType[teamNumber]}`;
                }
                else if(Helper.isExistedDataInArray([46, 47], dataBet.Side)) {
                    obj.teamName = `${dataBet.teamObj.Team2} ${betPanel.goalType[teamNumber]}`;
                }
                else {
                    obj.teamName = `${betPanel.goalType[teamNumber]}`;
                }
                // obj.teamName = `${dataBet.teamObj.Team1} ${betPanel.halfTimeFullTime}`;
                obj.isChangeColorStringTeam = true
                obj.odd = dataBet.OddValue;
                obj.Type = dataBet.OddType;
                obj.totalGoalType = '';
                obj.Type = dataBet.OddType;
                return obj;
            break;
            default:
                return '';
            break;
        }
    }
    _onPlaceBet(minMaxBet, oddValue, keyBet, typeOdd) {
        let { Wager, resultSports } = this.props;
        let value = parseFloat(Wager)
        if(value > minMaxBet.maxbet) {
            alert('MAX WAGER')
            this.props.setWager(minMaxBet.maxbet)
        }
        else if(value < minMaxBet.minbet) {
            alert('MIN WAGER')
            this.props.setWager(minMaxBet.minbet)
        }
        else {
            let list = [];
            if(typeOdd == 'mixParlay' && this.parlayObj.length > 1) {
                list = this.parlayObj;
                this.props.placeBet(Wager, resultSports, null, null, list)
                .then(() => {
                    this.props.getBetList()
                })
            }
            else {
                this.props.placeBet(Wager, resultSports, oddValue, keyBet, list)
                .then(() => {
                    this.props.getBetList()
                })
            }

        }
    }
    _removeParlay(index) {
        if(this.parlayObj.length > 1) {
            this.parlayObj.splice(index, 1)
            this.forceUpdate();
        }
    }
    _renderBetPanel(menuFilterActive, teamObj, Name, betPanel, Wager, minMaxBet, objPanel, maxPayout, side, oddType, keyBet, oddTypeList, tweakOdd) {
        let {
            dataBet: {
                Team1Score, 
                Team2Score, 
            }
        } = this.props;
        let oddTypeLabel = _.find(oddTypeList, (item) => {
            return item.value == oddType
        })
        if(menuFilterActive.typeOdd == 'outright'){
            var oddValue = Helper._parseOddsEntry({
                value: objPanel.odd, 
                type: objPanel.Type,
            }, oddType, 0)
            
            return (
                <div className="panel-bet">
                    <div className="bet-title">{objPanel.titlePanel}</div>
                    <div className="bet-box">
                        <h4 className={objPanel.isOver == true ? 'text-red' : 'text-black'}>
                            {objPanel.stringOu}
                        </h4>
                        <h4 
                            className={objPanel.isChangeColorStringTeam == true ? 'text-red' : 'text-blue'}
                        >
                            {objPanel.teamName}
                        </h4>
                        <div>
                            <span className="text-grey">{objPanel.Point}</span> @ <span className="text-red bold font-size-14">
                                {
                                    oddValue < 0 ? oddValue*(1 + tweakOdd/100) : oddValue*(1 - tweakOdd/100)
                                }
                            </span> {`(${oddTypeLabel.label})`}
                        </div>
                    </div>
                    <div className="text-center margin-top-10">
                        <p>{objPanel.stringMatch}</p>
                        <p>{objPanel.teamName || ''}</p>
                        <p className="text-link">{Name || ''}</p>
                    </div>
                    <div className="form-horizontal margin-top-20">
                        <div className="form-group">
                            <label className="control-label">{betPanel.amount || 'Amount'} :</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="amount" 
                                value={Wager || ''}
                                onChange={(e) => {
                                    if(!isNaN(e.target.value)) {
                                        this.props.setWager(e.target.value)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="margin-top-20 padding-5" style={{background: 'rgba(0,0,0,.125)'}}>
                        <label className="checkbox">
                            <input type="checkbox" checked onChange={(e) => {

                            }} />
                            <span></span>
                            <span className="bold">{betPanel.acceptOdds || 'Accept better odds'}</span>
                        </label>
                    </div>
                    <div className="bet-max-min margin-top-20">
                        <div>{betPanel.maxPayout || 'Max Payout'}</div><div>{isNaN(maxPayout) ? 0 : maxPayout}</div>
                        <div>{betPanel.minBet || 'Min Bet'}</div><div>{minMaxBet.minbet}</div>
                        <div>{betPanel.maxBet || 'Max Bet'}</div><div>{minMaxBet.maxbet}</div>
                    </div>
                    <div className="margin-top-20 bet-footer">
                        <div>
                            <a className="btn btn-block btn-blue" onClick={this._onPlaceBet.bind(this, minMaxBet, oddValue, null)}>
                                {betPanel.processBet || 'Process Bet'}
                            </a>
                        </div>
                        <div><a onClick={this._onCancelBet.bind(this)} className="btn btn-block">{betPanel.cancelBet || 'Cancel'}</a></div>
                    </div>
                </div>
            )
        }
        else if(Helper.isExistedDataInArray(config.sameTypeBet, menuFilterActive.typeOdd)){
            let newOddType = oddType;
            if(menuFilterActive.typeOdd == 'doubleChange' || menuFilterActive.typeOdd == 'correctScore' || menuFilterActive.typeOdd == 'htft')
                newOddType = oddType != 0 ? 2 : oddType
            if(objPanel.typeBet == 'totalGoal')
                newOddType = 2
            var oddValue =  Helper._parseOddsEntry({
                value: objPanel.odd, 
                type: objPanel.Type,
            }, newOddType, 0)
            return (
                <div className="panel-bet">
                    <div className="bet-title">{objPanel.titlePanel}</div>
                    <div className="bet-box">
                        <h4 className={objPanel.isOver == true ? 'text-red' : 'text-black'}>
                            {objPanel.stringOu}
                        </h4>
                        <h4 
                            className={objPanel.isChangeColorStringTeam == true ? 'text-red' : 'text-blue'}
                        >
                            {objPanel.teamName}
                        </h4>
                        <div>
                            <span className="text-grey">{objPanel.totalGoalType}</span> @ <span className="text-red bold font-size-14">
                                {
                                   oddValue < 0 ? (oddValue*(1 + tweakOdd/100)).toFixed(2) : (oddValue*(1 - tweakOdd/100)).toFixed(2)
                                }
                            </span> {keyBet != '1x2' && keyBet != 'doubleChance' && keyBet != 'correctScore' && keyBet != 'htft' ? `(${oddTypeLabel.label})` : `(EU)`}
                        </div>
                    </div>
                    <div className="text-center margin-top-10">
                        <p>{objPanel.stringMatch}</p>
                        <p>{teamObj.Team1 || ''}</p>
                        <p>-vs-</p>
                        <p>{teamObj.Team2 || ''}</p>
                        <p className="text-link">{Name || ''}</p>
                    </div>
                    <div className="form-horizontal margin-top-20">
                        <div className="form-group">
                            <label className="control-label">{betPanel.amount || 'Amount'} :</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="amount" 
                                value={Wager || ''}
                                onChange={(e) => {
                                    if(!isNaN(e.target.value)) {
                                        this.props.setWager(e.target.value)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="margin-top-20 padding-5" style={{background: 'rgba(0,0,0,.125)'}}>
                        <label className="checkbox">
                            <input type="checkbox" checked onChange={(e) => {

                            }} />
                            <span></span>
                            <span className="bold">{betPanel.acceptOdds || 'Accept better odds'}</span>
                        </label>
                    </div>
                    <div className="bet-max-min margin-top-20">
                        <div>{betPanel.maxPayout || 'Max Payout'}</div><div>{isNaN(maxPayout) ? 0 : maxPayout}</div>
                        <div>{betPanel.minBet || 'Min Bet'}</div><div>{minMaxBet.minbet}</div>
                        <div>{betPanel.maxBet || 'Max Bet'}</div><div>{minMaxBet.maxbet}</div>
                    </div>
                    <div className="margin-top-20 bet-footer">
                        <div>
                            <a className="btn btn-block btn-blue" onClick={this._onPlaceBet.bind(this, minMaxBet, oddValue, keyBet)}>
                                {betPanel.processBet || 'Process Bet'}
                            </a>
                        </div>
                        <div><a onClick={this._onCancelBet.bind(this)} className="btn btn-block">{betPanel.cancelBet || 'Cancel'}</a></div>
                    </div>
                </div>
            )
        }
        else if(menuFilterActive.typeOdd == 'mixParlay'){
            let list_odds = [];
            let odds = 0;
            list_odds = this.parlayObj.map((item, index) => {
                odds+= item.oddShow;
                let key = `parlay-${item.EventId}-${item.LeagueId}`
                return (
                    <tbody key={key}>
                        <tr>
                            <td colSpan="2">
                                <h5 className="text-accent">{item.teamName}</h5>
                            </td>
                        </tr>
                        <tr>
                            <td className="bold">
                                <span className="">{item.Line}</span>
                                &nbsp;@&nbsp;
                                 <span>
                                    {
                                        item.oddShow
                                    }
                                </span>
                            </td>
                            <td width="1">
                                <a 
                                    className="btn btn-danger" 
                                    onClick={this._removeParlay.bind(this, index)}
                                >
                                    <i className="fa fa-remove"></i>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                )
            })
            return (
                <div className="panel-bet">
                    <div className="bet-title">{objPanel.titlePanel}</div>
                    <div className="bet-box bet-box-1">
                        <table>
                            {list_odds}
                            <tfoot>
                                <tr>
                                    <td className="bold"><span>Odds:</span></td>
                                    <td className="bold">
                                        <span className="light-green">
                                            {
                                                odds
                                            }
                                        </span>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>
                    <div className="text-center margin-top-10">
                        <p>{teamObj.Team1 || ''}</p>
                        <p>-vs-</p>
                        <p>{teamObj.Team2 || ''}</p>
                        <p className="text-link">{Name || ''}</p>
                    </div>
                    <div className="form-horizontal margin-top-20">
                        <div className="form-group">
                            <label className="control-label">{betPanel.amount || 'Amount'} :</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="amount" 
                                value={Wager || ''}
                                onChange={(e) => {
                                    if(!isNaN(e.target.value)) {
                                        this.props.setWager(e.target.value)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="margin-top-20 padding-5" style={{background: 'rgba(0,0,0,.125)'}}>
                        <label className="checkbox">
                            <input type="checkbox" checked onChange={(e) => {

                            }} />
                            <span></span>
                            <span className="bold">{betPanel.acceptOdds || 'Accept better odds'}</span>
                        </label>
                    </div>
                    <div className="bet-max-min margin-top-20">
                        <div>{betPanel.maxPayout || 'Max Payout'}</div><div>{isNaN(maxPayout) ? 0 : maxPayout}</div>
                        <div>{betPanel.minBet || 'Min Bet'}</div><div>{minMaxBet.minbet}</div>
                        <div>{betPanel.maxBet || 'Max Bet'}</div><div>{minMaxBet.maxbet}</div>
                    </div>
                    <div className="margin-top-20 bet-footer">
                        <div>
                            <a className="btn btn-block btn-blue" onClick={this._onPlaceBet.bind(this, minMaxBet, null, null, menuFilterActive.typeOdd)}>
                                {betPanel.processBet || 'Process Bet'}
                            </a>
                        </div>
                        <div><a onClick={this._onCancelBet.bind(this)} className="btn btn-block">{betPanel.cancelBet || 'Cancel'}</a></div>
                    </div>
                </div>
            )
        }
        // case 'doubleChange': 

        // break;
        else {
            var oddValue = Helper._parseOddsEntry({
                value: objPanel.odd, 
                type: objPanel.Type,
            }, keyBet != '1x2' && keyBet != 'doubleChance' ? oddType : oddType != 0 ? 2 : oddType, 0)
            return (
                <div className="panel-bet">
                    <div className="bet-title">{objPanel.titlePanel}</div>
                    <div className="bet-box">
                        <h4 className={objPanel.isOver == true ? 'text-red' : 'text-black'}>
                            {objPanel.stringOu}
                        </h4>
                        <h4 
                            className={objPanel.isChangeColorStringTeam == true ? 'text-red' : 'text-blue'}
                        >
                            {objPanel.teamName}
                        </h4>
                        <div>
                            <span className="text-grey">{objPanel.Point}</span> @ <span className="text-red bold font-size-14">
                                {
                                    oddValue < 0 ? (oddValue*(1 + tweakOdd/100)).toFixed(2) : (oddValue*(1 - tweakOdd/100)).toFixed(2)
                                }
                            </span> {keyBet != '1x2' && keyBet != 'doubleChance' ? `(${oddTypeLabel.label})` : `(EU)`}
                        </div>
                    </div>
                    <div className="text-center margin-top-10">
                        <p>{objPanel.stringMatch}</p>
                        <p>{teamObj.Team1 || ''}</p>
                        <p>-vs-</p>
                        <p>{teamObj.Team2 || ''}</p>
                        <p>( Score: {`${Team1Score} - ${Team2Score}`} )</p>
                        <p className="text-link">{Name || ''}</p>
                    </div>
                    <div className="form-horizontal margin-top-20">
                        <div className="form-group">
                            <label className="control-label">{betPanel.amount || 'Amount'} :</label>
                            <input 
                                type="text" 
                                className="form-control" 
                                id="amount" 
                                value={Wager || ''}
                                onChange={(e) => {
                                    if(!isNaN(e.target.value)) {
                                        this.props.setWager(e.target.value)
                                    }
                                }}
                            />
                        </div>
                    </div>
                    <div className="margin-top-20 padding-5" style={{background: 'rgba(0,0,0,.125)'}}>
                        <label className="checkbox">
                            <input type="checkbox" checked onChange={(e) => {

                            }} />
                            <span></span>
                            <span className="bold">{betPanel.acceptOdds || 'Accept better odds'}</span>
                        </label>
                    </div>
                    <div className="bet-max-min margin-top-20">
                        <div>{betPanel.maxPayout || 'Max Payout'}</div><div>{isNaN(maxPayout) ? 0 : maxPayout}</div>
                        <div>{betPanel.minBet || 'Min Bet'}</div><div>{minMaxBet.minbet}</div>
                        <div>{betPanel.maxBet || 'Max Bet'}</div><div>{minMaxBet.maxbet}</div>
                    </div>
                    <div className="margin-top-20 bet-footer">
                        <div>
                            <a className="btn btn-block btn-blue" onClick={this._onPlaceBet.bind(this, minMaxBet, oddValue, null)}>
                                {betPanel.processBet || 'Process Bet'}
                            </a>
                        </div>
                        <div><a onClick={this._onCancelBet.bind(this)} className="btn btn-block">{betPanel.cancelBet || 'Cancel'}</a></div>
                    </div>
                </div>
            )
        }
    }
    render(){
        let { 
            dataBet: {
                teamObj, 
                keyBet, 
                Name, 
                period, 
                teamNumber, 
                matchString,  
            }, 
            betPanel, 
            Wager, 
            minMaxBet, 
            menuFilterActive, 
            oddType, 
            oddTypeList, 
            tweakOdd, 
        } = this.props;
        if(!Helper.checkObj(betPanel)) betPanel = {}
        let objPanel = this.getString(
            keyBet, 
            betPanel, 
            period, 
            teamNumber, 
            teamObj, 
            matchString, 
            this.props.dataBet, 
            menuFilterActive, 
            oddType, 
            tweakOdd
        );
        let side = Helper.checkObj(period) ? period.Side : null;
        let oddParses = 0;
        if(Helper.checkObj(this.props.dataBet)) {
            oddParses = Helper._parseOddsEntry({
                value: this.props.dataBet.OddValue, 
                type: this.props.dataBet.OddType,
            }, oddType, tweakOdd)
            if(Helper.checkTrueData(this.props.dataBet.Side, 10)) {
                oddParses = this.props.dataBet.OddValue
                oddType = 2
            }
        }
        if(menuFilterActive.typeOdd == 'mixParlay') {
            for(let i = 0; i < this.parlayObj.length; i++) {
                oddParses+=this.parlayObj[i].oddShow;
            }
            oddType = 2;
        }
        if(menuFilterActive.typeOdd == 'correctScore' || menuFilterActive.typeOdd == 'doubleChance' || menuFilterActive.typeOdd == 'htft') {
            oddParses = Helper._parseOddsEntry({
                value: this.props.dataBet.OddValue, 
                type: this.props.dataBet.OddType,
            }, 2, tweakOdd)
            oddType = 2;
        }
        let maxPayout = Helper._calculatorMaxPayout[oddType](isNaN(Wager) ? 0 : Wager, oddParses, side).toFixed(2)
        return this._renderBetPanel(
            menuFilterActive, 
            teamObj, 
            Name, 
            betPanel, 
            Wager, 
            minMaxBet, 
            objPanel, 
            maxPayout, 
            side, 
            oddType, 
            keyBet, 
            oddTypeList, 
            tweakOdd)
    }
}

BetPanelComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
    return {
        dataBet: state.odd.dataBet,  
        betPanel: state.helper.language.betPanel, 
        Wager: state.odd.Wager, 
        minMaxBet: getMinMaxBet(state), 
        resultSports: state.auth.resultSports, 
        sportMenuPanel: state.helper.language.sportMenuPanel, 
        menuFilterActive: state.helper.menuFilterActive, 
        oddType: state.odd.oddType, 
        oddTypeList: state.helper.oddTypeList, 
        tweakOdd: state.auth.tweakOdd, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...oddAction, 
            ...helperAction, 
            ...userAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BetPanelComponent)
