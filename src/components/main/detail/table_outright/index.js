import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

// import RowDouble from './row_double'

import helperAction from '../../../../actions/helper_action'
import oddAction from '../../../../actions/odd_action'

import { sortOutRightOdds } from '../../selector'

class TableOutRightComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.autoGetDataOdd = ''
    }
	componentWillMount() {
	}
    _openBetItem(match, leagueId, Name) {
    	let data = match;
    	data.leagueId = leagueId;
    	data.Name = Name;
        // let data = {
        //     keyBet: keyBet, 
        //     teamNumber: teamNumber, 
        //     period: obj, 
        //     teamObj: teamObj, 
        //     Name: Name,
        //     matchString: matchString, 
        //     matchKey: matchKey, 
        // }
        this.props.getLine(data, 'outright');
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        // clearInterval(this.autoGetDataOdd)
    }
    render(){ 
        let { outRightOdd, tableOutRight, oddType, tweakOdd } = this.props;
        if(!Helper.checkObj(tableOutRight)) tableOutRight = {}

        let percent = 1 - tweakOdd/100;
        let list_data = outRightOdd.map((item, index) => {
        	let list_team = [];
        	list_team = item.matches.map((match, matchIndex) => {
        		return (
        			<tr className="points" key={`${item.Id}-${match.Team1}`}>
						<td className="bold">{match.Team1}</td>
						<td className="text-center link-a" onClick={this._openBetItem.bind(this, match, item.Id, item.Name)}>
                            {(match.Value*percent).toFixed(2)}
                        </td>
					</tr>
        		)
        	})
        	return (
        		<tbody key={`outright-${item.Id}`}>
					<tr className="league">
						<td colSpan="2">
							<div className="flex">
								<span className="flex-1">{item.Name}</span>
								<span><a href="#" className="btn-refresh"><i className="fa fa-refresh"></i></a></span>
							</div>
						</td>
					</tr>
					{list_team}
				</tbody>
        	)
        })
    	return (
    		<div className="container-min">
				<table className="table-normal">
					<thead>
						<tr>
							<th>{tableOutRight.outright || 'Outright'}</th>
							<th width="150px">{tableOutRight.win || 'Win'}</th>
						</tr>
					</thead>
					{list_data}
				</table>
			</div>
    	)
    }
}

TableOutRightComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
        tableOutRight: state.helper.language.tableOutRight, 
        outRightOdd: sortOutRightOdds(state), 
        oddType: state.odd.oddType, 
        tweakOdd: state.auth.tweakOdd, 
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...helperAction,
            ...oddAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TableOutRightComponent)