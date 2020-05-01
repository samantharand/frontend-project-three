import React from 'react'
import '../index.css'

export default function Header(props) {
	return (
		<div className='Header-nav'>
			{
				props.loggedIn
				&&
				<span className='fake-link' onClick={props.logout}> Logout </span>
			}
		</div>
	)
}