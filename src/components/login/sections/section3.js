import React, { Component } from 'react'
import { connect } from 'react-redux'

import userAction from '../../../actions/user_action'
import helperAction from '../../../actions/helper_action'

import { bindActionCreators } from 'redux'

class Section3Component extends Component{
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
					<div className="about">
						<div className="customer-service">
							<div className="">
								<img src="/assets/images/ic_phone.png" alt=""/>
							</div>
							<div className="flex-1">
								<h4>Customer Service</h4>
							</div>
							<div className="flex-1">
								<h5>Smart Betting</h5>
								<p>smart.ufabet.com</p>
							</div>
							<div className="flex-1">
								<h5>Customer Service</h5>
								<p>service@gmail.com</p>
							</div>
						</div>
						<div className="app-store">
							<div>
								<img src="/assets/images/ic_iphone.png" alt=""/>
							</div>
							<div className="width-140 red">
								<p>Available on the</p>
								<h4>App Store</h4>
							</div>
							<div className="flex-1">
								<a href="#" className="btn btn-block download">Download</a>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
    }
}

Section3Component.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...userAction,
			...helperAction, 
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Section3Component)