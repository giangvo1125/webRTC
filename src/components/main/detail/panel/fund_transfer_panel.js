import React, { Component } from 'react'
import { connect } from 'react-redux'

import PanelComponent from '../../helper/panel'

class FundTransferPanelComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
	}
    render(){
    	let { 
    		fundTransferPanel, 
    		fundTransfer: {
    			isActive
    		}
    	} = this.props;
    	if(!Helper.checkObj(fundTransferPanel)) fundTransferPanel = {}

    	return (
    		<PanelComponent 
				iconClass="fa fa-dollar" 
				title={fundTransferPanel.title || 'Fund Transfer'}
				active={isActive || false}
			>
				<table className="table-fund">
					<tbody>
						<tr>
							<td><div>{fundTransferPanel.totalBalance || 'Total Balance'}</div></td>
							<td><div className="text-red bold">-1,992</div></td>
						</tr>
						<tr>
							<td><div>{fundTransferPanel.sportBookBalance || 'Sportsbook Balance'}</div></td>
							<td><div className="text-red bold">-1,992</div></td>
						</tr>
						<tr>
							<td><div className="padding-bottom-10">{fundTransferPanel.transferEGameBalance || 'Transfer E-Game Balance'}</div></td>
							<td>
								<div className="margin-top-10"><input type="number"/></div>
								<div><a className="btn btn-info">{fundTransferPanel.transfer || 'Transfer'}</a></div>
							</td>
						</tr>
						<tr>
							<td><div className="padding-bottom-10">{fundTransferPanel.eGamesBalance || 'E-Games Balance'}</div></td>
							<td>
								<div className="margin-top-10">0.00</div>
								<div><a className="btn btn-info">{fundTransferPanel.cashOut || 'Cash Out'}</a></div>
							</td>
						</tr>
					</tbody>
				</table>
			</PanelComponent>
    	)
    }
}

FundTransferPanelComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		fundTransferPanel: state.helper.language.fundTransferPanel, 
		fundTransfer: state.helper.mainMenuActive.fundTransfer, 
	}
}

export default connect(mapStateToProps)(FundTransferPanelComponent)