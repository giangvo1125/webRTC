import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import RowGoal from './row_goal'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

let { expireCookies } = config

class TableGoalComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.stringUpdate = []
        this.previousData = []
    }
	componentWillMount() {
	}
    componentDidMount() {
        let {
            item, 
        } = this.props;
        // this.setState({
        //     previousItem: item 
        // })
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
        list_matches = item.matches.map((match, matchIndex) => {
            let matchKey = `${match.Id}-${item.Id}`
            return (
                <RowGoal 
                    index={matchIndex}
                    key={matchKey} 
                    matchKey={matchKey} 
                    match={match} 
                    tweakOdd={tweakOdd} 
                    _openBetItem={this._openBetItem.bind(this)} 
                />
            )
        })
        return (
            <tbody key={key}>
                <tr className="league">
                    <td colSpan="11">
                        <div>
                            <span>{item.Name}</span>
                            <a className="or"><img src="/assets/images/or.gif" alt=""/></a>
                        </div>
                    </td>
                </tr>
                {list_matches}
            </tbody>
        )
    }
}

TableGoalComponent.contextTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(TableGoalComponent)