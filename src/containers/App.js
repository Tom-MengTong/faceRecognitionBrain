import React, {Component} from 'react';
import Navigation from '../components/Navigation/Navigation';
import Logo from '../components/Logo/Logo';
import ImageLinkForm from '../components/ImageLinkForm/ImageLinkForm';
import Rank from '../components/Rank/Rank';
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

class App extends Component {

	constructor(){
		super();
		this.state={
			input: '',
			imgUrl: '',
		}
	}

	onInputChange = (event) => {
		this.setState({input: event.target.value});
	}

	onSubmit = () => {
		this.setState({imgUrl: this.state.input});
		app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
		.then(
		    function(response) {
		      console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
		    },
		    function(err) {
		      console.log(err);
		    }
	  	);
	}

	render(){
		return (
			<div className='App'>
				<Particles 
					className='particles' 
					params={particlesOptions}
				/>	             
				<Navigation />
				<Logo />
				<Rank />
				<ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit}/>				
				<FaceRecognition imgUrl={this.state.imgUrl}/>
			</div>
		)
	}
}

export default App;