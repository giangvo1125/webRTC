import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import RowCorrect from './row_correct'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

let { expireCookies } = config

class RowHTFTComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.stringUpdate = []
    }
	componentWillMount() {
	}
    componentDidMount() {
        let {
            match, 
        } = this.props;
        this.setState({
            previousMatch: match 
        })
    }
    _openBetItem(match, matchKey, teamNumber) {
        if(typeof this.props._openBetItem === 'function') {
            let stringMatch = ''
            if(match.market == 1)
                stringMatch = 'firstTime'
            let teamObj = {
                Team1: match.Team1, 
                Team2: match.Team2
            }
            this.props._openBetItem('htft', teamNumber, match, teamObj, stringMatch, matchKey)
        }
    }
    componentWillReceiveProps(nextProps) {
        let {
            state: {
                previousMatch
            }
        } = this;
        let {
            match
        } = nextProps
        for(let key in match) {
            
            if(Helper.checkObj(match[key]) && previousMatch[key]) {
                let stringId = `${key}-${match.Id}`
                if($(`#${stringId}`).length) {
                    if(match[key] != previousMatch[key]) {
                        this.stringUpdate.push(stringId)
                    }
                    else {
                        let findIndex = _.findIndex(this.stringUpdate, (i) => {
                            return i == stringId
                        })
                        if(findIndex != -1)
                            this.stringUpdate.splice(findIndex, 1)
                    }
                }
            }
        }
        this.setState({previousMatch: nextProps.match})
    }
    render(){ 
        let { matchKey, tweakOdd, match, index} = this.props
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
                liveString = 'LIVE'
            }
            else {
                liveString = moment(match.Start).format('MM/DD')
            }
        }
        let percent = 1 - tweakOdd/100;
        let dataChangeCLass = 'link-a data-change'
        let notDataChangeClass = 'link-a'
        return (
            <tr className={`points ${index%2 == 0 ? 'points-odd' : ''}`} key={matchKey}>
                <td className="time">
                    <div><span className="text-red">{liveString}</span></div>
                    <div><span>{minutes}</span></div>
                </td>
                <td className="event">
                    <div><span className="text-red">{match.Team1}</span></div>
                    <div><span className="text-black">{match.Team2}</span></div>
                </td>
                <td 
                    id={`HH-${match.Id}`} 
                    className={Helper.isExistedDataInArray(this.stringUpdate, `HH-${match.Id}`) ? dataChangeCLass : notDataChangeClass}
                >
                    <div>
                        <span className="link-a" onClick={this.props._openBetItem.bind(this, match, matchKey, 0)}>
                            {(match.HH*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td 
                    id={`HD-${match.Id}`} 
                    className={Helper.isExistedDataInArray(this.stringUpdate, `HD-${match.Id}`) ? dataChangeCLass : notDataChangeClass}
                >
                    <div>
                        <span className="link-a"  onClick={this._openBetItem.bind(this, match, matchKey, 1)}>
                            {(match.HD*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td 
                    id={`HA-${match.Id}`} 
                    className={Helper.isExistedDataInArray(this.stringUpdate, `HA-${match.Id}`) ? dataChangeCLass : notDataChangeClass}
                >
                    <div>
                        <span className="link-a"  onClick={this._openBetItem.bind(this, match, matchKey, 2)}>
                            {(match.HA*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
                
                <td 
                    id={`DH-${match.Id}`} 
                    className={Helper.isExistedDataInArray(this.stringUpdate, `DH-${match.Id}`) ? dataChangeCLass : notDataChangeClass}
                >
                    <div>
                        <span className="link-a"  onClick={this._openBetItem.bind(this, match, matchKey, 3)}>
                            {(match.DH*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td 
                    id={`DD-${match.Id}`} 
                    className={Helper.isExistedDataInArray(this.stringUpdate, `HH-${match.Id}`) ? dataChangeCLass : notDataChangeClass}
                >
                    <div>
                        <span className="link-a"  onClick={this._openBetItem.bind(this, match, matchKey, 4)}>
                            {(match.DD*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td 
                    id={`DA-${match.Id}`} 
                    className={Helper.isExistedDataInArray(this.stringUpdate, `DA-${match.Id}`) ? dataChangeCLass : notDataChangeClass}
                >
                    <div>
                        <span className="link-a"  onClick={this._openBetItem.bind(this, match, matchKey, 5)}>
                            {(match.DA*percent).toFixed(2)}
                        </span>
                    </div>
                </td>

                <td 
                    id={`AH-${match.Id}`} 
                    className={Helper.isExistedDataInArray(this.stringUpdate, `HH-${match.Id}`) ? dataChangeCLass : notDataChangeClass}
                >
                    <div>
                        <span className="link-a"  onClick={this._openBetItem.bind(this, match, matchKey, 6)}>
                            {(match.AH*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td 
                    id={`AD-${match.Id}`} 
                    className={Helper.isExistedDataInArray(this.stringUpdate, `AD-${match.Id}`) ? dataChangeCLass : notDataChangeClass}
                >
                    <div>
                        <span className="link-a"  onClick={this._openBetItem.bind(this, match, matchKey, 7)}>
                            {(match.AD*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td 
                    id={`AA-${match.Id}`} 
                    className={Helper.isExistedDataInArray(this.stringUpdate, `AA-${match.Id}`) ? dataChangeCLass : notDataChangeClass}
                >
                    <div>
                        <span className="link-a"  onClick={this._openBetItem.bind(this, match, matchKey, 8)}>
                            {(match.AA*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
            </tr>
        )
    }
}

RowHTFTComponent.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RowHTFTComponent)