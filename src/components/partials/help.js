import React, { Component } from 'react'

class HelpComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentDidMount() {
		
	}
	componentWillMount() {
		$('body').addClass('body-homepage')
	}
	componentWillUnmount() {
		$('body').removeClass('body-homepage')
	}
    render(){
    	return (
			<div className="wrapper bg-homepage bg-800">
				<section>
					<div className="container container-800">
						<div className="page-info">
							<div className="page-header"><h1 className="">HELP & FAQ</h1></div>
							<div className="page-content">
								<p>
								<font style={{fontFamily: 'Tahoma'}}>
								<font style={{fontWeight: 'bold', color: '#6a5127'}}>1.
								<strong>How can I place a bet</strong>?</font>
								<br/> You can ONLY place a bet with us via our website on the internet and in accordance with our Rules &amp; Regulation</font>
								</p>
								<p>
								<font style={{fontFamily: 'Tahoma'}}>
								<font style={{fontWeight: 'bold', color: '#6a5127'}}>2. Can I cancel my bets?</font>
								<br/> No. Once we have accepted your bet, it cannot be cancelled and will be settled according to the Rules &amp; Regulations governing our website. It is important that you are familiar with these rules.</font>
								</p>
								<p>
								<font style={{fontWeight: 'bold', color: '#6a5127', fontFamily: 'Tahoma'}}>3. Are my personal details safe and kept confidential with ufabet.com?</font>
								<font size="2" face="Tahoma">
								<br/> Yes. All your personal details and the information you enter in the site will be kept in the strictest confidence.</font>
								</p>
								<p>
								<font style={{fontFamily: 'Tahoma'}}>
								<font style={{fontWeight: 'bold', color: '#6a5127'}}>4.
								<strong>What do I do if I have  forgotten my User ID or Password</strong>?</font>
								<br/> Please contact our dedicated customer services team immediately either by Email, Telephone or Fax.</font>
								</p>
								<p>
								<font style={{fontFamily: 'Tahoma'}}>
								<font style={{fontWeight: 'bold', color: '#6a5127'}}>5.
								<strong>What if there are  changes to my personal details</strong>?</font>
								<br/> Please contact our customer services team and update them on the changes immediately.</font>
								</p>
							</div>
						</div>
					</div>
				</section>
	</div>
		)
    }
}

HelpComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default HelpComponent