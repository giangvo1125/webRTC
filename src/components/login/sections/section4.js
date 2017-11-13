import React, { Component } from 'react'
import { connect } from 'react-redux'

import userAction from '../../../actions/user_action'
import helperAction from '../../../actions/helper_action'

import { bindActionCreators } from 'redux'

class Section4Component extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
	}
	componentDidMount() {
		
	}
    render(){
    	return (
			<section>
				<div className="container">
					<div className="cards">
						<a href="#" className="card card-1"><img src="/assets/images/ic_visa1.png" alt=""/></a>
						<a href="#" className="card card-1"><img src="/assets/images/ic_visa2.png" alt=""/></a>
						<a href="#" className="card card-1"><img src="/assets/images/ic_mastercard.png" alt=""/></a>
						<a href="#" className="card card-2"><img src="/assets/images/ic_ukash.png" alt=""/></a>
						<a href="#" className="card card-2"><img src="/assets/images/ic_neteller.png" alt=""/></a>
						<a href="#" className="card card-2"><img src="/assets/images/ic_sofort.png" alt=""/></a>
						<a href="#" className="card card-2"><img src="/assets/images/ic_instadebit.png" alt=""/></a>
					</div>
				</div>
			</section>
		)
    }
}

Section4Component.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...userAction,
			...helperAction, 
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Section4Component)