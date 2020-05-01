import React from 'react'

export default function UserList(props) {
	const usersListed = props.users.map(user => {
		return (	
			<li key={user.id}> {user.username} </li>
		)
	})
	return (
		<div>
			UserList
			<ul> {usersListed} </ul>
		</div>
	)
}