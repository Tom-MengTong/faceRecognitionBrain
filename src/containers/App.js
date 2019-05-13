import React, {Component} from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
import SignIn from '../components/SignIn/SignIn';
import Register from '../components/Register/Register';
import FaceRecognition from '../components/FaceRecognition/FaceRecognition';
import './App.css';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';


const app = new Clarifai.App({
 apiKey: '923f46a9870a4775829b072e8e7a5221'
});

const particlesOptions = {
    particles: {
        number:{
        	value: 150,
        	density:{
        		enable: true,
        		value_area:800
        	}
        }
    },
    'interactivity':{
    	'events':{
    		'onhover':{
    			'enable': true,
    			'mode': 'repulse'
    		},
    		'detect_on': 'canvas',
    		'modes':{
    			'repulse': {
    				'distance': 50,
    				'duraton': 0.4
  	  			}
    		}
    	}
    }
}

const calculateFaceLocation = (response) => {
	const data = response.outputs[0].data.regions[0].region_info.bounding_box;
	const width = Number(document.getElementById('faceBox').width);
	const height = Number(document.getElementById('faceBox').height);
	const boxLocation = {
		row_top: height * data.top_row,
		row_bottom: height - height * data.bottom_row,
		col_left: width * data.left_col,
		col_right: width - width * data.right_col,
		// row_top: Number(data.top_row),
		// row_bottom: Number(data.bottom_row),
		// col_left: Number(data.left_col),
		// col_right: Number(data.right_col),
	}
	return boxLocation
}


class App extends Component {

	constructor(){
		super();
		this.state={
			input: '',
			imgUrl: '',
			box: '',
			route: 'signin',
			isSignedIn: false,
			user:{
				id: '',
				name: '',
				email: '',
				entries: 0,
				joined: ''
			}
		}
	}

	loadUser = (data) => {
		this.setState({
			user:{
				id: data.id,
				name: data.name,
				email: data.email,
				entries: data.entries,
				joined: data.joined
			}
		})
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	drawBox = (boxLocation) => {
		this.setState({box: boxLocation});
		console.log(this.state.box);
	}

	onPictureSubmit = () => {
		this.setState({imgUrl: this.state.input});
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then( response => {
			if (response){
				fetch('http://localhost:3000/image', {
					method: 'put',
					headers: {'Content-Type': 'application/json'},
					body: JSON.stringify({
						id: this.state.user.id
					})
				})
				.then(response => response.json())
				.then(count => {
					this.setState(Object.assign(this.state.user,{entries: count}))
				})
			}
			this.drawBox(calculateFaceLocation(response))
		})
		.catch(err => console.log(err));
	}

	changeRoute = (route) => {
		if (route === 'signout'){
			this.setState({isSignedIn: false})
		} else if (route === 'home'){
			this.setState({isSignedIn: true})
		}
		this.setState({route: route})
	}

	render(){
		return (
			<div className='App'>
				<Particles 
					className='particles' 
					params={particlesOptions}
				/>	             
				<Navigation isSignIn={this.state.isSignedIn} changeRoute={this.changeRoute}/>
				{ this.state.route === 'signin'?
					<SignIn loadUser={this.loadUser} changeRoute={this.changeRoute}/>:
					(
					this.state.route === 'home'?
					<div>
						<Logo />
						<Rank name={this.state.user.name} entries={this.state.user.entries}/>
						<ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onPictureSubmit}/>				
						<FaceRecognition imgUrl={this.state.imgUrl} box={this.state.box}/>
					</div>:
						<Register changeRoute={this.changeRoute} loadUser={this.loadUser}/>)
					
				}								
			</div>
		)
	}
}

export default App;