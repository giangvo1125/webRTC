import React, { Component } from 'react'
import { connect } from 'react-redux'

import userAction from '../../../actions/user_action'
import helperAction from '../../../actions/helper_action'

import { bindActionCreators } from 'redux'

class Section2Component extends Component{
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
					<div className="services">
						<div className="service">
							<div className="service__image">
								<img src="/assets/images/img_sport.png" alt="" />	
							</div>
							<div className="service__info">
								<h4>SPORT</h4>
								<p>The excitement starts now.</p>
								<a href="#" className="service__link"><i className="icon icon-arrow-right"></i></a>
							</div>
						</div>
						<div className="service">
							<div className="service__image">
								<img src="/assets/images/img_games.png" alt="" />	
							</div>
							<div className="service__info">
								<h4>GAMES</h4>
								<p>Earn money and level up!</p>
								<a href="#" className="service__link"><i className="icon icon-arrow-right"></i></a>
							</div>
						</div>
						<div className="service">
							<div className="service__image">
								<img src="/assets/images/img_casino.png" alt="" />	
							</div>
							<div className="service__info">
								<h4>CASINO</h4>
								<p>Live casino on mobile!</p>
								<a href="#" className="service__link"><i className="icon icon-arrow-right"></i></a>
							</div>
						</div>
					</div>
				</div>
			</section>
		)
    }
}

Section2Component.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...userAction,
			...helperAction, 
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Section2Component)