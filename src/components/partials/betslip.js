import React, { Component } from 'react'

class BetSlipComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.state = {
        	data: {}, 
        }
    }
	componentDidMount() {
		var qrcode = new QRCode("qrcode", {
			width: 242,
    		height: 242,
		});
		qrcode.makeCode('https://www.google.com.vn/search?q=javascript+create+qr+code&oq=javascript+create+QR&aqs=chrome.1.69i57j0l5.4501j0j7&sourceid=chrome&ie=UTF-8');
		window.print();
	}
	componentWillMount() {
		$('body').css('background','white')
		let ticket = this.props.params.ticketId;
		let data = Cookies.get(ticket)
		if(Helper.checkData(data)) {
			this.setState({
				data: JSON.parse(data)
			})
		}
	}
	componentWillUnmount() {
		$('body').removeCss('background')
	}
    render(){
    	let {
    		state: {
    			data
    		}
    	} = this;
    	return (
			<div>
				<table style={{
					fontWeight: 'normal',
				    fontSize: '12px',
				    color: 'black',
				    fontFamily: 'Tahoma, Helvetica, sans-serif', 
				    border: '1px solid black', 
				    height: '245px', 
    				marginLeft: '3px', 
    				width: '244px', 
				}}>
					<tbody>
						<tr>
	                        <td width="100">
	                            S/No
	                            :
	                        </td>
	                        <td>
	                            {data.dateString}
	                        </td>
	                    </tr>
	                    <tr>
	                        <td width="100">
	                            Branch Code
	                            :
	                        </td>
	                        <td>
	                            {data.username}
	                        </td>
	                    </tr>
	                    <tr>
	                        <td width="100">
	                            Date/Time
	                            :
	                        </td>
	                        <td>
	                            {moment(data.dateTime).format('DD/MM HH:mm:ss A')}
	                        </td>
	                    </tr>
	                    <tr>
	                        <td width="100">
	                            Game Type
	                            :
	                        </td>
	                        <td>
	                            Single Bet
	                        </td>
	                    </tr>
	                    <tr>
	                        <td colSpan="2">
	                            &nbsp;
	                        </td>
	                    </tr>
	                    <tr>
	                        <td colSpan="2">
	                            <table style={{borderCollapse: 'collapse', border: '0'}} cellSpacing="0" cellPadding="3" width="100%">
	                                <tbody><tr>
	                                    <td>
	                                        {data.teamChoose}
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <td>
	                                        {`${data.team1} -vs- ${data.team2}`}<br/>{moment(data.dateTime).format('HH:mm')}
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <td>
	                                        Type:
	                                        {data.typeOdd}
	                                        &nbsp;&nbsp;&nbsp;
	                                        Odds:
	                                        {data.odd}
	                                    </td>
	                                </tr>
	                                <tr>
	                                    <td>
	                                        Bet
	                                        :
	                                        Over&nbsp;{data.line}
	                                    </td>
	                                </tr>
	                            </tbody></table>
	                        </td>
	                    </tr>
	                    <tr>
	                        <td colSpan="2">
	                            &nbsp;
	                        </td>
	                    </tr>
	                    <tr>
	                        <td width="100">
	                            Bet Amount
	                            :
	                        </td>
	                        <td>
	                            {data.finalstake}
	                        </td>
	                    </tr>
	                    <tr>
	                        <td width="100">
	                            Odds :
	                        </td>
	                        <td>
	                            {data.odd}
	                        </td>
	                    </tr>
	                    <tr>
	                        <td width="100">
	                            Est. /Payout
	                            :
	                        </td>
	                        <td>
	                            {(data.finalstake*data.odd).toFixed(2)}
	                        </td>
	                    </tr>
                	</tbody>
				</table>

				<div id="qrcode" style={{marginTop: '10px'}}></div>
			</div>
		)
    }
}

BetSlipComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default BetSlipComponent