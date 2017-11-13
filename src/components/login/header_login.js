import React, { Component } from 'react'
import { connect } from 'react-redux'

import userAction from '../../actions/user_action'
import oddAction from '../../actions/odd_action'
import helperAction from '../../actions/helper_action'

import { bindActionCreators } from 'redux'

class HeaderLoginComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.state = {
        	username: '', 
        	password: '', 
        }
    }
	componentWillMount() {
	}
	componentDidMount() {
		
	}
	_onLogin() {
		let obj = {
			browser: 'web'
		}
		obj.username = this.state.username
		obj.password = this.state.password
		this.props.login(obj)
		.then(() => {
			this.props.getBetSetting()
			this.props.getAllSportsLineOdds()
			this.props.initChange()
			this.context.router.push('/welcome')
		}, (err) => {
			alert(err.data.Message)
		})
	}
	_onSelectLanguage(e) {
		let value = e.target.value;
		this.props.changeTransLate(value)
	}
	_setData(key, e) {
		let value = e.target.value;
		let obj = {}
		obj[key] = value;
		this.setState(obj)
	}
	_openNewWindow(link) {
		window.open(link, 'footer', 'location=yes,height=600,width=1024,scrollbars=yes,status=yes, top=100, left=300')
	}
    render(){
    	let {
    		props: {
    			listTranslateLanguage, 
    			keyTranslate, 
    			header, 
    		}, 
    		state: {
    			username, 
    			password, 
    		}
    	} = this
    	if(!Helper.checkObj(header)) header = {}
    	let list_language = listTranslateLanguage.map((item) => {
    		return (
    			<option value={item.key} key={`language-option-${item.key}`}>{item.label}</option>
    		)
    	})
    	return (
			<header>
				<div className="container">
					<div className="homepage">
						<div className="logo"><img src="/assets/images/logo_UFA.png" /></div>
						<div className="homepage-right">
							<div className="homepage-control">
								<form className="form-login-homepage">
									<div className="width-150">
										<div className="form-select">
											<select value={keyTranslate || ''} onChange={this._onSelectLanguage.bind(this)}>
												{list_language}
											</select>
										</div>
									</div>
									<div className="flex-2">
										<div className="form-input">
											<input 
												type="text" 
												placeholder={header.namePlaceHolder || 'USERNAME'} 
												value={username || ''} 
												id='username'
												onChange={this._setData.bind(this, 'username')} 
												onKeyPress={(e) => {
													if(e.key == 'Enter') {
														this._onLogin()
													}
												}} 
											/>
										</div>
									</div>
									<div className="flex-2">
										<div className="form-input">
											<input 
												type="password" 
												placeholder={header.passPlaceHolder || 'PASSWORD'} 
												value={password || ''} 
												onChange={this._setData.bind(this, 'password')} 
												onKeyPress={(e) => {
													if(e.key == 'Enter') {
														this._onLogin()
													}
												}} 
											/>
										</div>
									</div>
									<div className="flex-1">
										<a onClick={this._onLogin.bind(this)} className="form-button">
											{header.loginBtn || 'Login'}
										</a>
									</div>
								</form>
							</div>
							<div className="homepage-menu">
								<ul>
									<li onClick={this._openNewWindow.bind(this, '/about')}>
										<a>{header.aboutus || 'about us'}</a>
									</li>
									<li onClick={this._openNewWindow.bind(this, '/rule')}>
										<a>{header.bettingrules || 'betting rules'}</a>
									</li>
									<li onClick={this._openNewWindow.bind(this, '/help')}>
										<a>{header.helpfaq || 'help & FAQ'}</a>
									</li>
									<li onClick={this._openNewWindow.bind(this, '/contact')}>
										<a>{header.contactus || 'contact us'}</a>
									</li>
									<li onClick={this._openNewWindow.bind(this, '/why')}>
										<a>{header.whychooseus || 'why choose us'}</a>
									</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
			</header>
		)
    }
}

HeaderLoginComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		listTranslateLanguage: state.helper.listTranslateLanguage, 
		keyTranslate: state.helper.keyTranslate, 
		header: state.helper.language.home.header, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...userAction,
			...oddAction, 
			...helperAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderLoginComponent)