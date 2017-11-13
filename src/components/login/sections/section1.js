import React, { Component } from 'react'
import { connect } from 'react-redux'

import userAction from '../../../actions/user_action'
import helperAction from '../../../actions/helper_action'

import { bindActionCreators } from 'redux'

class Section1Component extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
	}
	componentDidMount() {
		this.changeImage = setInterval(() => {
			let elemList = $('.carousel__image').find('img')
			elemList.each((index, el) => {
				let elem = $(el);
				if(elem.hasClass('active')) {
					elem.removeClass('active');
					if(index == elemList.length - 1) {
						elemList.first().addClass('active')
					}
					else
						elem.next().addClass('active')
					return false;
				}
			})
		}, 1000 * config.timeCarousel)
		this.changeDot = setInterval(() => {
			let elemList = $('.carousel-item-dot').find('li')
			elemList.each((index, el) => {
				let elem = $(el);
				if(elem.hasClass('active')) {
					elem.removeClass('active');
					if(index == elemList.length - 1) {
						elemList.first().addClass('active')
					}
					else
						elem.next().addClass('active')
					return false;
				}
			})
		}, 1000 * config.timeCarousel)
	}
	_onClickPlayNow() {
		$('#username').focus();
	}
	clickActiveImage(index) {
		let isHave = false;
		let elemBanner = $('.carousel__image').find('img')
		let elemDot = $('.carousel-item-dot').find('li')
		elemBanner.each((i, el) => {
			let elem = $(el);
			if(elem.hasClass('active') && index == i) {
				isHave = true
			}
		})
		if(isHave == false) {
			elemBanner.each((i, el) => {
				let elem = $(el);
				if(!elem.hasClass('active') && index == i) {
					elem.addClass('active')
				}
				else {
					elem.removeClass('active')
				}
			})
			elemDot.each((i, el) => {
				let elem = $(el);
				if(!elem.hasClass('active') && index == i) {
					elem.addClass('active')
				}
				else {
					elem.removeClass('active')
				}
			})
		}
	}
    render(){
    	return (
			<section>
				<div className="container">
					<div className="carousel">
						<div className="carousel__image">
							<img className="active" src="/assets/images/banner_1.png" />
							<img className="" src="/assets/images/banner_2.png" />
							<img className="" src="/assets/images/banner_3.png"/>
							<img className="" src="/assets/images/banner_4.png" />
						</div>
						<div className="carousel__info">
							<h1>Always Best Odds</h1>
							<p>With the lowest  margins.</p>
							<a className="playnow" onClick={this._onClickPlayNow.bind(this)}>Play now!</a>
							<div className="divider"></div>
							<ul className="carousel-item-dot">
								<li className="active" onClick={this.clickActiveImage.bind(this, 0)}></li>
								<li className="" onClick={this.clickActiveImage.bind(this, 1)}></li>
								<li className="" onClick={this.clickActiveImage.bind(this, 2)}></li>
								<li className="" onClick={this.clickActiveImage.bind(this, 3)}></li>
							</ul>
						</div>
					</div>
				</div>
			</section>
		)
    }
}

Section1Component.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...userAction,
			...helperAction, 
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(Section1Component)