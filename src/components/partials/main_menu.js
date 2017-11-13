import React, { Component } from 'react'
import { connect } from 'react-redux'

import helperAction from '../../actions/helper_action'

import { getActiveLanguage } from './selector'

import { bindActionCreators } from 'redux'

class MainMenuComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
    componentWillMount() {
    	this.props.getSpecialAnnouncement();
    }
	componentDidMount() {
		$("#toogleAside").click(function(){
	    	$(".layout").toggleClass("aside-close");
	   	});
	   	$("#toggleHeader").click(function(){
				$(".section-header").toggleClass("hide");
				$(".layout").toggleClass("header-close");
			});
	}
	_onChangeRoute(name = '/') {
		this.context.router.push(name);
	}
    render(){
    	let { 
    		mainMenu, 
    		listTranslateLanguage, 
			activeLanguage, 
			time, 
			listSpecialAnnouncement, 
    	} = this.props || {}

    	if(!Helper.checkObj(mainMenu)) mainMenu = {}

    	let listLanguage = []
    	listLanguage = listTranslateLanguage.map((item, index) => {
    		let key = `key-translate-${item.label}`
    		return (
    			<a 
    				key={key} 
    				onClick={this.props.changeTransLate.bind(this, item.key)}
    			>
    				{item.label}
    			</a>
    		)
    	})

    	let stringAnnouncement = [];
    	if(listSpecialAnnouncement.length > 0) {
    		listSpecialAnnouncement.forEach((item) => {
    			// stringAnnouncement+= `\n${item.body}`;
    			stringAnnouncement.push(<span className="margin-right-20" key={Math.random()}>{item.body}</span>)
    		})
    	}
    	else {
    		// stringAnnouncement = 'UFA BET !!!'
    	}
    	return (
			<nav className="section-main-menu">
			<div className="container">
				<div className="main-menu border">
					
					<div className="language" onClick={()=>{
						
					}}>
						<div className="language-selected">
							<span>{activeLanguage.label || ''}</span>
							<i className={`flag margin-right-10 ${activeLanguage.class}`}></i>
							<i className="fa fa-caret-down"></i>
							|
						</div>
						<div className="language-content">
							{listLanguage}
						</div>
					</div>
					<div className="time">{moment(time).format('MM/DD/YYYY HH:mm A')}</div>
					<button id="toogleAside"><i className="fa fa-long-arrow-left"></i></button>
					<button id="toggleHeader"><i className="fa fa-long-arrow-up"></i></button>
					<p><marquee>{stringAnnouncement}</marquee></p>
				</div>
			</div>
		</nav>
		)
    }
}

MainMenuComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
	return {
		mainMenu: state.helper.language.mainMenu, 
		listTranslateLanguage: state.helper.listTranslateLanguage, 
		activeLanguage: getActiveLanguage(state), 
		time: state.helper.time, 
		listSpecialAnnouncement: state.helper.listSpecialAnnouncement, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			...helperAction, 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainMenuComponent)