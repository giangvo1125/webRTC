import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class IndexComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.state = {
        	id: ''
        }
        // this.isShow = 'detail'
    }
    componentWillMount() {
    	
    }
	componentDidMount() {
		var peer = new Peer({key: '8uspaz2f6imuz0k9'}); 
		let self = this
		setTimeout(()=> {
			this.setState({id: peer.id})
			var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			peer.on('call', function(call) {
			  	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;navigator.getUserMedia({video: true, audio: true}, function(stream) {
					call.answer(stream); // Answer the call with an A/V stream.
				    call.on('stream', function(remoteStream) {
				    	let video = self.refs.video;
				    	video.src = URL.createObjectURL(remoteStream)
				    	video.play();
				      // Show stream in some video/canvas element.
				    });
				;}, function(err) {
					console.log('Failed to get local stream' ,err);
				});
			})
		},1000)
		
	}
	componentDidUpdate() {
	}
	_onChangeRoute(value) {
		if(value != this.state.isShow) {
			this.setState({
				isShow: value
			})
		}
	}
	onConnectCall() {
		let id = $('#id').val() || ''
		var peer = new Peer({key: '8uspaz2f6imuz0k9'});
		let self = this
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;navigator.getUserMedia({video: true, audio: true}, function(stream) {
			var call = peer.call(id, stream);
			call.on('stream', function(remoteStream) {
		    	let video = self.refs.video;
		    	video.src = URL.createObjectURL(remoteStream)
		    	video.play();
			// Show stream in some element.
			})
		;}, function(err) {
			console.log('Failed to get local stream' ,err);
		});
	}
    render(){
    	let {state: {id}} = this
    	return (
    		<div>
    			Your Id: {id}<br/>
    			<input id="id"/>
    			<button onClick={this.onConnectCall.bind(this)}>Call</button><br/>
    			<video ref="video"></video>
    		</div>
    	)
    }
}

IndexComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};


const mapStateToProps = (state) => {
	return {
		changePassword: state.helper.language.changePassword, 
		user: state.auth.user, 
	}
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
			 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(IndexComponent)