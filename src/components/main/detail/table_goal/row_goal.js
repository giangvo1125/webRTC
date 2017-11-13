import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

let { expireCookies } = config

class RowGoalComponent extends Component{
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
            this.props._openBetItem('goal', teamNumber, match, teamObj, stringMatch, matchKey)
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
                <td>
                    <div>
                        <span 
                            id={`HFG-${match.Id}`} 
                            className={Helper.isExistedDataInArray(this.stringUpdate, `HFG-${match.Id}`) ? dataChangeCLass : notDataChangeClass} 
                            onClick={this.props._openBetItem.bind(this, match, matchKey, 0)}
                        >
                            {(match.HFG*percent).toFixed(2)}
                        </span>
                    </div>
                    <div>
                        <span 
                            id={`AFG-${match.Id}`} 
                            className={Helper.isExistedDataInArray(this.stringUpdate, `AFG-${match.Id}`) ? dataChangeCLass : notDataChangeClass} 
                            onClick={this.props._openBetItem.bind(this, match, matchKey, 2)}
                        >
                            {(match.AFG*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td>
                    <div>
                        <span 
                            id={`HLG-${match.Id}`} 
                            className={Helper.isExistedDataInArray(this.stringUpdate, `HLG-${match.Id}`) ? dataChangeCLass : notDataChangeClass} 
                            onClick={this.props._openBetItem.bind(this, match, matchKey, 1)}
                        >
                            {(match.HLG*percent).toFixed(2)}
                        </span>
                    </div>
                    <div>
                        <span 
                            id={`ALG-${match.Id}`} 
                            className={Helper.isExistedDataInArray(this.stringUpdate, `ALG-${match.Id}`) ? dataChangeCLass : notDataChangeClass} 
                            onClick={this.props._openBetItem.bind(this, match, matchKey, 3)}
                        >
                            {(match.ALG*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
                <td>
                    <div>
                        <span 
                            id={`NG-${match.Id}`} 
                            className={Helper.isExistedDataInArray(this.stringUpdate, `NG-${match.Id}`) ? dataChangeCLass : notDataChangeClass} 
                            onClick={this.props._openBetItem.bind(this, match, matchKey, 4)}
                        >
                            {(match.NG*percent).toFixed(2)}
                        </span>
                    </div>
                </td>
            </tr>
        )
    }
}

RowGoalComponent.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(RowGoalComponent)