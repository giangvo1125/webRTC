import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

class IndexComponent extends Component{
	constructor(props, context) {
        super(props)
        context.router
        this.state = {
        	id: '', 
        	peer: new Peer({host: config.domainRTC, port: config.portRTC, path: '/peerjs', secure: true})
        }
        // this.isShow = 'detail'
    }
    componentWillMount() {
    	
    }
	componentDidMount() {
		var peer = this.state.peer
		let self = this
		setTimeout(()=> {
			this.setState({id: peer.id})
			var getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
			peer.on('call', function(call) {
			  	navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;navigator.getUserMedia({video: true, audio: true}, function(stream) {
					call.answer(stream); // Answer the call with an A/V stream.
				    call.on('stream', function(remoteStream) {
				    	let videoRecieve = self.refs.videoRecieve;
				    	videoRecieve.src = URL.createObjectURL(call.localStream)
				    	videoRecieve.play();
				    	setTimeout(()=> {
				    		let videoCall = self.refs.videoCall;
					    	videoCall.src = URL.createObjectURL(remoteStream)
					    	videoCall.play();
				    	},1000)
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
	onConnectCall() {
		let id = $('#id').val() || ''
		var peer = this.state.peer;
		let self = this
		navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;navigator.getUserMedia({video: true, audio: true}, function(stream) {
			var call = peer.call(id, stream);
			call.on('stream', function(remoteStream) {
				let videoCall = self.refs.videoCall;
		    	videoCall.src = URL.createObjectURL(call.localStream)
		    	videoCall.play();
		    	setTimeout(()=> {
		    		let videoRecieve = self.refs.videoRecieve;
			    	videoRecieve.src = URL.createObjectURL(remoteStream)
			    	videoRecieve.play();
		    	},1000)
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
    			<video ref="videoCall"></video><br/>
    			<video ref="videoRecieve"></video>
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