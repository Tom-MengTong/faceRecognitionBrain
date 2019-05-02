import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({onInputChange, onSubmit}) => {
	return(
		<div>
			<p className='f3'>
				{'This magic brain will detect faces in your pictures'}
			</p>
			<div className='center'>
				<div className='center form pa4 br3 shadow-5'>
					<input type='text' className='f4 pa2 w-70 center' onChange={onInputChange} />
					<button className='f4 w-30 link grow ph3 pv2 dib white bg-light-purple' onClick={onSubmit}>Detect</button>
				</div>			
			</div>
		</div>
	);
}

export default ImageLinkForm;