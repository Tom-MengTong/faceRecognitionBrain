import React from 'react';

const Navigation = ({changeRoute, isSignIn}) => {
	if (isSignIn){
		return(
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer' onClick={()=>changeRoute('signout')}>Sign Out</p>
			</nav>
		)
	} else {
		return(
			<nav style={{display:'flex', justifyContent:'flex-end'}}>
				<p className='f3 link dim black underline pa3 pointer' onClick={()=>changeRoute('signin')}>Sign In</p>						
				<p className='f3 link dim black underline pa3 pointer' onClick={()=>changeRoute('register')}>Register</p>
			</nav>
		)
	}
}

export default Navigation;