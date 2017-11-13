import React, { Component } from 'react'

class ContactComponent extends Component{
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
							<div className="page-header"><h1 className="">Contact Us</h1></div>
							<div className="page-content bg-contact">
								<p><font><font style={{fontFamily: 'Tahoma', color: '#6a5127'}}>Smart Betting<br/>
								</font></font><font style={{fontFamily: 'Tahoma', color: '#6a5127'}}>smart.ufabet.com</font></p>
								<p><font><font style={{fontFamily: 'Tahoma', color: '#6a5127'}}>Customer 
								Service<br/>
								</font></font><font style={{fontFamily: 'Tahoma'}}>ufabetsup@gmail.com</font>
								</p>
							</div>
						</div>
					</div>
				</section>
			</div>
		)
    }
}

ContactComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default ContactComponent