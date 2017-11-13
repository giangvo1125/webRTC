import React, { Component } from 'react'

class AboutComponent extends Component{
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
			<div className="wrapper bg-homepage">
				<section>
					<div className="container container-800">
						<div className="page-info">
							<div className="page-header"><h1 className="">About Us</h1></div>
							<div className="page-content">
								<p><font style={{fontWeight: 'bold', fontFamily: 'Tahoma', color: "#6a5127"}}>Who Is UFAbet?</font></p>
								<font style={{textAlign: 'justify', fontFamily: 'Tahoma'}}>
									<p>UFAbet is one of the world’s leading online gaming brands.</p>
									<p>UFAbet Sportsbook offers over 500 sporting events every week, with extensive coverage of all major soccer leagues and international sporting events. UFAbet also provides live soccer updates, immediate winnings confirmation, rapid payouts, easy access and fast online betting available around the clock.</p>
									<p>UFAbet Casino is a one-stop entertainment site offering an extensive range of casino games and the highly-rated Multi Player Live Dealer developed in conjunction with the o­nline Gaming Systems of Australia to satisfy every player’s needs.</p>
									<p>In UFAbet Games, you can choose to play exclusive games such as scratchcards, keno, poker and roulette, all with unlimited plays and no download or installation required.
									</p>
									<p>UFAbet uses the latest technologies to deliver a fast and secure player environment. At UFAbet, we are committed to providing our customers with an outstanding gaming experience. With our wide selections of products and services, UFAbet caters for all sports bettors ranging from the casual punter through to VIP players and International Bookmakers.</p>
									<p>All of this on the widest range of sports, events and markets, in the comfort of your own home or anywhere in the world. When betting with UFAbet, you can feel confident knowing that you are dealing with a reputable o­nline sportsbook whose management has many decades of experience in the gaming industry.</p>
									<p>Our friendly UFAbet Support Team is always available to assist in any way possible, including account enquiries, depositing or withdrawing of funds, or general betting assistance.
									</p>
									<p>Bet with UFAbet, the Sportsbook you can trust. </p>
								</font>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
    }
}

AboutComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default AboutComponent