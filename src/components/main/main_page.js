import React, { Component } from 'react'
import { connect } from 'react-redux'

import userAction from '../../actions/user_action'
import helperAction from '../../actions/helper_action'
import oddAction from '../../actions/odd_action'

import TableDouble from './detail/table_double'
import TableSimple from './detail/table_simple'
import TableOutRight from './detail/table_outright'
import TableOE from './detail/table_oe'
import TableDC from './detail/table_dc'
import TableCorrectScore from './detail/table_correct'
import TableHalfTimeFullTime from './detail/table_ht_ft'
import TableGoal from './detail/table_goal'

import { bindActionCreators } from 'redux'

class MainPageComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
		this.props.getDataOdd()
		this.props.getMaxMinBetForLeague();
		this.props.getBetList();
	}
	componentDidMount() {
	}
	componentDidUpdate(){
	}
	componentWillUnmount() {
		this.props.updateResultSports(29, false)
	}
	renderTable(typeOdd, tableType) {
		switch(typeOdd) {
			default:
				if(tableType == 1) {
			    	return (
						<TableDouble key={'table-double'} />
					)
			    }
			    else {
			    	return <TableSimple key={'table-simple'} />
			    }
			break;
			case 'oddEvenTotalGoal':
				return (
					<TableOE key={'table-oe'} />
				)
			break;
			case 'doubleChange':
				return (
					<TableDC key={'table-dc'} />
				)
			break;
			case 'correctScore':
				return (
					<TableCorrectScore key={'table-correct'} />
				)
			break;
			case 'htft':
				return (
					<TableHalfTimeFullTime key={'table-ht-ft'} />
				)
			break;
			case 'goal':
				return (
					<TableGoal key={'table-goal'} />
				)
			break;
			case 'mixParlay':
				return (
					<TableDouble key={'table-double'} />
				)
			break;
			case 'outright':
				return (
					<TableOutRight key={'table-outright'} />
				)
			break;
		}
	}
    render(){
    	let {
    		isShowBetPanel, 
    		menuFilterActive: {
    			tableType, 
    			typeOdd
    		}
    	} = this.props;
    	return this.renderTable(typeOdd, tableType)
    	
    }
}

MainPageComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...helperAction,
			...oddAction, 
			...userAction, 
    }, dispatch)
}

const mapStateToProps = (state) => {
	return {
		isShowBetPanel: state.helper.isShowBetPanel, 
		menuFilterActive: state.helper.menuFilterActive, 
		codeTheme: state.helper.codeTheme, 
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPageComponent)