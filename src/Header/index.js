import React from 'react'
import '../index.css'

export default function Header(props) {
	return (
		<div className='Header-nav'>
			<React.Fragment>
				<span className='fake-link' onClick={props.switchMode}>Home</span>
				|
				<span className='fake-link' onClick={props.switchMode}>User</span>
				|
				<span className='fake-link' onClick={props.switchMode}>Artwork</span>
				|
				{
					props.loggedIn
					?
					<span className='fake-link' onClick={props.logout}>Logout</span>
					:
					<span className='fake-link' onClick={props.switchMode}>Log In / Register</span>
				}
			</React.Fragment>
		</div>
	)
}