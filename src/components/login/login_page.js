import React, { Component } from 'react'
import { connect } from 'react-redux'

import userAction from '../../actions/user_action'
import oddAction from '../../actions/odd_action'
import helperAction from '../../actions/helper_action'

import Section1 from './sections/section1'
import Section2 from './sections/section2'
import Section3 from './sections/section3'
import Section4 from './sections/section4'
import HeaderLogin from './header_login'

import { bindActionCreators } from 'redux'

class LoginComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
		$('body').addClass('body-homepage')
	}
	componentDidMount() {
		
	}
	componentWillUnmount() {
		$('body').removeClass('body-homepage')
	}
    render(){
    	return (
			<div className="wrapper bg-homepage">
				<HeaderLogin/>
				<main className="">
					<Section1/>
					<Section2/>
					<Section3/>
					<div className="divider divider-1"></div>
					<Section4/>
				</main>
			</div>
		)
    }
}

LoginComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...userAction,
			...oddAction,
			...helperAction, 
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(LoginComponent)