import React from 'react';
import './FaceRecognition.css'

const FaceRecognition = ({imgUrl, box}) => {
	return(
		<div className='center'>
			<div className='absolute mt2'>
				<img id='faceBox' alt='' src={imgUrl} width='500px' height='auto' />
				<div 
					className="bounding-box" 
					style={{
						top: box.row_top,
						right: box.col_right, 
						bottom: box.row_bottom, 
						left: box.col_left
					}}
				>					
				</div>
			</div>
		</div>
	);
}

export default FaceRecognition;