import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../actions/helper_action'
import userAction from '../../actions/user_action'

import ChangePassword from './detail/change_password'
import PreferenceDetail from './detail/preference'

class PreferenceComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.state = {
        	isShow: 'detail'
        }
        // this.isShow = 'detail'
    }
	componentDidMount() {
		
	}
	_onChangeRoute(value) {
		if(value != this.state.isShow) {
			this.setState({
				isShow: value
			})
		}
	}
    render(){
    	let {
    		changePassword
    	} = this.props;
    	if(!Helper.checkObj(changePassword)) changePassword = {}
    	return (
    		<article className="article">
				<div className="portlet">
					<div className="portlet__header">
						<h4 className="title">
							<img src="/assets/images/icon-p1.png" alt=""/> {
								this.state.isShow == 'detail' ? 
								changePassword.settingTitle : 
								changePassword.changePassTitle
							}
						</h4>
					</div>
					<div className="portlet__body">
						<div>
							{
								this.state.isShow == 'detail'? 
								<PreferenceDetail key={'preference-detail'}/> : 
								<ChangePassword key={'change-password'}/>
							}
						</div>
						<div className="footer-change-password">
							<span 
								className={`${this.state.isShow == 'change-password' ? 'text-white' : 'footer-change-password-label'}`}
								onClick={this._onChangeRoute.bind(this, 'change-password')}
							>
									{changePassword.changePassTitle || 'Change Password'}
							</span> 
							<span className="text-white margin-left-10 margin-right-10">|</span>
							<span 
								className={`${this.state.isShow == 'detail' ? 'text-white' : 'footer-change-password-label'}`}
								onClick={this._onChangeRoute.bind(this, 'detail')}
							>
								{changePassword.preferenceTitle || 'Preferences'}
							</span>
						</div>
					</div>
				</div>
			</article>
		)
    }
}

PreferenceComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
	return {
		changePassword: state.helper.language.changePassword, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...helperAction,
			...userAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(PreferenceComponent)