import React, { Component } from 'react'
import { connect } from 'react-redux'

import userAction from '../../actions/user_action'
import oddAction from '../../actions/odd_action'
import helperAction from '../../actions/helper_action'

import { bindActionCreators } from 'redux'

class BetListComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
		this.props.getBetList();
	}
	componentDidMount() {
		
	}
    render(){
    	let { 
    		statementList
    	} = this.props;
    	if(!Helper.checkObj(statementList)) betList = {}
    	return (
			<article className="article">
				<div className="text-right">
					<a href="#" className="btn">{statementList.lastweek || 'Last Week'}</a>
					<a href="#" className="btn">{statementList.thisweek || 'This Week'}</a>
				</div>
				<div className="portlet margin-top-5">
					<div className="portlet__header">
						<h4 className="title">
							<img src="/assets/images/icon-p1.png" alt=""/> 
							{statementList.title || 'Statement'}
						</h4>
					</div>
					<div className="portlet__body">
						<div>
							<table className="table-statement">
								<thead>
									<tr>
										<th>{statementList.date || 'Date'}</th>
										<th width="100px" className="number">{statementList.stake || 'Stake'}</th>
										<th width="100px" className="number">{statementList.winlose || 'W/L'}</th>
										<th width="100px" className="number">{statementList.com || 'Com'}</th>
										<th width="100px" className="number">{statementList.settled || 'Settled'}</th>
										<th width="100px" className="number">{statementList.balance || 'Balance'}</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td>Monday 07/08/2017</td>
										<td className="number">0</td>
										<td className="number bold">0.00</td>
										<td className="number bold">0.00</td>
										<td className="number">0.00</td>
										<td className="number bold text-red">-1,991.58</td>
									</tr>
									<tr>
										<td>Monday 07/08/2017</td>
										<td className="number">0</td>
										<td className="number bold">0.00</td>
										<td className="number bold">0.00</td>
										<td className="number">0.00</td>
										<td className="number bold text-red">-1,991.58</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</article>
		)
    }
}

BetListComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...userAction,
			...helperAction, 
    }, dispatch)
}

const mapStateToProps = (state) => {
	return {
		statementList: state.helper.language.statementList, 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(BetListComponent)