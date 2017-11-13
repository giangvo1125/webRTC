import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../actions/helper_action'
import userAction from '../../actions/user_action'
import oddAction from '../../actions/odd_action'

class HeaderComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentDidMount() {
		
	}
	_onLogOut() {
		document.querySelector('meta[name="viewport"]').setAttribute('content', 'initial-scale=1, maximum-scale=1');
		this.props.logout();
		this.props.resetOddData();
		this.props.resetHelperData();
		this.props.resetUserData();
	}
	_onChangeToHome() {
		if(window.location.pathname.length > 1) {
			this.context.router.push('/')
		}
	}
    render(){
    	let { 
    		headers, 
    		listTranslateLanguage, 
    		activeLanguage, 
    		user, 
    		time, 
    	} = this.props || {}
    	if(!Helper.checkObj(headers)) headers = {}
    	return (
			<header className="section-header">
				<div className="container">
					<div className="header" style={{overflowX: 'hidden'}}>
						<div className="header__left">
							<div className="logo">
								<img style={{width: '250px'}} src="/assets/images/logo_UFA.png"/>
							</div>
							
						</div>
						<div className="header__menu margin-top-50">
							<ul>
								<li onClick={this._onChangeToHome.bind(this)}>
									<a>{headers.homeMenu || 'home'}</a>
								</li>
								<li>
									<a>{headers.gameMenu || 'games'}</a>
								</li>
								<li>
									<a>{headers.casinoMenu || 'casino'}</a>
								</li>
								<li>
									<a>{headers.stepMenu || 'step'}</a>
								</li>
							</ul>
						</div>
						<div className="header__right">
							<div className="user">
								<div className="user__info">
									<div style={{
										    whiteSpace: 'nowrap', 
										    /* width: 12em; */
										    overflow: 'hidden', 
										    textOverflow: 'ellipsis', 
									}}>
										{headers.welcomeLabel || 'Welcome'} : <b>{user.username || ''}</b>
									</div>
									<div style={{
										    whiteSpace: 'nowrap', 
										    /* width: 12em; */
										    overflow: 'hidden', 
										    textOverflow: 'ellipsis', 
									}}>
										{headers.creditLabel || 'Credit'} : <b>{user.credit || 0}</b>
									</div>
								</div>
								<div className="user__action">
									<a className="link-a" onClick={(e)=> {
										this.context.router.push('/preference')
									}}>
										<b>{headers.preferenceLabel || 'Preferences'}</b>
									</a> |&nbsp; 
									<a className="link-a" onClick={this._onLogOut.bind(this)}>
										<b>{headers.logoutLabel || 'Logout'}</b>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</header>
		)
    }
}

HeaderComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		headers: state.helper.language.headers, 
		user: state.auth.user, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...helperAction,
			...userAction, 
			...oddAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderComponent)