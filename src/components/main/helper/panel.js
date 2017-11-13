import React, { Component } from 'react'
import { connect } from 'react-redux'

class PanelComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
	}
    render(){
    	let {
    		iconClass, 
    		title, 
    		active, 
            onClick, 
    	} = this.props;
    	return (
    		<div className={`panel ${active == true ? 'active' : ''}`} onClick={(e)=> {
                if(typeof onClick === 'function') {
                    onClick();
                }
            }}>
				<div className="panel__header">
					<i className={iconClass || ''}></i>
					<span className="title">{title || ''}</span>
				</div>
				<div className="panel__body">
					{this.props.children}
				</div>
			</div>
    	)
    }
}

PanelComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

export default connect(null)(PanelComponent)