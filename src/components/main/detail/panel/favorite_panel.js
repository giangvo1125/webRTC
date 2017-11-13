import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import PanelComponent from '../../helper/panel'

import helperAction from '../../../../actions/helper_action'

class FavoritePanelComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
    }
	componentWillMount() {
	}
    _onChangePanelActive() {
        this.props.updateIsShowFavorite(true);
    }
    render(){
    	let { 
    		favoritePanel, 
    		favorite: {
    			isActive, 
    		}
    	} = this.props;
    	if(!Helper.checkObj(favoritePanel)) favoritePanel = {}

    	return (
    		<PanelComponent 
				iconClass="fa fa-star text-gold" 
				title={favoritePanel.title || "My Favorite"}
				active={isActive || false}
                onClick={this._onChangePanelActive.bind(this)}
			>
			</PanelComponent>
    	)
    }
}

FavoritePanelComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
		favoritePanel: state.helper.language.favoritePanel, 
		favorite: state.helper.mainMenuActive.favorite, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
            ...helperAction,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(FavoritePanelComponent)