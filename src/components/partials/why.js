import React, { Component } from 'react'

class WhyComponent extends Component{
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
							<div className="page-header"><h1 className="">WHY CHOOSE UFABET</h1></div>
							<div className="page-content">
								<p>
									<font style={{fontFamily: 'Tahoma'}}> 
										<font style={{color: '#6a5127', fontWeight: 'bold'}}>Best Prices</font><br/>
										UFAbet offers the most competitively priced odds among the major 
										sportsbooks worldwide.
									</font>
								</p>
								<p><font style={{fontFamily: 'Tahoma'}}> 
									<font style={{color: '#6a5127', fontWeight: 'bold'}}>Fastest Payout</font><br/>
										Payment effected within 24 hours of receipt of your funds 
										withdrawal request.<br/>
									</font>
									<font style={{fontFamily: 'Tahoma'}}>Read tutorial to learn how you can submit a funds withdrawal 
									request: How do I withdraw funds from my account?</font>
								</p>
								<p><font style={{fontFamily: 'Tahoma'}}> <font style={{color: '#6a5127', fontWeight: 'bold'}}>Widest 
								Selections Of Events</font><br/>
								From over 500 sporting events every week in Sportsbook, 
								an extensive range of casino games in Casino, a wide variety 
								of international horse racing events in Racebook and exclusive 
								games in Games, UFAbet is a 1-Stop Shop offering a complete 
								suite of gaming products. Bet on your favorite sport, 
								team or selection with us.</font></p>
								<p><font style={{fontFamily: 'Tahoma'}}>Find 
								out more about UFAbet Sportsbook and UFAbet Games.</font></p>
								<p><font style={{fontFamily: 'Tahoma'}}> <font style={{color: '#6a5127', fontWeight: 'bold'}}>Access 
								Anytime Anywhere</font><br/>
								With UFAbet WAP and iPhone service, you can bet whilst 
								sitting in the comfort of the stadium while enjoying the 
								game. </font></p>
								<p><font style={{fontFamily: 'Tahoma'}}>Learn 
								more about UFAbet WAP and UFAbet iPhone service.</font></p>
								<p><font style={{fontFamily: 'Tahoma'}}><font style={{color: '#6a5127', fontWeight: 'bold'}}>Easy 
								Payment Methods</font><br/>
								Through our tie-ups with various payment solution providers 
								such as Moneybookers and NETELLER, settlement of accounts 
								has never been easier.</font></p>
								<p><font style={{fontFamily: 'Tahoma'}}>Find 
								out the payment methods you can use to deposit funds into 
								your UFAbet account: What can I use to deposit funds into 
								my account?</font></p>
								<p><font style={{fontFamily: 'Tahoma'}}> <font style={{color: '#6a5127', fontWeight: 'bold'}}>Wide 
								Browser Compatibility</font><br/>
								UFAbet supports a wide array of popular browsers like 
								Microsoft Internet Explorer, Mozilla Firefox, Apple Safari 
								and Opera. There is no need to change your favorite browser 
								because of us.</font></p>
								<p><font style={{fontFamily: 'Tahoma'}}>Find 
								out the wide range of web browsers which UFAbet supports: 
								Can I use my existing browser to view UFAbet?</font></p>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
    }
}

WhyComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default WhyComponent