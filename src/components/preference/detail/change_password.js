import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import helperAction from '../../../actions/helper_action'
import userAction from '../../../actions/user_action'

class ChangePasswordComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.state = {
        	oldpassword: '', 
        	newpassword: '', 
        	confirmpassword: '', 
        }
    }
	componentDidMount() {
		
	}
	_setData(key, e) {
		let regexp = new RegExp(Helper.normalString);
		let value = e.target.value;
		if(regexp.test(value) && value.length < 16) {
			$('#requireLenCharacters').removeClass('text-red')
			$('#requirePathPassword').removeClass('text-red')
			$('#requireCombinationPassword').removeClass('text-red')
			let obj = {}
			obj[key] = value
			this.setState(obj)
		}
	}
	_resetData() {
		this.setState({
			oldpassword: '', 
			newpassword: '', 
			confirmpassword: '', 
		})
	}
	_onClickChangePassword() {
		let {
			state: {
				oldpassword, 
				newpassword, 
				confirmpassword,
			}, 
			props: {
				changePassword, 
				user: {
					username
				}
			}
		} = this;
		if(newpassword == confirmpassword) {
			let regexPass = new RegExp(Helper.regexPassword)
			if(regexPass.test(newpassword)) {
				if(newpassword.indexOf(username) == -1) {
					this.props.changePass(oldpassword, newpassword)
					.then(() => {
						alert(changePassword.changeSuccess);
						this._resetData()
					})
				}
				else {
					alert(changePassword.passwordInvalid)
					$('#requirePathPassword').addClass('text-red')
				}
			}
			else {
				alert(changePassword.passwordInvalid)
				$('#requireLenCharacters').addClass('text-red')
				$('#requireCombinationPassword').addClass('text-red')
			}
		}
		else {
			alert(changePassword.passwordNotMatch)
		}
	}
    render(){
    	let {
    		props: {
    			user, 
    			changePassword, 
    		}, 
    		state: {
    			oldpassword, 
				newpassword, 
				confirmpassword, 
    		}
    	} = this;
    	if(!Helper.checkObj(changePassword)) changePassword = {}
    	return (
    		<table className="table-account">
    			<tbody>
					<tr>
						<td className="bold">{changePassword.username || 'User Name'}:</td>
						<td>{user.username || ''}</td>
					</tr>
					<tr>
						<td className="bold">{changePassword.oldpass || 'Old Password'}:</td>
						<td>
							<input 
								type="password" 
								className="form-control width-200" 
								value={oldpassword || ''}
								onChange={this._setData.bind(this, 'oldpassword')} 
							/>
						</td>
					</tr>
					<tr>
						<td className="bold">{changePassword.newpass || 'New Password'}:</td>
						<td>
							<input 
								type="password" 
								className="form-control width-200" 
								value={newpassword || ''}
								onChange={this._setData.bind(this, 'newpassword')} 
							/>
						</td>
					</tr>
					<tr>
						<td className="bold">{changePassword.confirmpass || 'Confirm Password'}:</td>
						<td>
							<input 
								type="password" 
								className="form-control width-200" 
								value={confirmpassword || ''}
								onChange={this._setData.bind(this, 'confirmpassword')} 
							/>
						</td>
					</tr>
					<tr>
						<td>
							<a 
								className="btn bold btn-blue" 
								onClick={this._onClickChangePassword.bind(this)}
							>
								{changePassword.saveBtn || 'Save'}
							</a>
						</td>
						<td>
							<a 
								className="btn bold btn" 
								onClick={this._resetData.bind(this)}
							>
								{changePassword.resetBtn || 'Reset'}
							</a>
						</td>
					</tr>
					<tr>
						<td colSpan="2" className="text-left">
							<p id="requireLenCharacters">{changePassword.requireLenCharacters || '*Your password must contain 8-15 characters.'}</p>
							<p id="requireCombinationPassword">{changePassword.requireCombinationPassword || '*Your password must include a combination of alphabetic characters and numbers.'}</p>
							<p id="requirePathPassword">{changePassword.requirePathPassword || '*Your password must not contain your login name, first and last name.'}</p>
							<p id="requireExpirePassword">{changePassword.requireExpirePassword || '*Your password will expire 60 days  after your last update.'}</p>
						</td>
					</tr>
				</tbody>
			</table>
		)
    }
}

ChangePasswordComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
	return {
		user: state.auth.user, 
		changePassword: state.helper.language.changePassword, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...helperAction,
			...userAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePasswordComponent)